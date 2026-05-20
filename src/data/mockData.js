// ─── GoFlix Mock Data ───────────────────────────────────────────────────────
// Temporary mock data layer — swap with real API responses when backend is live

export const FEATURED_CONTENT = {
  id: 1,
  type: "movie",
  title: "Risen",
  subtitle: "The greatest story ever told — reimagined.",
  description:
    "A Roman soldier is tasked with finding the missing body of a crucified Jewish leader, setting him on a path that changes his life forever. An epic cinematic journey of faith, doubt, and redemption.",
  thumbnail:
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80",
  banner:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80",
  trailer: "",
  genre: ["Drama", "Faith", "Historical"],
  maturityRating: "PG",
  releaseYear: 2016,
  duration: "1h 47m",
  isFeatured: true,
};

export const MOVIES = [
  {
    id: 1,
    type: "movie",
    title: "Risen",
    description:
      "A Roman soldier searches for the missing body of a crucified leader and discovers an unshakeable truth.",
    thumbnail:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&q=80",
    genre: ["Drama", "Faith", "Historical"],
    maturityRating: "PG",
    releaseYear: 2016,
    duration: "1h 47m",
    views: 125400,
    isFeatured: true,
    cast: ["Joseph Fiennes", "Tom Felton", "Peter Firth"],
  },
  {
    id: 2,
    type: "movie",
    title: "War Room",
    description:
      "A seemingly perfect family learns that life is a battle and their only hope is prayer.",
    thumbnail:
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1280&q=80",
    genre: ["Drama", "Faith", "Family"],
    maturityRating: "PG",
    releaseYear: 2015,
    duration: "2h 0m",
    views: 210300,
    isFeatured: false,
    cast: ["Priscilla C. Shirer", "T.C. Stallings", "Karen Abercrombie"],
  },
  {
    id: 3,
    type: "movie",
    title: "Overcomer",
    description:
      "A high school basketball coach discovers purpose when a student with asthma finds her identity.",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1280&q=80",
    genre: ["Drama", "Sports", "Faith"],
    maturityRating: "PG",
    releaseYear: 2019,
    duration: "1h 59m",
    views: 183200,
    isFeatured: false,
    cast: ["Alex Kendrick", "Priscilla C. Shirer", "Shari Rigby"],
  },
  {
    id: 4,
    type: "movie",
    title: "The Shack",
    description:
      "After the murder of his youngest daughter, a man receives a mysterious note urging him to an abandoned shack.",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1280&q=80",
    genre: ["Drama", "Faith", "Mystery"],
    maturityRating: "PG-13",
    releaseYear: 2017,
    duration: "2h 12m",
    views: 298100,
    isFeatured: true,
    cast: ["Sam Worthington", "Octavia Spencer", "Tim McGraw"],
  },
  {
    id: 5,
    type: "movie",
    title: "God's Not Dead",
    description:
      "A college student must defend his faith when his philosophy professor challenges him to prove God exists.",
    thumbnail:
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1280&q=80",
    genre: ["Drama", "Faith"],
    maturityRating: "PG",
    releaseYear: 2014,
    duration: "1h 53m",
    views: 341000,
    isFeatured: false,
    cast: ["Shane Harper", "Kevin Sorbo", "David A.R. White"],
  },
  {
    id: 6,
    type: "movie",
    title: "Courageous",
    description:
      "Four police officers struggle to honor God and lead their families through a series of life-changing events.",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1280&q=80",
    genre: ["Drama", "Family", "Faith"],
    maturityRating: "PG-13",
    releaseYear: 2011,
    duration: "2h 9m",
    views: 275600,
    isFeatured: false,
    cast: ["Alex Kendrick", "Ken Bevel", "Kevin Downes"],
  },
  {
    id: 7,
    type: "movie",
    title: "Fireproof",
    description:
      "A firefighter tries to repair his marriage using a 40-day challenge based on biblical principles.",
    thumbnail:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1280&q=80",
    genre: ["Drama", "Romance", "Faith"],
    maturityRating: "PG",
    releaseYear: 2008,
    duration: "2h 2m",
    views: 312000,
    isFeatured: false,
    cast: ["Kirk Cameron", "Erin Bethea", "Ken Bevel"],
  },
  {
    id: 8,
    type: "movie",
    title: "Heaven Is for Real",
    description:
      "A small-town father struggles with his son's incredible claim of a visit to heaven during a near-death experience.",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1280&q=80",
    genre: ["Drama", "Faith", "Family"],
    maturityRating: "PG",
    releaseYear: 2014,
    duration: "1h 40m",
    views: 389000,
    isFeatured: false,
    cast: ["Greg Kinnear", "Kelly Reilly", "Connor Corum"],
  },
  {
    id: 9,
    type: "movie",
    title: "Soul Surfer",
    description:
      "A true story of teen surfer Bethany Hamilton, who lost her arm in a shark attack and found strength through faith.",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1280&q=80",
    genre: ["Drama", "Sports", "Faith"],
    maturityRating: "PG",
    releaseYear: 2011,
    duration: "1h 52m",
    views: 421000,
    isFeatured: false,
    cast: ["AnnaSophia Robb", "Helen Hunt", "Dennis Quaid"],
  },
  {
    id: 10,
    type: "movie",
    title: "Unbroken",
    description:
      "An Olympic runner and WWII prisoner of war uses faith and resilience to survive impossible conditions.",
    thumbnail:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=1280&q=80",
    genre: ["Drama", "Historical", "Faith"],
    maturityRating: "PG-13",
    releaseYear: 2014,
    duration: "2h 17m",
    views: 527000,
    isFeatured: true,
    cast: ["Jack O'Connell", "Domhnall Gleeson", "Garrett Hedlund"],
  },
  {
    id: 11,
    type: "movie",
    title: "Miracles from Heaven",
    description:
      "A young girl is healed of a rare digestive disease after a near-death experience.",
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=1280&q=80",
    genre: ["Drama", "Faith", "Family"],
    maturityRating: "PG",
    releaseYear: 2016,
    duration: "1h 49m",
    views: 234000,
    isFeatured: false,
    cast: ["Jennifer Garner", "Kylie Rogers", "Martin Henderson"],
  },
  {
    id: 12,
    type: "movie",
    title: "I Can Only Imagine",
    description:
      "The true story behind the most successful Christian single of all time.",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1280&q=80",
    genre: ["Drama", "Music", "Faith"],
    maturityRating: "PG",
    releaseYear: 2018,
    duration: "1h 50m",
    views: 318000,
    isFeatured: false,
    cast: ["J. Michael Finley", "Madeline Carroll", "Dennis Quaid"],
  },
];

export const SERIES = [
  {
    id: 101,
    type: "series",
    title: "The Chosen",
    description:
      "A multi-season television drama about the life of Jesus Christ and those who knew him.",
    thumbnail:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1280&q=80",
    genre: ["Drama", "Faith", "Historical"],
    maturityRating: "PG",
    releaseYear: 2019,
    seasons: 4,
    episodes: 40,
    views: 892000,
    isFeatured: true,
    cast: ["Jonathan Roumie", "Shahar Isaac", "Paras Patel"],
  },
  {
    id: 102,
    type: "series",
    title: "A.D. The Bible Continues",
    description:
      "The story of the first followers of Jesus Christ in the turbulent period after his crucifixion.",
    thumbnail:
      "https://images.unsplash.com/photo-1499363536502-87642509e31b?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1280&q=80",
    genre: ["Drama", "Faith", "Historical"],
    maturityRating: "PG-13",
    releaseYear: 2015,
    seasons: 1,
    episodes: 12,
    views: 421000,
    isFeatured: false,
    cast: ["Adam Levy", "Greta Scacchi", "Juan Pablo Di Pace"],
  },
  {
    id: 103,
    type: "series",
    title: "Preach",
    description:
      "A compelling drama following an inner-city pastor as he navigates faith, family, and community.",
    thumbnail:
      "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1280&q=80",
    genre: ["Drama", "Faith", "Family"],
    maturityRating: "PG",
    releaseYear: 2022,
    seasons: 2,
    episodes: 18,
    views: 156000,
    isFeatured: false,
    cast: ["Idris Elba-lookalike", "Viola Davis-lookalike"],
  },
  {
    id: 104,
    type: "series",
    title: "Mysteries of the Bible",
    description:
      "A documentary series exploring the profound mysteries hidden within the pages of scripture.",
    thumbnail:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1280&q=80",
    genre: ["Documentary", "Faith", "Historical"],
    maturityRating: "G",
    releaseYear: 2021,
    seasons: 3,
    episodes: 24,
    views: 287000,
    isFeatured: false,
    cast: ["Various Scholars"],
  },
  {
    id: 105,
    type: "series",
    title: "Daniel's Story",
    description:
      "An epic biblical drama following the prophet Daniel from captivity to the royal courts of Babylon.",
    thumbnail:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1280&q=80",
    genre: ["Drama", "Faith", "Historical"],
    maturityRating: "PG",
    releaseYear: 2020,
    seasons: 2,
    episodes: 16,
    views: 198000,
    isFeatured: true,
    cast: ["Biblical cast"],
  },
  {
    id: 106,
    type: "series",
    title: "Grace & Mercy",
    description:
      "A modern-day family drama exploring how faith transforms relationships across three generations.",
    thumbnail:
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1280&q=80",
    genre: ["Drama", "Family", "Faith"],
    maturityRating: "PG",
    releaseYear: 2023,
    seasons: 1,
    episodes: 10,
    views: 89000,
    isFeatured: false,
    cast: ["Family cast"],
  },
];

export const KIDS_CONTENT = [
  {
    id: 201,
    type: "movie",
    title: "Veggie Tales: Jonah",
    description:
      "A veggie adventure about the prophet who was swallowed by a big fish and learned about compassion.",
    thumbnail:
      "https://images.unsplash.com/photo-1559070169-a3077159ee16?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1280&q=80",
    genre: ["Kids", "Animation", "Faith"],
    maturityRating: "G",
    releaseYear: 2002,
    duration: "1h 22m",
    views: 534000,
    isFeatured: false,
    isKids: true,
  },
  {
    id: 202,
    type: "movie",
    title: "The Prince of Egypt",
    description:
      "The epic animated story of Moses and the Exodus — a timeless tale of faith and freedom.",
    thumbnail:
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1280&q=80",
    genre: ["Kids", "Animation", "Faith"],
    maturityRating: "PG",
    releaseYear: 1998,
    duration: "1h 39m",
    views: 1200000,
    isFeatured: true,
    isKids: true,
  },
  {
    id: 203,
    type: "series",
    title: "Superbook",
    description:
      "Chris, Joy, and Gizmo travel back in time to experience Bible stories brought to life.",
    thumbnail:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1280&q=80",
    genre: ["Kids", "Animation", "Faith"],
    maturityRating: "G",
    releaseYear: 2011,
    seasons: 5,
    episodes: 78,
    views: 2300000,
    isFeatured: false,
    isKids: true,
  },
  {
    id: 204,
    type: "series",
    title: "The Guardians of Ancora",
    description:
      "An animated adventure where children explore Bible stories in an interactive world.",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1280&q=80",
    genre: ["Kids", "Animation", "Adventure"],
    maturityRating: "G",
    releaseYear: 2020,
    seasons: 2,
    episodes: 20,
    views: 345000,
    isFeatured: false,
    isKids: true,
  },
  {
    id: 205,
    type: "movie",
    title: "Little Angels",
    description:
      "Sweet animated tales of guardian angels helping children through life's challenges.",
    thumbnail:
      "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1280&q=80",
    genre: ["Kids", "Animation", "Faith"],
    maturityRating: "G",
    releaseYear: 2021,
    duration: "58m",
    views: 178000,
    isFeatured: false,
    isKids: true,
  },
  {
    id: 206,
    type: "series",
    title: "Bible Heroes",
    description:
      "Exciting animated adventures featuring David, Esther, Noah and other beloved Bible heroes.",
    thumbnail:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1280&q=80",
    genre: ["Kids", "Animation", "Faith"],
    maturityRating: "G",
    releaseYear: 2019,
    seasons: 3,
    episodes: 36,
    views: 567000,
    isFeatured: false,
    isKids: true,
  },
];

export const LIVE_EVENTS = [
  {
    id: 301,
    type: "live",
    title: "Sunday Morning Worship Live",
    description:
      "Join thousands worldwide for an uplifting live worship service with praise, prayer, and the Word.",
    thumbnail:
      "https://images.unsplash.com/photo-1501386761578-eaa54b492c65?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1280&q=80",
    isLive: true,
    viewers: 12430,
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    genre: ["Worship", "Live"],
    channel: "GoFlix Worship",
  },
  {
    id: 302,
    type: "live",
    title: "Gospel Music Awards 2025",
    description:
      "The biggest night in gospel music — celebrating the best artists shaping faith-driven sound.",
    thumbnail:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1280&q=80",
    isLive: false,
    isUpcoming: true,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    genre: ["Music", "Awards", "Gospel"],
    channel: "GoFlix Events",
  },
  {
    id: 303,
    type: "live",
    title: "Kingdom Conference 2025",
    description:
      "A powerful gathering of pastors, leaders and believers for a week of revival and transformation.",
    thumbnail:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1280&q=80",
    isLive: false,
    isUpcoming: true,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    genre: ["Conference", "Faith", "Live"],
    channel: "GoFlix Events",
  },
  {
    id: 304,
    type: "live",
    title: "Midnight Prayer & Praise",
    description:
      "Join the global midnight prayer movement — an immersive live experience of worship and intercession.",
    thumbnail:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1280&q=80",
    isLive: true,
    viewers: 4821,
    startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    genre: ["Prayer", "Worship", "Live"],
    channel: "GoFlix Prayer",
  },
  {
    id: 305,
    type: "live",
    title: "Youth Revival Night",
    description:
      "An electric night of worship designed for the next generation — high energy, deep faith.",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    banner:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1280&q=80",
    isLive: false,
    isUpcoming: true,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    genre: ["Youth", "Worship", "Live"],
    channel: "GoFlix Youth",
  },
];

export const REELS = [
  {
    id: 401,
    type: "reel",
    title: "The Moment She Found Faith",
    description: "A powerful 60-second testimony that will move your spirit.",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    videoUrl: "",
    likes: 24300,
    shares: 3200,
    views: 189000,
    duration: "0:58",
    movieId: 2,
    movieTitle: "War Room",
  },
  {
    id: 402,
    type: "reel",
    title: "Grace in the Storm",
    description: "Watch how one family found peace in the impossible.",
    thumbnail:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80",
    videoUrl: "",
    likes: 18700,
    shares: 2100,
    views: 142000,
    duration: "1:12",
    movieId: 4,
    movieTitle: "The Shack",
  },
  {
    id: 403,
    type: "reel",
    title: "Unshakeable Faith",
    description: "A breathtaking scene from the hills of Galilee.",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    videoUrl: "",
    likes: 31200,
    shares: 5600,
    views: 276000,
    duration: "0:45",
    movieId: 1,
    movieTitle: "Risen",
  },
  {
    id: 404,
    type: "reel",
    title: "One Prayer Changed Everything",
    description: "The transformative moment from this year's top faith film.",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
    videoUrl: "",
    likes: 42800,
    shares: 8900,
    views: 394000,
    duration: "1:30",
    movieId: 5,
    movieTitle: "God's Not Dead",
  },
  {
    id: 405,
    type: "reel",
    title: "The Comeback",
    description:
      "Her arm was gone. Her faith was not. The story of Bethany Hamilton.",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    videoUrl: "",
    likes: 56100,
    shares: 12400,
    views: 521000,
    duration: "1:15",
    movieId: 9,
    movieTitle: "Soul Surfer",
  },
  {
    id: 406,
    type: "reel",
    title: "Heaven Is Real",
    description:
      "The moment a child describes heaven changed everything for this family.",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    videoUrl: "",
    likes: 38900,
    shares: 7200,
    views: 367000,
    duration: "0:52",
    movieId: 8,
    movieTitle: "Heaven Is for Real",
  },
];

export const EPISODES = {
  101: [
    {
      season: 1,
      episodes: [
        {
          id: 1001,
          number: 1,
          title: "I Have Called You by Name",
          description:
            "Jesus calls his first disciples by the shores of the Sea of Galilee.",
          thumbnail:
            "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80",
          duration: "52m",
        },
        {
          id: 1002,
          number: 2,
          title: "Shabbat",
          description: "Matthew witnesses a miracle during the Sabbath.",
          thumbnail:
            "https://images.unsplash.com/photo-1499363536502-87642509e31b?w=400&q=80",
          duration: "48m",
        },
        {
          id: 1003,
          number: 3,
          title: "Matthew",
          description: "A despised tax collector has an unexpected encounter.",
          thumbnail:
            "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=400&q=80",
          duration: "55m",
        },
        {
          id: 1004,
          number: 4,
          title: "The Rock on Which It Is Built",
          description: "Simon wrestles with doubt and faith.",
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
          duration: "50m",
        },
        {
          id: 1005,
          number: 5,
          title: "The Wedding Gift",
          description: "The disciples witness the first miracle at Cana.",
          thumbnail:
            "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
          duration: "47m",
        },
        {
          id: 1006,
          number: 6,
          title: "Indescribable Compassion",
          description: "A leper is healed in the most unexpected way.",
          thumbnail:
            "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400&q=80",
          duration: "53m",
        },
        {
          id: 1007,
          number: 7,
          title: "Invitations",
          description:
            "Jesus continues to gather those whom the world has rejected.",
          thumbnail:
            "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80",
          duration: "49m",
        },
        {
          id: 1008,
          number: 8,
          title: "I Am He",
          description:
            "A Samaritan woman's encounter at the well changes everything.",
          thumbnail:
            "https://images.unsplash.com/photo-1499363536502-87642509e31b?w=400&q=80",
          duration: "56m",
        },
      ],
    },
    {
      season: 2,
      episodes: [
        {
          id: 2001,
          number: 1,
          title: "Thunder",
          description: "The Sermon on the Mount begins.",
          thumbnail:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80",
          duration: "54m",
        },
        {
          id: 2002,
          number: 2,
          title: "I Saw You",
          description: "Nathanael's faith is tested in a remarkable way.",
          thumbnail:
            "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80",
          duration: "50m",
        },
        {
          id: 2003,
          number: 3,
          title: "Matthew 4:24",
          description: "A day of healing and miracles beyond imagination.",
          thumbnail:
            "https://images.unsplash.com/photo-1499363536502-87642509e31b?w=400&q=80",
          duration: "52m",
        },
        {
          id: 2004,
          number: 4,
          title: "The Perfect Opportunity",
          description:
            "Judas meets Quintus and a dangerous deal begins to form.",
          thumbnail:
            "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=400&q=80",
          duration: "48m",
        },
        {
          id: 2005,
          number: 5,
          title: "Spirit",
          description: "Jesus teaches on the Holy Spirit in a riveting way.",
          thumbnail:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
          duration: "51m",
        },
        {
          id: 2006,
          number: 6,
          title: "Unlawful",
          description:
            "The disciples face harsh criticism from the religious elite.",
          thumbnail:
            "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
          duration: "53m",
        },
        {
          id: 2007,
          number: 7,
          title: "Reckoning",
          description: "Tensions rise as Jesus's ministry expands.",
          thumbnail:
            "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400&q=80",
          duration: "55m",
        },
        {
          id: 2008,
          number: 8,
          title: "Beyond Mountains",
          description: "A crowd of thousands waits to be fed.",
          thumbnail:
            "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80",
          duration: "57m",
        },
      ],
    },
  ],
};

export const CONTENT_ROWS = [
  {
    id: "continue",
    title: "Continue Watching",
    type: "continue",
    items: MOVIES.slice(0, 6),
  },
  {
    id: "trending",
    title: "Trending Gospel Movies",
    type: "movies",
    items: MOVIES.slice(0, 8),
  },
  {
    id: "family",
    title: "Family Movies",
    type: "movies",
    items: MOVIES.slice(4, 12),
  },
  {
    id: "series",
    title: "Top Series",
    type: "series",
    items: SERIES.slice(0, 6),
  },
  {
    id: "kids",
    title: "Kids & Animation",
    type: "kids",
    items: KIDS_CONTENT.slice(0, 6),
  },
  {
    id: "new",
    title: "New Releases",
    type: "movies",
    items: [...MOVIES].sort(() => Math.random() - 0.5).slice(0, 8),
  },
  {
    id: "reels",
    title: "Reels & Shorts",
    type: "reels",
    items: REELS.slice(0, 6),
  },
  {
    id: "live",
    title: "Live & Upcoming Events",
    type: "live",
    items: LIVE_EVENTS.slice(0, 4),
  },
];

export const ALL_CONTENT = [...MOVIES, ...SERIES, ...KIDS_CONTENT];

export const GENRES = [
  "Drama",
  "Faith",
  "Family",
  "Kids",
  "Animation",
  "Historical",
  "Documentary",
  "Romance",
  "Music",
  "Sports",
  "Mystery",
  "Adventure",
];
