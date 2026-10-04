import type { MetadataRoute } from "next";
import { projectSlugs } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";

const paths = ["/", "/about", "/work", "/experience", ...projectSlugs.map((slug) => `/work/${slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
