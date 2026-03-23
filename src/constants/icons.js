import { SiCoinbase } from 'react-icons/si'
import { FaTwitter, FaDiscord, FaTelegram, FaGhost } from 'react-icons/fa'
import { RiWallet3Line, RiWalletFill } from 'react-icons/ri'

// ─── Wallet Icons ─────────────────────────────────────────────
export const walletIcons = {
  MetaMask: RiWalletFill,
  WalletConnect: RiWallet3Line,
  'Coinbase Wallet': SiCoinbase,
  Phantom: FaGhost,
}

// ─── Social Icons ─────────────────────────────────────────────
export const socialIcons = {
  twitter: FaTwitter,
  discord: FaDiscord,
  telegram: FaTelegram,
}

// ─── Fallback ─────────────────────────────────────────────────
export const FallbackWalletIcon = RiWallet3Line