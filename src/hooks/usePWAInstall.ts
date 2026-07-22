import { useEffect, useState, useCallback } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __deferredInstallPrompt: BeforeInstallPromptEvent | null;
  }
}

/**
 * PWA install hook.
 * - Reads the globally-captured `beforeinstallprompt` (stashed in index.html)
 *   so the prompt is never missed if it fires before React mounts.
 * - Detects iOS Safari (no programmatic prompt) so the UI can show instructions.
 * - Hides the button only when the app is actually installed.
 */
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    () => (typeof window !== "undefined" ? window.__deferredInstallPrompt : null)
  );
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    setIsIOS(iOS);

    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(Boolean(standalone));

    // Sync with the global stash (may have fired before mount)
    if (window.__deferredInstallPrompt) {
      setDeferredPrompt(window.__deferredInstallPrompt);
    }

    const onAvailable = () => {
      setDeferredPrompt(window.__deferredInstallPrompt);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      window.__deferredInstallPrompt = evt;
      setDeferredPrompt(evt);
    };

    window.addEventListener("pwa-install-available", onAvailable);
    window.addEventListener("pwa-installed", onInstalled);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("pwa-install-available", onAvailable);
      window.removeEventListener("pwa-installed", onInstalled);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const evt = deferredPrompt || window.__deferredInstallPrompt;
    if (!evt) return { outcome: "unavailable" as const };
    await evt.prompt();
    const choice = await evt.userChoice;
    window.__deferredInstallPrompt = null;
    setDeferredPrompt(null);
    return choice;
  }, [deferredPrompt]);

  return {
    canInstall: Boolean(deferredPrompt),
    isInstalled,
    isIOS,
    promptInstall,
  };
};
