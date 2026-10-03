"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ContextValue = {
  /** Element inside the navigation shell that page-level navigation can render into. */
  slot: HTMLElement | null;
  setSlot: (el: HTMLElement | null) => void;
  /** Whether an extension is currently shown, so the main bar can take its attached shape. */
  active: boolean;
  setActive: (active: boolean) => void;
};

const NavExtensionContext = createContext<ContextValue>({
  slot: null,
  setSlot: () => {},
  active: false,
  setActive: () => {},
});

export const useNavExtension = () => useContext(NavExtensionContext);

export function NavExtensionProvider({ children }: { children: ReactNode }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  return (
    <NavExtensionContext.Provider value={{ slot, setSlot, active, setActive }}>{children}</NavExtensionContext.Provider>
  );
}
