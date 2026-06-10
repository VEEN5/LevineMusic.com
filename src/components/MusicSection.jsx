import { useEffect, useRef, useState } from "react";

export default function MusicSection({ content }) {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeReleaseIndex, setActiveReleaseIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const releases = content.releases?.length
    ? content.releases
    : [
        {
          title: content.title,
          subtitle: "Music",
          description: content.description,
          backgroundImage: content.backgroundImage,
          backgroundVideo: content.backgroundVideo,
          coverArt: content.coverArt,
          platformLinks: content.platformLinks,
        },
        {
          title: content.snippets?.title,
          subtitle: content.snippets?.subtitle,
          description: content.snippets?.description,
          backgroundImage: content.snippets?.backgroundImage,
          backgroundVideo: content.snippets?.backgroundVideo,
          coverArt: content.snippets?.coverArt,
          watermark: content.snippets?.watermark,
          platformLinks: content.snippets?.releaseLinks,
        },
      ].filter((release) => release.title);
  const activeRelease = releases[activeReleaseIndex] || releases[0];
  const currentBackgroundImage = activeRelease?.backgroundImage || "";
  const currentBackgroundVideo = activeRelease?.backgroundVideo || "";
  const currentPlatformLinks = activeRelease?.platformLinks || [];

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateVideoMode() {
      setShowVideo(Boolean(currentBackgroundVideo) && !reducedMotionQuery.matches);
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
  }, [currentBackgroundVideo]);

  useEffect(() => {
    setIsMuted(true);
  }, [activeReleaseIndex, currentBackgroundVideo]);

  useEffect(() => {
    function handleExternalSound(event) {
      if (event.detail?.source === "music") return;

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
      window.dispatchEvent(new CustomEvent("levine:sound-on", { detail: { source: "music" } }));
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
    <section id="music" className="relative overflow-hidden scroll-mt-6 py-12 sm:scroll-mt-10 sm:py-16">
      <div className="absolute inset-0">
        {currentBackgroundImage ? (
          <img
            src={currentBackgroundImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[1px]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(224,58,58,0.2),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(120,0,0,0.26),transparent_24%),linear-gradient(180deg,#040404_0%,#090303_52%,#020202_100%)]" />
        )}
        {showVideo ? (
          <video
            key={`${activeReleaseIndex}-${currentBackgroundVideo}`}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={currentBackgroundImage || undefined}
            className="absolute inset-0 h-full w-full object-cover opacity-72"
          >
            <source src={currentBackgroundVideo} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_20%_30%,rgba(143,23,23,0.08),transparent_26%),linear-gradient(180deg,rgba(2,2,2,0.34)_0%,rgba(5,5,5,0.24)_46%,rgba(2,2,2,0.42)_100%)]" />
        <div className="grain-layer absolute inset-0 opacity-10" />
        {activeRelease?.watermark ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="select-none font-serif text-[22vw] font-bold uppercase tracking-[0.1em] text-[#7f0f0f]/20">
              {activeRelease.watermark}
            </span>
          </div>
        ) : null}
      </div>

      <div className="section-shell relative z-10 mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-4">
          {activeReleaseIndex > 0 ? (
            <button
              type="button"
              onClick={() => setActiveReleaseIndex((index) => Math.max(index - 1, 0))}
              aria-label="Go to previous song"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition hover:border-white/30 hover:bg-black/45"
            >
              <span className="text-xl leading-none">&#8592;</span>
            </button>
          ) : null}
          <div>
            <p className="section-kicker justify-center before:hidden text-stone-200">
              {activeRelease?.subtitle || "Music"}
            </p>
            <h2 className="section-title mx-auto text-center">
              {activeRelease?.title}
            </h2>
            <p className="section-copy text-soft-glow mx-auto max-w-3xl text-balance">
              {activeRelease?.description}
            </p>
          </div>
          {activeReleaseIndex < releases.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveReleaseIndex((index) => Math.min(index + 1, releases.length - 1))}
              aria-label="Go to next song"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition hover:border-white/30 hover:bg-black/45"
            >
              <span className="text-xl leading-none">&#8594;</span>
            </button>
          ) : null}
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-md sm:p-6">
          {showVideo ? (
            <div className="mb-5 flex justify-center">
              <button
                type="button"
                onClick={handleToggleSound}
                className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-200 transition hover:border-white/25 hover:bg-black/35"
              >
                {isMuted ? "Tap for Sound" : "Sound On"}
              </button>
            </div>
          ) : null}
          {currentPlatformLinks.length ? (
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              {currentPlatformLinks.map((platform) =>
                platform.href ? (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-stone-100 transition hover:border-white/25 hover:text-white"
                  >
                    {platform.label}
                  </a>
                ) : (
                  <button
                    key={platform.label}
                    type="button"
                    onClick={() => window.alert(platform.status || "Coming soon")}
                    className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-stone-100 transition hover:border-white/25 hover:text-white"
                  >
                    {platform.label}
                  </button>
                ),
              )}
            </div>
          ) : null}
          <div className="mx-auto max-w-[17rem] sm:max-w-xs">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <img
                src={activeRelease?.coverArt}
                alt={`${activeRelease?.title} cover art`}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
