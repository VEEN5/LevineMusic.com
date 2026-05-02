import Hero from "./components/Hero";
import MusicSection from "./components/MusicSection";
import { artistContent } from "./data/artistContent";

export default function App() {
  return (
    <div className="relative overflow-hidden bg-ink text-stone-100">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,120,120,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(147,0,0,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
        <div className="grain-layer absolute inset-0" />
      </div>

      <main className="relative z-10">
        <Hero content={artistContent} />
        <MusicSection content={artistContent.music} />
      </main>
    </div>
  );
}
