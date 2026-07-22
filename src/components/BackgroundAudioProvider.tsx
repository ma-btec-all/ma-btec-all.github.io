import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX, Music2 } from "lucide-react";

declare global {
  namespace YT {
    interface Player {
      playVideo: () => void;
      pauseVideo: () => void;
      mute: () => void;
      unMute: () => void;
      setVolume: (v: number) => void;
      getVolume: () => number;
      seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
      destroy: () => void;
    }
  }
  interface Window {
    YT?: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YT.Player;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; BUFFERING: number; CUED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VOLUME_STORAGE_KEY = "btec-background-volume";
const MUTE_STORAGE_KEY = "btec-background-muted";
const YOUTUBE_VIDEO_ID = "MiYV7BcC30E";
const AUDIO_START_SECONDS = 40;
const DEFAULT_VOLUME = 10;

type YTPlayer = YT.Player | null;

const clampVolume = (value: number) => Math.min(100, Math.max(0, value));

const readStoredVolume = () => {
  if (typeof window === "undefined") return DEFAULT_VOLUME;
  const raw = window.localStorage.getItem(VOLUME_STORAGE_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : DEFAULT_VOLUME;
  return Number.isFinite(parsed) ? clampVolume(parsed) : DEFAULT_VOLUME;
};

const readStoredMute = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MUTE_STORAGE_KEY) === "true";
};

const BackgroundAudioProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<YTPlayer>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const autoplayRequestedRef = useRef(false);
  const playerReadyRef = useRef(false);

  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState<number>(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const ensurePlayback = useCallback(() => {
    autoplayRequestedRef.current = true;

    const player = playerRef.current;
    if (!playerReadyRef.current || !player || startedRef.current) return;

    player.seekTo(AUDIO_START_SECONDS, true);
    player.playVideo();
    startedRef.current = true;
  }, []);

  const updateVolume = useCallback((nextVolume: number) => {
    const safeVolume = clampVolume(nextVolume);
    setVolume(safeVolume);
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(safeVolume));

    const player = playerRef.current;
    if (!player) return;

    player.setVolume(safeVolume);

    if (isMuted) {
      player.unMute();
      setIsMuted(false);
      window.localStorage.setItem(MUTE_STORAGE_KEY, "false");
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isMuted) {
      player.unMute();
      player.setVolume(volume);
      setIsMuted(false);
      window.localStorage.setItem(MUTE_STORAGE_KEY, "false");
      return;
    }

    player.mute();
    setIsMuted(true);
    window.localStorage.setItem(MUTE_STORAGE_KEY, "true");
  }, [isMuted, volume]);

  useEffect(() => {
    setVolume(readStoredVolume());
    setIsMuted(readStoredMute());
    if (typeof window === "undefined") return;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const updatePointerMode = () => setIsTouchDevice(coarsePointer.matches);

    updatePointerMode();
    coarsePointer.addEventListener("change", updatePointerMode);

    return () => coarsePointer.removeEventListener("change", updatePointerMode);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    const previousReady = window.onYouTubeIframeAPIReady;

    const initializePlayer = () => {
      if (!window.YT || !playerHostRef.current || playerRef.current) return;

      playerRef.current = new window.YT.Player(playerHostRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          start: AUDIO_START_SECONDS,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            const storedVolume = readStoredVolume();
            const storedMute = readStoredMute();

            event.target.setVolume(storedVolume);
            if (storedMute) {
              event.target.mute();
            } else {
              event.target.unMute();
            }

            playerReadyRef.current = true;
            setPlayerReady(true);
            setIsMuted(storedMute);

            if (autoplayRequestedRef.current) {
              event.target.seekTo(AUDIO_START_SECONDS, true);
              event.target.playVideo();
              startedRef.current = true;
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT?.PlayerState.ENDED) {
              event.target.seekTo(AUDIO_START_SECONDS, true);
              event.target.playVideo();
            }
          },
        },
      });
    };

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      initializePlayer();
    };

    if (window.YT?.Player) {
      initializePlayer();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      window.onYouTubeIframeAPIReady = previousReady;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFirstInteraction = () => {
      ensurePlayback();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [ensurePlayback]);

  useEffect(() => {
    if (!playerReady) return;
    const player = playerRef.current;
    if (!player) return;

    player.setVolume(volume);
    if (isMuted) {
      player.mute();
    } else {
      player.unMute();
    }
  }, [isMuted, playerReady, volume]);

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  const toggleIcon = useMemo(() => {
    if (isMuted) return <VolumeX className="h-5 w-5" />;
    return <Music2 className="h-5 w-5" />;
  }, [isMuted]);

  const openPanel = () => setPanelOpen(true);
  const closePanel = () => {
    if (!isTouchDevice) setPanelOpen(false);
  };

  const startLongPress = () => {
    if (!isTouchDevice) return;
    if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = window.setTimeout(() => setPanelOpen(true), 300);
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  return (
    <>
      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
      >
        <div ref={playerHostRef} className="h-0 w-0" />
      </div>

      <div
        className="fixed bottom-5 right-5 z-[80] flex flex-col-reverse items-center gap-3"
        onMouseEnter={openPanel}
        onMouseLeave={closePanel}
      >
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 rounded-2xl border border-cyan-400/25 bg-slate-950/45 px-3 py-3 backdrop-blur-2xl shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            >
              <span className="text-[10px] font-semibold text-cyan-300">{volume}%</span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={volume}
                aria-label="التحكم بمستوى الصوت"
                onChange={(event) => updateVolume(Number(event.target.value))}
                onInput={(event) => updateVolume(Number((event.target as HTMLInputElement).value))}
                className="audio-slider h-40 w-2 cursor-pointer appearance-none rounded-full bg-cyan-200/10"
                style={{ writingMode: "vertical-lr" as const, direction: "rtl" }}
              />
              <span className="writing-mode-vertical text-[10px] text-cyan-100/80" style={{ writingMode: "vertical-rl" as const }}>مستوى الصوت</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label="التحكم بالصوت الخلفي"
          aria-expanded={panelOpen}
          onClick={() => {
            if (isTouchDevice) setPanelOpen((current) => !current);
            ensurePlayback();
            toggleMute();
          }}
          onTouchStart={startLongPress}
          onTouchEnd={cancelLongPress}
          onTouchCancel={cancelLongPress}
          onPointerDown={() => ensurePlayback()}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/30 bg-slate-950/40 text-cyan-200 backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-cyan-300/55 hover:text-cyan-100 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
          style={{
            boxShadow: "0 0 24px rgba(34, 211, 238, 0.28), inset 0 0 18px rgba(255,255,255,0.06)",
          }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/12 to-cyan-500/4 opacity-90" />
          <span className="relative z-10">{toggleIcon}</span>
        </button>
      </div>
    </>
  );
};

export default BackgroundAudioProvider;
