import { useEffect, useMemo, useState } from "react";

function normalizePlatformLabel(label) {
  return String(label || "").toLowerCase();
}

function getEmbedUrl(platform) {
  const label = normalizePlatformLabel(platform.label);
  const href = platform.href;

  if (label === "spotify") {
    return href.replace("open.spotify.com/", "open.spotify.com/embed/");
  }

  if (label === "apple music") {
    return href.replace("music.apple.com/", "embed.music.apple.com/");
  }

  if (label === "soundcloud") {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(href)}&color=%23050505&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&visual=true`;
  }

  if (label === "youtube") {
    try {
      const url = new URL(href);
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : href;
    } catch (_error) {
      return href;
    }
  }

  return href;
}

function getEmbedHeight(label) {
  const platform = normalizePlatformLabel(label);

  if (platform === "apple music") return 450;
  if (platform === "soundcloud") return 380;
  if (platform === "youtube") return 315;
  return 352;
}

function PlatformIcon({ label }) {
  const platform = normalizePlatformLabel(label);

  if (platform === "apple music") {
    return <span className="text-base leading-none">A</span>;
  }

  if (platform === "soundcloud") {
    return <span className="text-base leading-none">S</span>;
  }

  if (platform === "youtube") {
    return <span className="text-base leading-none">Y</span>;
  }

  return <span className="text-base leading-none">S</span>;
}

export default function MusicSection({ content }) {
  const [activePlatformLabel, setActivePlatformLabel] = useState(content.platformLinks[0]?.label || "Spotify");
  const [showVideo, setShowVideo] = useState(false);
  const [activeView, setActiveView] = useState("release");
  const activePlatform = useMemo(() => {
    return (
      content.platformLinks.find((platform) => platform.label === activePlatformLabel) ||
      content.platformLinks[0]
    );
  }, [activePlatformLabel, content.platformLinks]);

  const embedUrl = activePlatform ? getEmbedUrl(activePlatform) : content.embedUrl;
  const embedHeight = getEmbedHeight(activePlatform?.label);
  const currentBackgroundImage =
    activeView === "snippets" ? content.snippets?.backgroundImage || content.backgroundImage : content.backgroundImage;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let idleId = null;
    let timeoutId = null;

    function updateVideoMode() {
      const connectionType = String(connection?.effectiveType || "").toLowerCase();
      const shouldAvoidVideo =
        !desktopQuery.matches ||
        reducedMotionQuery.matches ||
        Boolean(connection?.saveData) ||
        (connectionType && connectionType !== "4g");

      if (!content.backgroundVideo || shouldAvoidVideo) {
        setShowVideo(false);
        return;
      }

      setShowVideo(false);

      const enableVideo = () => setShowVideo(true);

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(enableVideo, { timeout: 1800 });
      } else {
        timeoutId = window.setTimeout(enableVideo, 1200);
      }
    }

    updateVideoMode();

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", updateVideoMode);
      reducedMotionQuery.addEventListener("change", updateVideoMode);
    } else {
      desktopQuery.addListener(updateVideoMode);
      reducedMotionQuery.addListener(updateVideoMode);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      if (desktopQuery.removeEventListener) {
        desktopQuery.removeEventListener("change", updateVideoMode);
        reducedMotionQuery.removeEventListener("change", updateVideoMode);
      } else {
        desktopQuery.removeListener(updateVideoMode);
        reducedMotionQuery.removeListener(updateVideoMode);
      }
    };
  }, [content.backgroundVideo]);

  return (
    <section id="music" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0">
        <img
          src={currentBackgroundImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[1px]"
        />
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={currentBackgroundImage}
            className="absolute inset-0 h-full w-full object-cover opacity-72"
          >
            <source src={content.backgroundVideo} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_20%_30%,rgba(143,23,23,0.08),transparent_26%),linear-gradient(180deg,rgba(2,2,2,0.34)_0%,rgba(5,5,5,0.24)_46%,rgba(2,2,2,0.42)_100%)]" />
        <div className="grain-layer absolute inset-0 opacity-10" />
      </div>

      <div className="section-shell relative z-10 mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-4">
          {activeView === "snippets" ? (
            <button
              type="button"
              onClick={() => setActiveView("release")}
              aria-label="Go back to release"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition hover:border-white/30 hover:bg-black/45"
            >
              <span className="text-xl leading-none">&#8592;</span>
            </button>
          ) : null}
          <div>
            <p className="section-kicker justify-center before:hidden text-stone-200">
              {activeView === "release" ? "Music" : content.snippets?.subtitle || "Snippets"}
            </p>
            <h2 className="section-title mx-auto text-center">
              {activeView === "release" ? content.title : content.snippets?.title}
            </h2>
            <p className="section-copy text-soft-glow mx-auto max-w-3xl text-balance">
              {activeView === "release" ? content.description : content.snippets?.description}
            </p>
          </div>
          {activeView === "release" ? (
            <button
              type="button"
              onClick={() => setActiveView("snippets")}
              aria-label="Go to raw footage and snippets"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition hover:border-white/30 hover:bg-black/45"
            >
              <span className="text-xl leading-none">&#8594;</span>
            </button>
          ) : null}
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-md sm:p-6">
          {activeView === "release" ? (
            <>
              <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                  <img
                    src={content.coverArt}
                    alt={`${content.title} cover art`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.2)]">
                  <div className="mb-3 flex items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-black/40 px-4 py-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-100">
                        <PlatformIcon label={activePlatform?.label} />
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-stone-400">Now Showing</p>
                        <p className="text-sm font-bold text-white">{activePlatform?.label}</p>
                      </div>
                    </div>
                    <a
                      href={activePlatform?.href}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="rounded-full border border-white/15 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-stone-100 transition hover:border-white/25 hover:text-white"
                    >
                      Open App
                    </a>
                  </div>

                  <iframe
                    key={activePlatform?.label}
                    title={`${content.title} player on ${activePlatform?.label || "platform"}`}
                    src={embedUrl}
                    width="100%"
                    height={embedHeight}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full rounded-[1rem] border-0 bg-black"
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {content.platformLinks.map((platform) => (
                  <button
                    key={platform.label}
                    type="button"
                    onClick={() => setActivePlatformLabel(platform.label)}
                    aria-pressed={platform.label === activePlatform?.label}
                    className={`rounded-full border px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] transition ${
                      platform.label === activePlatform?.label
                        ? "border-white/30 bg-white/10 font-bold text-white"
                        : "border-white/15 bg-black/30 font-semibold text-stone-100 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/30 px-5 py-5 text-center">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
                  Community
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-stone-100">
                  {content.community?.note}
                </p>
                <a
                  href={content.community?.href}
                  target="_blank"
                  rel="noopener noreferrer external"
                  className="mt-5 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/25 hover:bg-white/15"
                >
                  {content.community?.label}
                </a>
              </div>
            </>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {content.snippets?.items?.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/35 p-6 text-left shadow-[0_12px_35px_rgba(0,0,0,0.2)]"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
                    {item.label}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-200">{item.copy}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
