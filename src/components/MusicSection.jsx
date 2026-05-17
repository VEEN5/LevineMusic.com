import { useEffect, useState } from "react";

export default function MusicSection({ content }) {
  const [showVideo, setShowVideo] = useState(false);
  const [activeView, setActiveView] = useState("release");
  const currentBackgroundImage =
    activeView === "snippets" ? content.snippets?.backgroundImage || "" : content.backgroundImage;

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateVideoMode() {
      setShowVideo(Boolean(content.backgroundVideo) && !reducedMotionQuery.matches);
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
  }, [content.backgroundVideo]);

  return (
    <section id="music" className="relative overflow-hidden py-16 sm:py-20">
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
        {showVideo && activeView === "release" ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={currentBackgroundImage}
            className="absolute inset-0 h-full w-full object-cover opacity-72"
          >
            <source src={content.backgroundVideo} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_20%_30%,rgba(143,23,23,0.08),transparent_26%),linear-gradient(180deg,rgba(2,2,2,0.34)_0%,rgba(5,5,5,0.24)_46%,rgba(2,2,2,0.42)_100%)]" />
        <div className="grain-layer absolute inset-0 opacity-10" />
        {activeView === "snippets" && content.snippets?.watermark ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="select-none font-serif text-[22vw] font-bold uppercase tracking-[0.1em] text-[#7f0f0f]/20">
              {content.snippets.watermark}
            </span>
          </div>
        ) : null}
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
              <div className="mx-auto max-w-xl">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                  <img
                    src={content.coverArt}
                    alt={`${content.title} cover art`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {content.platformLinks.map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-stone-100 transition hover:border-white/25 hover:text-white"
                  >
                    {platform.label}
                  </a>
                ))}
              </div>
            </>
          ) : (
            content.snippets?.items?.length ? (
              <div className="grid gap-4 md:grid-cols-3">
                {content.snippets.items.map((item) => (
                  <article
                    key={item.label}
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
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
