"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { clamp } from "@/lib/utils";
import { CollaboratorCursor } from "./CollaboratorCursor";
import { useI18n } from "./LanguageProvider";

type PhraseSet = readonly string[];
type Id = "blue" | "red" | "green" | "yellow";

type Agent = {
  id: Id;
  color: string;
  phrases: PhraseSet;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  moveStart: number;
  moveDur: number;
  pauseUntil: number;
  phrase: number;
  phraseUntil: number;
  swapping: boolean;
  swapGen: number;
  tagW: number;
  tagH: number;
  labelW: number;
  labelH: number;
  heading: number;
  tempo: number;
  kind: "travel" | "nudge";
  x0: number;
  y0: number;
  cx: number;
  cy: number;
};

type Box = { left: number; right: number; top: number; bottom: number };

const COLORS: Record<Id, string> = {
  red: "var(--collab-red)",
  green: "var(--collab-green)",
  blue: "var(--collab-blue)",
  yellow: "var(--collab-yellow)",
};

const DESKTOP: { id: Id; x: number; y: number }[] = [
  { id: "blue", x: 0.1, y: 0.22 },
  { id: "red", x: 0.88, y: 0.22 },
  { id: "green", x: 0.1, y: 0.78 },
  { id: "yellow", x: 0.9, y: 0.7 },
];

const MOBILE: { id: Id; x: number; y: number }[] = [
  { id: "red", x: 0.84, y: 0.2 },
  { id: "green", x: 0.14, y: 0.78 },
];

const POINTER_W = 18;
const POINTER_H = 20;
const TAG_LEFT = 16;
const TAG_TOP = 18;
const CLOSE_MS = 280;
const OPEN_MS = 280;
const CLOSED_WAIT = { min: 4800, extra: 1400 };
const PHRASE_HOLD = { min: 4200, extra: 1800 };
const SEPARATION = 24;

function rand() {
  return Math.random();
}

/** Short acceleration, then a longer ease into a full stop. Continuous, no overshoot. */
function easeMove(t: number) {
  const a = 0.38;
  if (t <= a) {
    const u = t / a;
    return a * u * u;
  }
  const span = 1 - a;
  const dt = t - a;
  return a + 2 * dt - (dt * dt) / span;
}

function quad(a: number, c: number, b: number, t: number) {
  const u = 1 - t;
  return u * u * a + 2 * u * t * c + t * t * b;
}

function boxesOverlap(a: Box, b: Box, pad = 0) {
  return !(a.right + pad < b.left || a.left - pad > b.right || a.bottom + pad < b.top || a.top - pad > b.bottom);
}

function agentBox(x: number, y: number, tagW: number, tagH: number): Box {
  if (tagW <= 0) {
    return { left: x, right: x + POINTER_W, top: y, bottom: y + POINTER_H };
  }
  const tagX = x + TAG_LEFT;
  const tagY = y + TAG_TOP;
  return {
    left: x,
    right: Math.max(x + POINTER_W, tagX + tagW),
    top: y,
    bottom: Math.max(y + POINTER_H, tagY + Math.max(tagH, 0)),
  };
}

function maxCursorX(playRight: number, tagW: number) {
  return playRight - Math.max(POINTER_W, TAG_LEFT + Math.max(tagW, 0));
}

function maxCursorY(playBottom: number, tagH: number) {
  return playBottom - Math.max(POINTER_H, TAG_TOP + Math.max(tagH, 0));
}

function collectWalls(): Box[] {
  return [...document.querySelectorAll<HTMLElement>("[data-safe]")].map((el) => {
    const r = el.getBoundingClientRect();
    const pad = el.id === "site-header" ? 12 : 18;
    return { left: r.left - pad, right: r.right + pad, top: r.top - pad, bottom: r.bottom + pad };
  });
}

function playArea(hero: HTMLElement, compact: boolean): Box {
  const r = hero.getBoundingClientRect();
  const insetX = compact ? 16 : 12;
  const insetTop = compact ? 72 : 88;
  const insetBottom = compact ? 88 : 48;
  return {
    left: insetX,
    right: window.innerWidth - insetX,
    top: Math.max(r.top, 0) + insetTop,
    bottom: Math.min(r.bottom, window.innerHeight) - insetBottom,
  };
}

function insidePlay(box: Box, play: Box) {
  return box.left >= play.left && box.right <= play.right && box.top >= play.top && box.bottom <= play.bottom;
}

function hitsWall(box: Box, walls: Box[]) {
  return walls.some((wall) => boxesOverlap(box, wall, 0));
}

function measureTag(tag: HTMLElement) {
  return { w: tag.offsetWidth, h: tag.offsetHeight };
}

function travelRange(compact: boolean, attempt: number) {
  if (compact) return { min: 40, max: attempt > 16 ? 140 : 120 };
  return { min: 80, max: attempt > 16 ? 250 : 220 };
}

function pointClear(
  x: number,
  y: number,
  agent: Agent,
  play: Box,
  walls: Box[],
  occupied: Box[],
  minDist: number,
) {
  const dist = Math.hypot(x - agent.x, y - agent.y);
  if (dist < minDist) return false;
  const box = agentBox(x, y, Math.max(agent.tagW, agent.labelW), Math.max(agent.tagH, agent.labelH));
  if (!insidePlay(box, play)) return false;
  if (hitsWall(box, walls)) return false;
  if (occupied.some((other) => boxesOverlap(box, other, SEPARATION))) return false;
  return true;
}

/** Slide back along the path until the cursor and tag fit, still far enough to read as a move. */
function fitLeg(
  agent: Agent,
  x: number,
  y: number,
  play: Box,
  walls: Box[],
  occupied: Box[],
  minDist: number,
) {
  for (let i = 0; i < 8; i++) {
    const t = 1 - i * 0.07;
    const px = agent.x + (x - agent.x) * t;
    const py = agent.y + (y - agent.y) * t;
    if (pointClear(px, py, agent, play, walls, occupied, minDist * 0.9)) {
      return { x: px, y: py };
    }
  }
  return null;
}

function curve(agent: Agent, x: number, y: number, heading: number, bow: number) {
  const side = rand() > 0.5 ? 1 : -1;
  return {
    x,
    y,
    cx: (agent.x + x) / 2 - Math.sin(heading) * bow * side,
    cy: (agent.y + y) / 2 + Math.cos(heading) * bow * side,
    heading,
  };
}

function planMove(
  agent: Agent,
  compact: boolean,
  walls: Box[],
  play: Box,
  others: Agent[],
  width: number,
  kind: Agent["kind"],
) {
  const occupied = others.filter((other) => other !== agent).flatMap((other) => [
    agentBox(other.x, other.y, Math.max(other.tagW, other.labelW), Math.max(other.tagH, other.labelH)),
    agentBox(other.toX, other.toY, Math.max(other.tagW, other.labelW), Math.max(other.tagH, other.labelH)),
  ]);

  if (kind === "nudge") {
    const min = compact ? 14 : 18;
    const max = compact ? 28 : 36;
    for (let attempt = 0; attempt < 10; attempt++) {
      const heading = agent.heading + (rand() - 0.5) * 1.1;
      const dist = min + rand() * (max - min);
      const x = agent.x + Math.cos(heading) * dist;
      const y = agent.y + Math.sin(heading) * dist;
      const fitted = fitLeg(agent, x, y, play, walls, occupied, min);
      if (!fitted) continue;
      return curve(agent, fitted.x, fitted.y, heading, 2 + rand() * 4);
    }
    return null;
  }

  const bow = (compact ? 8 : 16) + rand() * (compact ? 12 : 22);

  for (let attempt = 0; attempt < 24; attempt++) {
    const { min, max } = travelRange(compact, attempt);
    const spread = attempt < 12 ? Math.PI * 1.25 : Math.PI * 2;
    const heading = agent.heading + (rand() - 0.5) * spread;
    const dist = min + rand() * (max - min);
    const x = agent.x + Math.cos(heading) * dist;
    const y = agent.y + Math.sin(heading) * dist;
    const fitted = fitLeg(agent, x, y, play, walls, occupied, min);
    if (!fitted) continue;
    const landed = Math.atan2(fitted.y - agent.y, fitted.x - agent.x);
    return curve(agent, fitted.x, fitted.y, landed, bow);
  }

  const leftSide = agent.homeX < width / 2;
  const content = walls.find((wall) => wall.bottom - wall.top > 120 && wall.right - wall.left > 80);
  const bands: Array<{ y0: number; y1: number }> = [];
  if (content) {
    if (content.top - 24 > play.top + 16) bands.push({ y0: play.top + 8, y1: content.top - 24 });
    if (play.bottom - 16 > content.bottom + 24) bands.push({ y0: content.bottom + 24, y1: play.bottom - 8 });
  }
  if (bands.length === 0) bands.push({ y0: play.top + 8, y1: play.bottom - 8 });

  for (let attempt = 0; attempt < 18; attempt++) {
    const min = attempt < 10 ? travelRange(compact, 0).min : compact ? 28 : 52;
    const band = bands[attempt % bands.length]!;
    const span = Math.max(24, band.y1 - band.y0);
    const y = band.y0 + rand() * span;
    const reach = Math.min(compact ? 180 : width * 0.42, play.right - play.left - 24);
    const x = leftSide ? play.left + 10 + rand() * reach : play.right - 10 - rand() * reach;
    if (!pointClear(x, y, agent, play, walls, occupied, min * 0.85)) continue;
    const heading = Math.atan2(y - agent.y, x - agent.x);
    return curve(agent, x, y, heading, bow);
  }

  return null;
}

function moveMs(dist: number, tempo: number, kind: Agent["kind"]) {
  if (kind === "nudge") return (460 + rand() * 300) * tempo;
  const span = clamp((dist - 40) / 180, 0, 1);
  return clamp((1500 + span * 1300 + rand() * 550) * tempo, 1450, 3500);
}

function pauseMs(tempo: number) {
  return clamp((1000 + rand() * 3000) * tempo, 950, 4300);
}

function beginMove(agent: Agent, next: { x: number; y: number; cx: number; cy: number; heading: number }, now: number, dur: number) {
  agent.x0 = agent.x;
  agent.y0 = agent.y;
  agent.toX = next.x;
  agent.toY = next.y;
  agent.cx = next.cx;
  agent.cy = next.cy;
  agent.heading = next.heading;
  agent.moveStart = now;
  agent.moveDur = dur;
}

function clearSpot(x: number, y: number, tagW: number, tagH: number, walls: Box[], play: Box) {
  const box = agentBox(x, y, tagW, tagH);
  return insidePlay(box, play) && !hitsWall(box, walls);
}

/** Seat a cursor in open canvas, beside or above the hero copy, so travel has room. */
function escapeWalls(x: number, y: number, tagW: number, tagH: number, walls: Box[], play: Box, width: number) {
  const content = walls.find((wall) => wall.bottom - wall.top > 120 && wall.right - wall.left > 80 && wall.left > 0);
  const candidates: { x: number; y: number }[] = [{ x, y }];
  for (let n = 1; n <= 8; n++) {
    const out = x < width / 2 ? -1 : 1;
    candidates.push({ x: x + out * n * 22, y });
    candidates.push({ x, y: y - n * 28 });
    candidates.push({ x, y: y + n * 28 });
  }
  if (content) {
    const above = content.top - 36;
    const below = content.bottom + 36;
    for (const py of [above, below]) {
      candidates.push({ x, y: py });
      candidates.push({ x: x < width / 2 ? play.left + 48 : play.right - 48, y: py });
    }
  }
  for (const spot of candidates) {
    const px = clamp(spot.x, play.left + 8, maxCursorX(play.right, tagW) - 8);
    const py = clamp(spot.y, play.top + 8, maxCursorY(play.bottom, tagH) - 8);
    if (clearSpot(px, py, tagW, tagH, walls, play)) return { x: px, y: py };
  }
  return {
    x: clamp(x, play.left + 8, maxCursorX(play.right, tagW) - 8),
    y: clamp(y, play.top + 8, maxCursorY(play.bottom, tagH) - 8),
  };
}

export function Collaborators() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const layer = useRef<HTMLDivElement>(null);
  const sets = t.collaborators;

  useEffect(() => {
    const root = layer.current;
    const hero = document.getElementById("hero");
    if (!root || !hero) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let compact = mq.matches;
    const rtl = document.documentElement.dir === "rtl";
    const seatX = (seat: { x: number }) => (rtl ? 1 - seat.x : seat.x);
    const all = [...root.querySelectorAll<HTMLElement>("[data-collab]")];
    const now0 = performance.now();
    let heroOn = true;
    let layerAlpha = 0;
    let raf = 0;
    let running = true;
    let walls = collectWalls();

    root.style.opacity = "0";

    const seatsFor = () => (compact ? MOBILE : DESKTOP);

    const placeHome = (seat: { x: number; y: number }) => {
      const play = playArea(hero, compact);
      return {
        x: clamp(window.innerWidth * seatX(seat), play.left + 8, play.right - 8),
        y: clamp(window.innerHeight * seat.y, play.top + 8, play.bottom - 8),
      };
    };

    let agents: Agent[] = [];
    let nodes: HTMLElement[] = [];

    const bindSeats = (now: number) => {
      const seats = seatsFor();
      nodes = seats
        .map((seat) => all.find((el) => el.dataset.collab === seat.id))
        .filter((el): el is HTMLElement => Boolean(el));

      all.forEach((el) => {
        el.style.display = seats.some((seat) => seat.id === el.dataset.collab) ? "" : "none";
      });

      agents = seats.map((seat, i) => {
        const phrases = sets[seat.id];
        const start = placeHome(seat);
        const prev = agents.find((agent) => agent.id === seat.id);
        const x = prev?.x ?? start.x;
        const y = prev?.y ?? start.y;
        return {
          id: seat.id,
          color: COLORS[seat.id],
          phrases,
          homeX: start.x,
          homeY: start.y,
          x,
          y,
          fromX: x,
          fromY: y,
          toX: x,
          toY: y,
          moveStart: now,
          moveDur: 0,
          pauseUntil: now + [680, 1520, 2280, 1040][i % 4]! + rand() * 520,
          phrase: prev?.phrase ?? 0,
          phraseUntil: now + 3600 + i * 1800 + rand() * 2200,
          swapping: false,
          swapGen: (prev?.swapGen ?? 0) + 1,
          tagW: prev?.tagW ?? 96,
          tagH: prev?.tagH ?? 22,
          labelW: prev?.labelW ?? 96,
          labelH: prev?.labelH ?? 22,
          heading: prev?.heading ?? rand() * Math.PI * 2,
          tempo: prev?.tempo ?? 0.9 + rand() * 0.2,
          kind: "travel" as const,
          x0: x,
          y0: y,
          cx: x,
          cy: y,
        };
      });

      nodes.forEach((el, i) => {
        const agent = agents[i];
        if (!agent) return;
        el.style.setProperty("--collab", agent.color);
        const phrase = el.querySelector<HTMLElement>("[data-phrase]");
        const tag = el.querySelector<HTMLElement>(".collab-tag");
        if (phrase) phrase.textContent = agent.phrases[agent.phrase] ?? agent.phrases[0] ?? "";
        if (tag && phrase) {
          const size = measureTag(tag);
          agent.tagW = size.w;
          agent.tagH = size.h;
          agent.labelW = size.w;
          agent.labelH = size.h;
        }
        const clear = escapeWalls(
          agent.x,
          agent.y,
          Math.max(agent.tagW, agent.labelW),
          agent.tagH,
          walls,
          playArea(hero, compact),
          window.innerWidth,
        );
        agent.x = clear.x;
        agent.y = clear.y;
        agent.fromX = clear.x;
        agent.fromY = clear.y;
        agent.toX = clear.x;
        agent.toY = clear.y;
        agent.x0 = clear.x;
        agent.y0 = clear.y;
        agent.cx = clear.x;
        agent.cy = clear.y;
        agent.homeX = clear.x;
        agent.homeY = clear.y;
        el.classList.remove("is-flip");
        el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0)`;
      });
    };

    bindSeats(now0);

    const clearSwap = (agent: Agent, el: HTMLElement) => {
      agent.swapGen += 1;
      agent.swapping = false;
      const tag = el.querySelector<HTMLElement>(".collab-tag");
      tag?.classList.remove("is-hidden", "is-closing", "is-opening");
    };

    const swapPhrase = (agent: Agent, el: HTMLElement, now: number) => {
      if (reduce || agent.swapping || now < agent.phraseUntil || agent.phrases.length < 2) return;
      const phrase = el.querySelector<HTMLElement>("[data-phrase]");
      const tag = el.querySelector<HTMLElement>(".collab-tag");
      if (!phrase || !tag) return;

      agent.swapping = true;
      const gen = agent.swapGen + 1;
      agent.swapGen = gen;
      tag.classList.remove("is-opening", "is-hidden");
      tag.classList.add("is-closing");

      window.setTimeout(() => {
        if (agent.swapGen !== gen) return;
        tag.classList.remove("is-closing");
        tag.classList.add("is-hidden");
        agent.tagW = 0;
        agent.tagH = 0;

        window.setTimeout(() => {
          if (agent.swapGen !== gen) return;
          agent.phrase = (agent.phrase + 1) % agent.phrases.length;
          phrase.textContent = agent.phrases[agent.phrase] ?? "";
          tag.classList.remove("is-hidden");
          tag.classList.add("is-opening");
          const next = measureTag(tag);
          agent.tagW = next.w;
          agent.tagH = next.h;
          agent.labelW = next.w;
          agent.labelH = next.h;
          void tag.offsetWidth;
          tag.classList.remove("is-opening");
          agent.phraseUntil = performance.now() + PHRASE_HOLD.min + rand() * PHRASE_HOLD.extra;

          window.setTimeout(() => {
            if (agent.swapGen !== gen) return;
            agent.swapping = false;
          }, OPEN_MS);
        }, CLOSED_WAIT.min + rand() * CLOSED_WAIT.extra);
      }, CLOSE_MS);
    };

    const tick = (now: number) => {
      if (!running) return;
      const targetAlpha = heroOn ? 1 : 0;
      layerAlpha += (targetAlpha - layerAlpha) * (heroOn ? 0.16 : 0.12);

      if (layerAlpha < 0.02 && !heroOn) {
        root.style.opacity = "0";
        root.style.visibility = "hidden";
        agents.forEach((agent, i) => {
          const el = nodes[i];
          if (el) clearSwap(agent, el);
        });
        raf = 0;
        return;
      }

      root.style.visibility = "visible";
      root.style.opacity = String(layerAlpha);

      const width = window.innerWidth;

      agents.forEach((agent, i) => {
        const el = nodes[i];
        if (!el) return;

        if (!reduce && heroOn) {
          const moving = agent.moveDur > 0 && now < agent.moveStart + agent.moveDur;
          if (moving) {
            const t = easeMove(clamp((now - agent.moveStart) / agent.moveDur, 0, 1));
            agent.x = quad(agent.x0, agent.cx, agent.toX, t);
            agent.y = quad(agent.y0, agent.cy, agent.toY, t);
          } else if (agent.moveDur > 0) {
            agent.x = agent.toX;
            agent.y = agent.toY;
            agent.moveDur = 0;
            if (agent.kind === "travel" && rand() < 0.32) {
              const nudge = planMove(agent, compact, walls, playArea(hero, compact), agents, width, "nudge");
              if (nudge) {
                beginMove(agent, nudge, now, moveMs(Math.hypot(nudge.x - agent.x, nudge.y - agent.y), agent.tempo, "nudge"));
                agent.kind = "nudge";
              } else {
                agent.kind = "travel";
                agent.pauseUntil = now + pauseMs(agent.tempo);
              }
            } else {
              agent.kind = "travel";
              agent.pauseUntil = now + pauseMs(agent.tempo);
            }
          } else if (now >= agent.pauseUntil) {
            walls = collectWalls();
            const next = planMove(agent, compact, walls, playArea(hero, compact), agents, width, "travel");
            if (!next) {
              agent.pauseUntil = now + 280 + rand() * 320;
            } else {
              const travel = Math.hypot(next.x - agent.x, next.y - agent.y);
              beginMove(agent, next, now, moveMs(travel, agent.tempo, "travel"));
              agent.kind = "travel";
            }
          }

          swapPhrase(agent, el, now);
        }

        el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0)`;
      });

      raf = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !running) return;
      raf = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroOn = (entry?.intersectionRatio ?? 0) > 0.28;
        if (heroOn) start();
      },
      { threshold: [0, 0.1, 0.28, 0.5, 0.75, 1] },
    );
    observer.observe(hero);

    const kick = window.setTimeout(() => {
      const r = hero.getBoundingClientRect();
      if (r.bottom > 80 && r.top < window.innerHeight * 0.85) {
        heroOn = true;
        start();
      }
    }, 120);

    const onVis = () => {
      running = !document.hidden;
      if (running && heroOn) start();
    };
    const onResize = () => {
      const nextCompact = mq.matches;
      if (nextCompact !== compact) {
        compact = nextCompact;
        bindSeats(performance.now());
        return;
      }
      walls = collectWalls();
      const play = playArea(hero, compact);
      agents.forEach((agent, i) => {
        const seat = seatsFor()[i];
        if (!seat) return;
        const home = placeHome(seat);
        agent.homeX = home.x;
        agent.homeY = home.y;
        const span = Math.max(agent.tagW, agent.labelW);
        const spanH = Math.max(agent.tagH, agent.labelH);
        agent.x = clamp(agent.x, play.left, maxCursorX(play.right, span));
        agent.y = clamp(agent.y, play.top, maxCursorY(play.bottom, spanH));
        agent.toX = agent.x;
        agent.toY = agent.y;
        agent.x0 = agent.x;
        agent.y0 = agent.y;
        agent.moveDur = 0;
        agent.kind = "travel";
        agent.pauseUntil = performance.now() + 400 + rand() * 900;
      });
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onResize);
    start();

    return () => {
      running = false;
      observer.disconnect();
      window.clearTimeout(kick);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
      agents.forEach((agent, i) => {
        const el = nodes[i];
        if (el) clearSwap(agent, el);
      });
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [sets, reduce]);

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none">
      {(["blue", "red", "green", "yellow"] as const).map((id) => (
        <div key={id} data-collab={id} className="collab">
          <CollaboratorCursor />
          <span className="collab-tag">
            <span data-phrase className="collab-tag-phrase">
              {sets[id][0]}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
