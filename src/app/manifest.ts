import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js PWA",
    short_name: "NextPWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f3e0",
    theme_color: "#f3f3e0",
  };
}
