import bybitLogo from '../assets/bybit.jpg';
import ehudAiLogo from '../assets/EhudAI.png';
import hawiLogo from '../assets/hawi.png';
import huluPayLogo from '../assets/huluPay.png';

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
- Option 1: Single Video - 1 video, concept, editing, captions. Price: 30K ETB.
- Option 2: Mini Campaign - 3 videos, concept, editing, captions. Price: 80K ETB.
- Option 3: Standard Campaign - 5 videos, concept, editing, captions. Price: 125K ETB.
- Option 4: Premium - 8 videos/month, dedicated playlist, monthly planning. Price: 185K ETB.
- Option 5: Premium Plus | Yearly Partnership - 100 videos/year, long-term partnership, brand consistency. Price: 2.1M ETB.`;

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
  // TIKTOK (Priority)
  {
    id: 'tt-1',
    title: 'Digital Workspace Evolution',
    platform: 'tiktok',
    category: 'tech',
    views: '2.4M',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.tiktok.com/@nafyad_/video/7546159416861625606',
    tags: ['TechStyle', 'AI'],
  },
  {
    id: 'tt-2',
    title: 'Future Horizons',
    platform: 'tiktok',
    category: 'space',
    views: '1.9M',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.tiktok.com/@nafyad_/video/7483828207234436358',
    tags: ['Future', 'Tech'],
  },
  {
    id: 'tt-3',
    title: 'Tech Insights',
    platform: 'tiktok',
    category: 'tech',
    views: '820K',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.tiktok.com/@nafyad_/video/7598466285554371857',
    tags: ['Hardware', 'Review'],
  },
  {
    id: 'tt-4',
    title: 'Neural Reality',
    platform: 'tiktok',
    category: 'tech',
    views: '1.5M',
    thumbnail: 'https://images.unsplash.com/photo-1664575197229-3bbebc281874?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.tiktok.com/@nafyad_/video/7346159416861625606',
    tags: ['AI', 'BrainTech'],
  },
  // YOUTUBE
  {
    id: 'yt-1',
    title: 'Silicon Evolution',
    platform: 'youtube',
    category: 'tech',
    views: '850K',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.youtube.com/shorts/B73ztRa-eCA',
    tags: ['Innovation', 'Web3'],
  },
  {
    id: 'yt-2',
    title: 'Mission to Mars',
    platform: 'youtube',
    category: 'space',
    views: '1.2M',
    thumbnail: 'https://images.unsplash.com/photo-1541411438265-4bb4687110f2?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.youtube.com/shorts/k9nK7B_2AFA',
    tags: ['Mars', 'Science'],
  },
  // INSTAGRAM & FACEBOOK
  {
    id: 'ig-1',
    title: 'Cosmic Journeys',
    platform: 'instagram',
    category: 'space',
    views: '3.4M',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.instagram.com/reels/DWWcW3eDO4f/',
    tags: ['Astronomy', 'Cinematic'],
  },
  {
    id: 'ig-2',
    title: 'Digital Sovereignty',
    platform: 'instagram',
    category: 'crypto',
    views: '2.1M',
    thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop',
    url: 'https://www.instagram.com/reels/Cz9-p-oR1y_/',
    tags: ['Crypto', 'Finance'],
  },
];

export const METRICS: Metric[] = [
  {
    label: 'TikTok Views',
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
    label: 'Meta Views',
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
    label: 'YouTube Views',
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
