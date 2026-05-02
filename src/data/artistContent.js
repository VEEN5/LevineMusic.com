import temptationsCover from "../assets/temptations-cover.png";

const releaseLinks = [
  { label: "Spotify", href: "https://open.spotify.com/album/3gqFDs8SUPl3xbqpUkKRS0" },
  { label: "Apple Music", href: "https://music.apple.com/us/album/temptations-single/1895888107" },
  { label: "SoundCloud", href: "https://soundcloud.com/levinesmith/levine-temptations" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=oy8kYbYEcM4" },
];

// Update this file first when you want to change the artist name, release title, links, or images.
export const artistContent = {
  artistName: "Levine",
  currentRelease: "Temptation",
  heroLine: "Temptation - Out Now",
  listenNowUrl: "https://linktr.ee/LevineSmith",
  spotifyUrl: releaseLinks[0].href,
  platformLinks: releaseLinks,
  heroVideo: "/hero-walk.mp4",
  heroImage: "",
  music: {
    eyebrow: "Latest Release",
    title: "Temptation",
    description:
      "Levine - I do not think the music world is dark. I think where people come from is what makes their music dark. Life is fun, but it has a dark side too, and I think that is what makes it relatable. We have all been through things. Hope you enjoy.",
    backgroundVideo: "/hero-walk.mp4",
    backgroundImage: temptationsCover,
    coverArt: temptationsCover,
    platformLinks: releaseLinks,
    community: {
      label: "Join the Discord",
      href: "https://discord.gg/USee37HxBa",
      note: "Join the space if you want to stay close to the music, future drops, and the world around it.",
    },
    embedUrl:
      "https://open.spotify.com/embed/album/3gqFDs8SUPl3xbqpUkKRS0?utm_source=generator",
    snippets: {
      title: "Raw Footage",
      subtitle: "Snippets / future drops",
      description:
        "This is where I express my heart, and hopefully we can build a stronger connection.",
      backgroundImage: temptationsCover,
      items: [
        {
          label: "Snippets",
          title: "Coming soon",
          copy: "Short previews and future drops.",
        },
        {
          label: "Raw Footage",
          title: "Coming soon",
          copy: "Unfiltered clips and behind-the-scenes moments.",
        },
        {
          label: "Motivational Talk",
          title: "Coming soon",
          copy: "Direct thoughts, voice notes, and real talk.",
        },
      ],
    },
  },
  about: {
    bio: "Music for overthinkers. Real emotions, real stories. Built to feel quiet, heavy, and honest.",
  },
  contact: {
    bookingEmail: "booking@levinemusic.com",
    socialLinks: [
      { label: "Instagram", href: "https://www.instagram.com/levinesmith_/" },
      { label: "TikTok", href: "https://www.tiktok.com/@unknownveen" },
    ],
  },
};
