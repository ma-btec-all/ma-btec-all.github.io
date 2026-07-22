import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Auto-recover from stale lazy-loaded chunks after a new deploy.
const handleChunkError = (event: Event) => {
  const msg =
    (event as PromiseRejectionEvent).reason?.message ||
    (event as ErrorEvent).message ||
    "";
  if (
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /ChunkLoadError/i.test(msg)
  ) {
    const key = "ma-chunk-reload";
    if (sessionStorage.getItem(key) !== "1") {
      sessionStorage.setItem(key, "1");
      window.location.reload();
    }
  } else {
    sessionStorage.removeItem("ma-chunk-reload");
  }
};
window.addEventListener("error", handleChunkError);
window.addEventListener("unhandledrejection", handleChunkError);

createRoot(document.getElementById("root")!).render(<App />);


// === PWA Service Worker registration ===
// Skip inside Lovable preview iframes/preview hosts to avoid caching the editor shell.
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
const host = window.location.hostname;
const isPreviewHost =
  host.includes("id-preview--") ||
  host.includes("lovableproject.com") ||
  host.includes("lovable.app");

if ("serviceWorker" in navigator) {
  if (isInIframe || isPreviewHost) {
    // Clean up any previously registered SW in preview contexts.
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
    // eslint-disable-next-line no-console
    console.log("[PWA] SW registration skipped (preview/iframe)");
  } else {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("[PWA] SW registered", reg.scope))
        .catch((err) => console.warn("[PWA] SW registration failed", err));
    });
  }
}
