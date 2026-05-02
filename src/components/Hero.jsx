import { useEffect, useRef, useState } from "react";

export default function Hero({ content }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateVideoMode() {
      setShowVideo(Boolean(content.heroVideo) && !reducedMotionQuery.matches);
    }

    updateVideoMode();

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener("change", updateVideoMode);
    } else {
      reducedMotionQuery.addListener(updateVideoMode);
    }

    return () => {
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener("change", updateVideoMode);
      } else {
        reducedMotionQuery.removeListener(updateVideoMode);
      }
    };
  }, [content.heroVideo]);

  function handleToggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
      });
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
      <div className="absolute inset-0">
        {content.heroImage ? (
          <img
            src={content.heroImage}
            alt="Dark cinematic background"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-75 blur-[1px]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_72%_18%,rgba(143,23,23,0.1),transparent_22%),linear-gradient(180deg,#050505_0%,#020202_100%)]" />
        )}
        {showVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={content.heroImage || undefined}
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          >
            <source src={content.heroVideo} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.42))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(2,2,2,0.82))]" />
        <div className="grain-layer absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-10 text-center sm:pt-14">
        <h1 className="text-hero-glow reveal-up relative font-serif text-6xl font-bold uppercase tracking-[0.1em] text-white sm:text-7xl md:text-8xl">
          <span className="relative inline-block px-2 pb-9 sm:pb-11">
            <span className="relative z-10">{content.artistName}</span>
            <span
              className="hero-reflection pointer-events-none absolute left-1/2 top-[88%] whitespace-nowrap text-[0.5em] font-bold tracking-[0.38em]"
              style={{ color: "#d62f2f", opacity: 0.95, textShadow: "0 0 18px rgba(214, 47, 47, 0.35)" }}
            >
              ENIVEL
            </span>
          </span>
        </h1>
        {showVideo ? (
          <button
            type="button"
            onClick={handleToggleSound}
            className="mb-8 mt-6 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-200 transition hover:border-white/25 hover:bg-black/35"
          >
            {isMuted ? "Tap for Sound" : "Sound On"}
          </button>
        ) : null}
        <p className="text-soft-glow reveal-up text-[0.76rem] font-bold uppercase tracking-[0.52em] text-stone-200">
          just speaking my mind
        </p>
        <p className="text-soft-glow reveal-up reveal-delay-2 mt-5 max-w-2xl text-2xl font-semibold text-stone-100 sm:text-3xl">
          {content.heroLine}
        </p>
        <a
          href={content.listenNowUrl || content.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer external"
          aria-label="Listen now"
          className="button-primary reveal-up reveal-delay-3 mt-10 min-w-[12rem]"
        >
          Listen Now
        </a>
        <div className="reveal-up reveal-delay-3 mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {content.platformLinks.map((platform) => (
            <a
              key={platform.label}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer external"
              className="rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-stone-100 transition hover:border-white/35 hover:bg-black/35 hover:text-white"
            >
              {platform.label}
            </a>
          ))}
        </div>
        <div className="reveal-up reveal-delay-3 mt-7 flex flex-wrap items-center justify-center gap-3">
          {content.contact.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer external"
              className="rounded-full border border-white/15 bg-black/15 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-stone-100 transition hover:border-white/30 hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
