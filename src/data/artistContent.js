import temptationsCover from "../assets/temptations-cover.png";

const releaseLinks = [
  { label: "Spotify", href: "https://open.spotify.com/album/3gqFDs8SUPl3xbqpUkKRS0" },
  { label: "Apple Music", href: "https://music.apple.com/us/album/temptations-single/1895888107" },
  { label: "SoundCloud", href: "https://soundcloud.com/levinesmith/levine-temptations" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=oy8kYbYEcM4" },
];

const artistProfileLinks = [
  { label: "Spotify", href: "https://open.spotify.com/artist/70OkZeqSvvUWVVDaEp7mXq" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/levine/1895478668" },
  { label: "SoundCloud", href: "https://soundcloud.com/levinesmith" },
  { label: "YouTube", href: "https://www.youtube.com/@Levinesmith" },
];

const brokenCrownLinks = [
  { label: "Spotify", href: "https://open.spotify.com/album/5PSfdrvqxBOxAlBlgKjjEg" },
  { label: "Apple Music", href: "https://music.apple.com/us/album/broken-crown-single/6789707204" },
  { label: "SoundCloud", href: "https://soundcloud.com/levinesmith/tracks" },
  { label: "YouTube", href: "https://www.youtube.com/@Levinesmith" },
];

// Update this file first when you want to change the artist name, release title, links, or images.
export const artistContent = {
  artistName: "Levine",
  currentRelease: "Temptation",
  heroLine: "",
  heroTeaserTitle: "Broken Crown",
  heroTeaserStatus: "Out Now",
  heroReleaseLinks: brokenCrownLinks,
  heroMusicLabel: "Levine's Music",
  listenNowUrl: "https://linktr.ee/LevineSmith",
  spotifyUrl: releaseLinks[0].href,
  platformLinks: releaseLinks,
  heroVideo: "/broken-crown-hero.mp4",
  heroImage: "",
  showHeroPromo: false,
  showHeroPlatforms: false,
  showHeroCommunity: false,
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
      title: "Toxic Little Me",
      subtitle: "Music",
      description:
        "We all have that dark and light side of us, but it's okay to balance both. Join me.",
      backgroundImage: "/toxic-little-me-cover.webp",
      backgroundVideo: "/toxic-little-me-hero.mp4",
      watermark: "ENIVEL",
      coverArt: "/toxic-little-me-cover.webp",
      releaseLinks: [
        { label: "Spotify", href: "https://open.spotify.com/album/1UQk2YZJW9fjYFVYx3udSm?si=EHmaB4CxR12h6EN58XFwJw" },
        { label: "Apple Music", href: "https://music.apple.com/us/album/toxic-little-me-single/6772158910" },
        { label: "SoundCloud", href: "https://soundcloud.com/levinesmith/toxic-little-me" },
        { label: "YouTube", href: "https://youtu.be/UFjd2Oec9ac?si=wvVncHzq063WhDoE" },
      ],
      items: [],
    },
    releases: [
      {
        title: "Temptation",
        subtitle: "Music",
        description:
          "Levine - I do not think the music world is dark. I think where people come from is what makes their music dark. Life is fun, but it has a dark side too, and I think that is what makes it relatable. We have all been through things. Hope you enjoy.",
        backgroundImage: temptationsCover,
        backgroundVideo: "/hero-walk.mp4",
        coverArt: temptationsCover,
        platformLinks: releaseLinks,
      },
      {
        title: "Toxic Little Me",
        subtitle: "Music",
        description:
          "We all have that dark and light side of us, but it's okay to balance both. Join me.",
        backgroundImage: "/toxic-little-me-cover.webp",
        backgroundVideo: "/toxic-little-me-hero.mp4",
        coverArt: "/toxic-little-me-cover.webp",
        watermark: "ENIVEL",
        platformLinks: [
          { label: "Spotify", href: "https://open.spotify.com/album/1UQk2YZJW9fjYFVYx3udSm?si=EHmaB4CxR12h6EN58XFwJw" },
          { label: "Apple Music", href: "https://music.apple.com/us/album/toxic-little-me-single/6772158910" },
          { label: "SoundCloud", href: "https://soundcloud.com/levinesmith/toxic-little-me" },
          { label: "YouTube", href: "https://youtu.be/UFjd2Oec9ac?si=wvVncHzq063WhDoE" },
        ],
      },
      {
        title: "Almost There",
        subtitle: "Music",
        description:
          "I made this song on a personal note for anyone going through struggles with their mental health or dealing with things that feel heavy. I've been through experiences that changed me and helped me grow into a better person. One thing I've learned is that no matter what you're facing, you can get through it. Keep going. You're a lot stronger than you think.",
        backgroundImage: "/almost-there-cover.png",
        backgroundVideo: "/almost-there-hero.mp4",
        coverArt: "/almost-there-cover.png",
        watermark: "ALMOST",
        platformLinks: artistProfileLinks,
      },
    ],
  },
  about: {
    bio: "Music for overthinkers. Real emotions, real stories. Built to feel quiet, heavy, and honest.",
  },
  contact: {
    bookingEmail: "Levinesmith246@gmail.com",
    socialLinks: [
      { label: "Instagram", href: "https://www.instagram.com/levinesmith_" },
      { label: "TikTok", href: "https://www.tiktok.com/@unknownveen" },
    ],
  },
};
