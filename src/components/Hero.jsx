import { useEffect, useRef, useState } from "react";

export default function Hero({ content }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const showHeroPromo = content.showHeroPromo !== false;
  const showHeroPlatforms = content.showHeroPlatforms !== false;
  const showHeroCommunity = content.showHeroCommunity !== false;

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

  useEffect(() => {
    function handleExternalSound(event) {
      if (event.detail?.source === "hero") return;

      const video = videoRef.current;
      if (!video) return;

      video.muted = true;
      video.pause();
      video.currentTime = 0;
      setIsMuted(true);
    }

    window.addEventListener("levine:sound-on", handleExternalSound);

    return () => {
      window.removeEventListener("levine:sound-on", handleExternalSound);
    };
  }, []);

  function handleToggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      window.dispatchEvent(new CustomEvent("levine:sound-on", { detail: { source: "hero" } }));
      video.currentTime = 0;
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
      });
    } else {
      video.pause();
      video.currentTime = 0;
      video.play().catch(() => {});
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

      {content.contact.socialLinks?.length ? (
        <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
          <button
            type="button"
            onClick={() => setIsSocialsOpen((isOpen) => !isOpen)}
            aria-expanded={isSocialsOpen}
            className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-stone-100 backdrop-blur-md transition hover:border-white/30 hover:bg-black/45"
          >
            Levine Socials
          </button>
          {isSocialsOpen ? (
            <div className="mt-3 min-w-40 overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-2 text-right shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md">
              {content.contact.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer external"
                  className="block rounded-xl px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-stone-100 transition hover:bg-white/10 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-10 text-center sm:pt-14">
        <h1 className="text-hero-glow reveal-up relative font-serif text-6xl font-bold uppercase tracking-[0.1em] text-white sm:text-7xl md:text-8xl">
          <span className="relative inline-block px-2 pb-9 sm:pb-11">
            <span className="relative z-10">{content.artistName}</span>
            <span
              className="hero-reflection pointer-events-none absolute left-1/2 top-[88%] whitespace-nowrap text-[0.5em] font-bold tracking-[0.38em]"
              style={{ color: "#e03a3a", opacity: 1, textShadow: "0 0 20px rgba(224, 58, 58, 0.45)" }}
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
        {content.heroTeaserTitle ? (
          <div className="reveal-up reveal-delay-1 text-center">
            <p className="text-soft-glow text-2xl font-black uppercase tracking-[0.16em] text-white sm:text-3xl">
              {content.heroTeaserTitle}
            </p>
            {content.heroTeaserStatus ? (
              <p className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.42em] text-[#d94a4a] sm:text-[0.82rem]">
                {content.heroTeaserStatus}
              </p>
            ) : null}
          </div>
        ) : null}
        {content.heroReleaseLinks?.length ? (
          <div className="reveal-up reveal-delay-2 mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {content.heroReleaseLinks.map((platform) =>
              platform.href ? (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer external"
                  className="rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-stone-100 transition hover:border-white/35 hover:bg-black/35 hover:text-white"
                >
                  {platform.label}
                </a>
              ) : (
                <span
                  key={platform.label}
                  className="rounded-full border border-white/12 bg-black/15 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-stone-500"
                >
                  {platform.label}
                </span>
              ),
            )}
          </div>
        ) : null}
        {content.heroMusicLabel ? (
          <a
            href="#music"
            className="button-secondary reveal-up reveal-delay-2 mt-8 min-w-[12rem]"
          >
            {content.heroMusicLabel}
          </a>
        ) : null}
        {showHeroPromo && content.heroLine ? (
          <p className="text-soft-glow reveal-up reveal-delay-2 mt-5 max-w-2xl text-2xl font-semibold text-stone-100 sm:text-3xl">
            {content.heroLine}
          </p>
        ) : null}
        {showHeroPromo && (content.listenNowUrl || content.spotifyUrl) ? (
          <a
            href={content.listenNowUrl || content.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer external"
            aria-label="Listen now"
            className="button-primary reveal-up reveal-delay-3 mt-10 min-w-[12rem]"
          >
            Listen Now
          </a>
        ) : null}
        {showHeroPlatforms && content.platformLinks?.length ? (
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
        ) : null}
        {showHeroCommunity ? (
          <div className="reveal-up reveal-delay-3 mt-7 flex flex-wrap items-center justify-center gap-3">
            {content.music?.community?.href ? (
              <a
                href={content.music.community.href}
                target="_blank"
                rel="noopener noreferrer external"
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white transition hover:border-white/35 hover:bg-white/15"
              >
                {content.music.community.label}
              </a>
            ) : null}
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
        ) : null}
      </div>
    </section>
  );
}
