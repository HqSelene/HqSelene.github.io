import { relative } from "node:path";
import type { Plugin } from "vite";

// Raw Markdown globs can leave evaluated RSC modules cached after file changes.
// Restart the dev module runners as well as refreshing the browser.
export function contentRefresh(): Plugin {
  return {
    name: "content-refresh",
    apply: "serve",
    configureServer(server) {
      let timer: ReturnType<typeof setTimeout> | undefined;
      function refresh(file: string) {
        const path = relative(server.config.root, file).replaceAll("\\", "/");
        if (!/^content\/(?:about-photos\/[^/]+\.(?:jpg|jpeg|png|webp|avif|JPG|JPEG|PNG|WEBP|AVIF)|projects\/[^/]+\.md|posts\/[^/]+\.md|(?:updates|recent-projects|publications)\.json)$/.test(path)) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          server.config.logger.info("Content changed; reloading Markdown and page data…");
          void server.restart().catch(error => server.config.logger.error(String(error)));
        }, 200);
      }
      server.watcher.on("add", refresh).on("change", refresh).on("unlink", refresh);
      server.httpServer?.once("close", () => {
        clearTimeout(timer);
        server.watcher.off("add", refresh).off("change", refresh).off("unlink", refresh);
      });
    },
  };
}
