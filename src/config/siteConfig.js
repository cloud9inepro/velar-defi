export const siteConfig = {
  // ─── Brand ───────────────────────────────────────────
  name: "Velar",
  fullName: "Velar Protocol",
  tagline: "Revolutionize DeFi with Velar",
  subtagline: "Secure. Scalable. Decentralized.",

  // ─── Token ───────────────────────────────────────────
  token: {
    symbol: "VLR",
  },

  // ─── Hero CTAs ───────────────────────────────────────
  cta: {
    primary: "Connect Wallet",
    secondary: "Read Whitepaper",
    whitepaperUrl: "#",
  },

  // ─── Hero Stats ──────────────────────────────────────
  stats: [
    { label: "Total Value Locked", value: 248, suffix: "M+", prefix: "$" },
    { label: "Active Users", value: 120, suffix: "K+", prefix: "" },
    { label: "APY Up To", value: 94, suffix: "%", prefix: "" },
    { label: "Transactions", value: 3.2, suffix: "M+", prefix: "" },
  ],

  // ─── Wallet Options ──────────────────────────────────
  wallets: [
    { name: "MetaMask" },
    { name: "WalletConnect" },
    { name: "Coinbase Wallet" },
    { name: "Phantom" },
  ],

  // ─── Navigation ──────────────────────────────────────
  nav: [
    { label: "Features", href: "#features" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Partners", href: "#partners" },
  ],

  // ─── Socials ─────────────────────────────────────────
  socials: {
    twitter: "https://twitter.com/velarprotocol",
    discord: "https://discord.gg/velar",
    telegram: "https://t.me/velarprotocol",
  },

  // ─── Colors ──────────────────────────────────────────
  colors: {
    accentCyan: "#00f5ff",
    accentPurple: "#a855f7",
    bgDark: "#030712",
  },

  // ─── 3D Orb Settings ─────────────────────────────────
  orb: {
    color1: "#00f5ff",
    color2: "#a855f7",
    ringCount: 3,
    particleCount: 1200,
  },
}