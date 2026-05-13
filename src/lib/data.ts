import bybitLogo from '../assets/bybit.jpg';
import ehudAiLogo from '../assets/EhudAI.png';
import hawiLogo from '../assets/hawi.png';
import huluPayLogo from '../assets/huluPay.png';

// Import new custom covers
import ehudAiCover from '../assets/covers/ehud-ai-1.png';
import gerdPrideCover from '../assets/covers/gerd-pride-1.png';
import lazarusCover from '../assets/covers/lazarus.jpeg';
import telegramCover from '../assets/covers/telegram-premium-1.png';
import satelliteCover from '../assets/covers/satellite-1.jpg';
import astronautCover from '../assets/covers/astronaut-1.png';
import cryptoStartCover from '../assets/covers/crypto-start-1.png';
import bitcoinGerdCover from '../assets/covers/bitcoin-gerd-1.png';

export const CREATOR_NAME = "NAFYAD";
export const BUSINESS_EMAIL = "nafyaddachasa91@gmail.com";

export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@nafyad_",
  youtube: "https://www.youtube.com/@NafTech00",
  instagram: "https://www.instagram.com/n.a.f.y.a.d/",
  facebook: "https://web.facebook.com/profile.php?id=61575207906389",
};

export const STATS = {
  tiktok: "91K",
  youtube: "50K",
  facebook: "60K",
  instagram: "9.5K",
};

export const NAFYAD_INFO = `Nafyad is a Computer Science graduate and research-driven strategist building a new digital identity for the Ethiopian tech landscape. As the founder of NafTech, he specializes in dismantling the Black Box of modern innovation. He makes complex topics like AI, blockchain, and space technology accessible through high-fidelity storytelling and skeptical, evidence-based insights.

By merging a background in software development with high-end media production, Nafyad bridges the gap between global innovation and local context. His approach cuts through the noise, providing technical clarity without the fluff. From analyzing crypto futures to exploring the latest in neural technology, he delivers high-retention content and strategic reviews for a tech-savvy, curiosity-driven audience.

Core Pillars:
• TechTruth: Focused on software development and the mechanics of AI.
• Cryptospace: Strategic analysis of blockchain and digital market dynamics.
• Spaceverse: Research into aerospace and the future of global space exploration.

Partnership Packages:
- Option 1: Single Video - 1 video, concept, editing, captions. Price: 30K ETB (approx. USD equivalent available).
- Option 2: Mini Campaign - 3 videos, concept, editing, captions. Price: 80K ETB.
- Option 3: Standard Campaign - 5 videos, concept, editing, captions. Price: 125K ETB.
- Option 4: Premium - 8 videos/month, dedicated playlist, monthly planning. Price: 185K ETB.
- Option 5: Premium Plus | Yearly Partnership - 100 videos/year, long-term partnership, brand consistency. Price: 2.1M ETB.

Note: Pricing for international clients is calculated at a fixed rate of 1 USD = 180 ETB.`;

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
  price: string;
  priceValue: number; // Numeric ETB value for conversion
  priceSuffix?: string;
  description: string;
  features: string[];
  idealFor: string;
  isHighlighted?: boolean;
}

export const NICHES = [
  {
    id: 'tech',
    title: 'TechTruth',
    subtitle: 'Building the Future',
    description: 'Dismantling the "Black Box" of modern innovation. Deep-dives into software development, AI mechanics, and technical clarity.',
    metric: '94% Retention',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'space',
    title: 'Spaceverse',
    subtitle: 'The Final Frontier',
    description: 'Research-driven exploration of aerospace and global space exploration. High-fidelity storytelling bridging global innovation and local context.',
    metric: '4.2M Reach',
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 'crypto',
    title: 'Cryptospace',
    subtitle: 'Financial Evolution',
    description: 'Strategic, skeptical, and evidence-based analysis of blockchain and digital market dynamics. Cutting through the noise with data-driven insights.',
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
    title: 'Ethiopia Pride, GERD',
    platform: 'tiktok',
    category: 'tech',
    views: '',
    thumbnail: gerdPrideCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7544066848392760632',
    tags: ['Ethiopia', 'Pride'],
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

export const PACKAGES: Package[] = [
  {
    id: 'single',
    name: 'Option 1: Single Video',
    price: '30K ETB',
    priceValue: 30000,
    description: '1 high-quality video optimized for all platforms.',
    features: [
      'Concept development',
      'High-end editing & captions',
      'Platform-ready formatting'
    ],
    idealFor: 'Quick brand awareness',
  },
  {
    id: 'campaign-3',
    name: 'Option 2: Mini Campaign',
    price: '80K ETB',
    priceValue: 80000,
    description: '3 videos optimized for all platforms.',
    features: [
      'Concept development',
      'Editing and captions',
      'Posting-ready versions'
    ],
    idealFor: 'Mid-term campaign',
  },
  {
    id: 'campaign-5',
    name: 'Option 3: Standard Campaign',
    price: '125K ETB',
    priceValue: 125000,
    description: '5 videos optimized for all platforms.',
    features: [
      'Full campaign rollout',
      'Advanced editing & captions',
      'Optimized for retention'
    ],
    idealFor: 'Growth acceleration',
    isHighlighted: true,
  },
  {
    id: 'premium',
    name: 'Option 4: Premium',
    price: '185K ETB',
    priceValue: 185000,
    description: '8 videos per month optimized for all platforms.',
    features: [
      'Dedicated playlist',
      'Monthly content planning',
      'Consistent brand exposure'
    ],
    idealFor: 'Dominant market presence',
  },
  {
    id: 'premium-plus',
    name: 'Option 5: Premium Plus | Yearly Partnership',
    price: '2.1M ETB',
    priceValue: 2100000,
    description: '100 videos per year | Yearly Partnership.',
    features: [
      'Dedicated playlist',
      'Long-term content partnership',
      'Maximum brand consistency'
    ],
    idealFor: 'Strategic enterprise partners',
  },
];

export const BRANDS = [
  { name: 'Bybit', logo: bybitLogo },
  { name: 'Ehud AI', logo: ehudAiLogo },
  { name: 'Hawi', logo: hawiLogo },
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
    answer: 'For a single video (Option 1: Single Video), turnaround is typically 3-5 business days. For larger campaigns, we work on a 2-4 week production cycle depending on complexity.'
  },
  {
    question: 'Do you offer whitelisting rights?',
    answer: 'Yes, whitelisting and usage rights for paid social ads are available as an add-on for Option 1 & 2, and included by default in our Premium packages.'
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
