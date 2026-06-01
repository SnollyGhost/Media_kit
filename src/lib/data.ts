import { 
  CREATOR_NAME, 
  BUSINESS_EMAIL, 
  SOCIAL_LINKS, 
  STATS, 
  NAFYAD_INFO, 
  PACKAGES 
} from './portfolio-data';

import bybitLogo from '../assets/bybit.webp';
import ehudAiLogo from '../assets/EhudAI.webp';
import hawiLogo from '../assets/hawi.webp';
import huluPayLogo from '../assets/huluPay.webp';
import auctionEthiopiaLogo from '../assets/auction_ethiopia.svg';

// Import new custom covers
import ehudAiCover from '../assets/covers/ehud-ai-1.webp';
import v22OspreyCover from '../assets/covers/V22-Osprey.webp';
import lazarusCover from '../assets/covers/lazarus.webp';
import telegramCover from '../assets/covers/telegram-premium-1.webp';
import satelliteCover from '../assets/covers/satellite-1.webp';
import astronautCover from '../assets/covers/astronaut-1.webp';
import cryptoStartCover from '../assets/covers/crypto-start-1.webp';
import bitcoinGerdCover from '../assets/covers/bitcoin-gerd-1.webp';

export { 
  CREATOR_NAME, 
  BUSINESS_EMAIL, 
  SOCIAL_LINKS, 
  STATS, 
  NAFYAD_INFO, 
  PACKAGES 
};

export interface Video {
  id: string;
  title: string;
  platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook';
  category: 'tech' | 'space' | 'crypto';
  views: string;
  thumbnail: string;
  url: string;
  tags: string[];
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  data: { name: string; value: number }[];
}

export interface Package {
  id: string;
  name: string;
  title?: string;
  videoCount?: string;
  priceLabel?: string;
  price: string;
  priceValue: number; // Numeric ETB value for conversion
  priceSuffix?: string;
  description: string;
  features: string[];
  idealFor: string;
  isHighlighted?: boolean;
  isCustomPricing?: boolean;
  isBlurred?: boolean;
}

export const NICHES = [
  {
    id: 'tech',
    title: 'TechTruth',
    subtitle: 'AI, Robotics & Local Trends',
    description: 'Exploring AI, robotics, helper bots, and general technology topics on both local and global scales.',
    metric: '94% Retention',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'space',
    title: 'Spaceverse',
    subtitle: 'Aerospace & Satellites',
    description: 'Research-driven exploration of aerospace, satellites, and the future of space exploration.',
    metric: '4.2M Reach',
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 'crypto',
    title: 'Cryptospace',
    subtitle: 'Updates, News & People',
    description: 'Discussing new updates, key incidents, and the people shaping the blockchain and crypto world.',
    metric: 'Top 1% Engagement',
    color: 'from-amber-500 to-orange-400',
  },
];

export const VIDEOS: Video[] = [
  // TECH (Strategic selection from user links)
  {
    id: 'tech-1',
    title: 'EhudAl: Next-Gen Al Videos 📹',
    platform: 'tiktok',
    category: 'tech',
    views: '',
    thumbnail: ehudAiCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7632959584352668945',
    tags: ['EhudAI', 'Innovation'],
  },
  {
    id: 'tech-2',
    title: 'V-22 Osprey 🚁 In Ethiopia Land',
    platform: 'tiktok',
    category: 'tech',
    views: '',
    thumbnail: v22OspreyCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7600095832196549904',
    tags: ['Osprey', 'AirForce', 'Ethiopia'],
  },
  {
    id: 'tech-3',
    title: "Lazarus vs The World's Banks 💰",
    platform: 'instagram',
    category: 'tech',
    views: '',
    thumbnail: lazarusCover,
    url: 'https://www.instagram.com/reels/DVVROatjZ6X/',
    tags: ['Banking', 'Lazarus'],
  },
  {
    id: 'tech-4',
    title: 'Telegram Premium in Ethiopia',
    platform: 'tiktok',
    category: 'tech',
    views: '',
    thumbnail: telegramCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7627176419260386577',
    tags: ['Telegram', 'Premium'],
  },
  // SPACE
  {
    id: 'space-1',
    title: 'Ethiopia Builds Satellites 🚀',
    platform: 'tiktok',
    category: 'space',
    views: '',
    thumbnail: satelliteCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7632384538139757825',
    tags: ['Space', 'Ethiopia'],
  },
  {
    id: 'space-2',
    title: "Ethiopia's 1st Astronaut Candidate",
    platform: 'facebook',
    category: 'space',
    views: '',
    thumbnail: astronautCover,
    url: 'https://web.facebook.com/reel/2055975581646873',
    tags: ['Astronaut', 'Science'],
  },
  // CRYPTO
  {
    id: 'crypto-1',
    title: 'Start Small, Think Big 🌱',
    platform: 'tiktok',
    category: 'crypto',
    views: '',
    thumbnail: cryptoStartCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7555062611889392907',
    tags: ['Strategy', 'Mindset'],
  },
  {
    id: 'crypto-2',
    title: "Bitcoin Built Ethiopia's Power, GERD",
    platform: 'tiktok',
    category: 'crypto',
    views: '',
    thumbnail: bitcoinGerdCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7623670489700961553',
    tags: ['Bitcoin', 'GERD'],
  },
];

export const METRICS: Metric[] = [
  {
    label: 'TikTok Views (Last 6 Months)',
    value: '7.9M',
    change: '+519K Likes',
    isPositive: true,
    data: [
      { name: 'Nov', value: 800000 },
      { name: 'Dec', value: 1100000 },
      { name: 'Jan', value: 950000 },
      { name: 'Feb', value: 1400000 },
      { name: 'Mar', value: 1750000 },
      { name: 'Apr', value: 1900000 },
    ],
  },
  {
    label: 'Meta Views (Last 6 Months)',
    value: '9.1M',
    change: '+522K Interactions',
    isPositive: true,
    data: [
      { name: 'Nov', value: 850000 },
      { name: 'Dec', value: 1150000 },
      { name: 'Jan', value: 1550000 },
      { name: 'Feb', value: 1500000 },
      { name: 'Mar', value: 1920000 },
      { name: 'Apr', value: 2130000 },
    ],
  },
  {
    label: 'YouTube Views (Last 6 Months)',
    value: '2.4M',
    change: '+9.7K Subs',
    isPositive: true,
    data: [
      { name: 'Nov', value: 200000 },
      { name: 'Dec', value: 350000 },
      { name: 'Jan', value: 400000 },
      { name: 'Feb', value: 450000 },
      { name: 'Mar', value: 480000 },
      { name: 'Apr', value: 520000 },
    ],
  },
];

export const BRANDS = [
  { name: 'Bybit', logo: bybitLogo },
  { name: 'Ehud AI', logo: ehudAiLogo },
  { name: 'Auction Ethiopia', logo: auctionEthiopiaLogo },
  { name: 'Hawi Solutions', logo: hawiLogo },
  { name: 'HuluPay', logo: huluPayLogo },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Hawi T.',
    role: 'CEO, Hawi Tech',
    text: "Nafyad's ability to translate complex software concepts into engaging visual narratives is unmatched. He didn't just showcase our product; he explained our vision.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 't2',
    name: 'Daniel S.',
    role: 'Co-founder, Ehud AI',
    text: "Working with NafTech changed how we perceive content. The retention rates on our campaign were double what we saw with traditional marketing agencies.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 't3',
    name: 'Sarah K.',
    role: 'Marketing Director, HuluPay',
    text: 'Sharp, technical, and aesthetically superior. Nafyad understands the intersection of finance and technology like no other creator in the region.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

export const FAQS = [
  {
    question: 'What is your typical turnaround time?',
    answer: 'For a single video, turnaround is typically 3-5 business days. For larger campaigns, we work on a 2-4 week production cycle depending on complexity.'
  },
  {
    question: 'Do you offer whitelisting rights?',
    answer: 'Yes, whitelisting and usage rights for paid social ads are available as an add-on for Single & Mini Campaign, and included by default in our Premium packages.'
  },
  {
    question: 'Can you handle hardware product photography?',
    answer: 'Absolutely. We have a dedicated studio setup specifically for high-fidelity macro hardware reviews and tech "B-Roll" sequences.'
  },
  {
    question: 'How do you measure campaign success?',
    answer: 'We provide detailed performance logs after 30 days, including engagement rates, viral coefficient, and link-click conversion metrics.'
  }
];
