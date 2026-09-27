import { Figma } from 'lucide-react';
import { Project, SkillTab, AudioTrack } from '../types';

export const USER_PROFILE = {
  name: 'DYAH AYU PUSPANINGRUM',
  title: 'FRONTEND DEVELOPER // UI/UX DESIGNER',
  avatarUrl: '/public/audio/avatar.svg',
  status: 'OPERATIONAL / V98',
  availability: 'AVAILABLE FOR WORK',
  location: 'BEKASI, INDONESIA',
  timezone: 'UTC+7 (WIB)',
  email: 'ayudyahp05@gmail.com',
  twitter: '@dyyapping',
  discord: 'dyahhh_42620',
  instagram: '@dyahayupus_',
  github: 'https://github.com/rradagelooo',
  linkedin: 'https://www.linkedin.com/in/dyah-ayu-puspaningrum-9131bb29b/',
  resumeUrl: 'https://canva.link/al2i4vu42lwamg2',
  remote: 'On - Site, Remote (Worldwide)',
  bio: 'Hello World! I am Dyah Ayu Puspaningrum, a Frontend Developer and UI/UX Designer dedicated to crafting engaging, user-centered digital experiences. I bridge the gap between creative design systems and clean, scalable code, transforming conceptual wireframes into high-performance, interactive web applications that feel intuitive and alive.',
  subBio: 'Core focus: Micro-interactions, Design Systems, Component Architecture, clean frontend code, and delightful, user-centered digital experiences',
};

export const PROJECTS: Project[] = [
  {
    id: 'CoB',
    title: 'Clash of Bang Design',
    category: 'UI/UX Design',
    tag: '  FIGMA',
    tagColor: '#006565',
    description: 'Interactive UI/UX prototype showcasing user flows, page navigation, and responsive layouts for Clash of Bang.',
    imageUrl: '/public/audio/CoBDesign.png',
    versionStatus: 'Design v1.0',
    statusBadge: '● Design v1.0',
    liveUrl: 'https://www.figma.com/proto/ddK4EK7C3IQUs4fZMwleHQ/Untitled?node-id=1-3&starting-point-node-id=1%3A3&t=NZZbkzdaAS0N9i2A-1',
    // repoUrl: 'https://github.com/rradagelooo/ClashOfBang.git',
    techStack: ['FIGMA'],
    features: [
      'Interactive User Flow',
      'Responsive Layout Design',
      'Clan Member Registration UI',
      'Troop Stats Overlay Component',
    ],
    codeSnippet: `// Design Tokens & Specs
Primary Color: #dfa841 (Clan Gold) & #1a1a1a (Dark Obsidian)
Font Family: Press Start 2P & Inter / Sans-Serif
Grid System: 8pt baseline grid & Auto-Layout
User Flow: Homepage -> Troops -> Gallery -> About -> Register Form
}`,
  },
  {
    id: 'COB',
    title: 'CLASH OF BANG',
    category: 'Frontend',
    tag: 'REACT / HTML / CSS',
    tagColor: '#4b53bc',
    description: 'An interactive multi-page website (Homepage, Troops, Gallery, About, Register) focusing on clean UI/UX and layout design.',
    imageUrl: '/public/audio/CoBWeb.png',
    versionStatus: 'v1.0-beta',
    statusBadge: '● v1.0-beta',
    // liveUrl: 'https://github.com',
    repoUrl: 'https://github.com/rradagelooo/ClashOfBang.git',
    techStack: ['React', 'JavaScript (ES6+)', 'CSS3 (Vanilla CSS)', 'HTML'],
    features: [
     'Multi-Page Component Structure',
      'Responsive Layout Design with CSS3 (Vanilla CSS)',
      'Interactive UI Navigation with React Router',
      'Frontend Form Handling',
    ],
    codeSnippet: `// const validateForm = () => {
  let newErrors = {};
  if (!formData.name.trim() || formData.name.trim().length < 3) {
    newErrors.name = "Name must be at least 3 characters.";
  }
  const emailVal = formData.email.trim();
  if (!emailVal || !emailVal.includes("@")) {
    newErrors.email = "Invalid email address format.";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
}`,
  },
  {
    id: 'SeatUp Design',
    title: 'SeatUp Design',
    category: 'UI/UX Design',
    tag: 'FIGMA',
    tagColor: '#005e97',
    description: 'A collaborative team project designing an end-to-end user experience for a digital ticketing platform. Focused on crafting intuitive user flows and interactive prototypes spanning from account registration to successful ticket booking.',
    imageUrl: '/public/audio/SeatUp.png',
    versionStatus: 'v1.0-prototype',
    statusBadge: '● v1.0-prototype',
    liveUrl: 'https://www.figma.com/proto/ozE6WIQhkbDOqlyw346wXb/HCI-LEC?node-id=30-450&starting-point-node-id=25%3A11&t=IhitxIfObFQPCRCx-1',
    //repoUrl: 'https://github.com',
    techStack: ['Figma','FigJam'],
    features: [
      'Seamless Account Onboarding',
      'Interactive Event Catalog & Serach',
      'Seat or Ticket Selection Flow',
      'Streamlined Checkout & Confirmation',
      'Ent-to-End User Journey',
    ],
    codeSnippet: `//Design Tokens & Specs
      Primary Color: #006565 (Emerald Dark) & #FF6B6B (Action Accent)
      Font Family: Inter & Courier New
      Grid System: 8pt baseline grid & Auto-Layout
      User Flow: Register -> Login -> Catalog -> Ticket Selection -> Checkout -> Success Booking
    }
  }
}
voxelMesh.instanceMatrix.needsUpdate = true;`,
  },
];

export const SKILLS_TABS: SkillTab[] = [
  {
    id: 1,
    name: 'Core Tech',
    icon: 'terminal',
    headline: 'Core Software Engineering',
    skills: [
      {
        name: 'Frontend Architecture',
        percentage: 95,
        status: '95% [STABLE]',
        description: 'React 19, Next.js, TypeScript',
        segments: 19,
      },
      {
        name: 'Creative Tech & 3D',
        percentage: 88,
        status: '88% [OPT]',
        description: 'HTML5 Canvas, Web Audio',
        segments: 17,
      },
      {
        name: 'Design Systems & UI/UX',
        percentage: 92,
        status: '92% [STABLE]',
        description: 'Tailwind CSS, Token Systems, Retro UI Engineering, Micro-interactions',
        segments: 18,
      },
      // {
      //   name: 'Backend & Cloud',
      //   percentage: 80,
      //   status: '80% [READY]',
      //   description: 'Node.js, PostgreSQL, REST APIs, Redis, Docker, Cloud Run',
      //   segments: 16,
      // },
    ],
  },
  {
    id: 2,
    name: 'Design & 3D',
    icon: 'view_in_ar',
    headline: 'Graphics & Visual Design',
    skills: [
      // {
      //   name: 'Shader Coding (GLSL)',
      //   percentage: 85,
      //   status: '85% [ACCELERATED]',
      //   description: 'Raymarching, procedural textures, post-processing filters, CRT blurs',
      //   segments: 17,
      // },
      // {
      //   name: 'Low-Poly & Voxel Modeling',
      //   percentage: 88,
      //   status: '88% [OPTIMIZED]',
      //   description: 'Blender, MagicaVoxel, three.js optimization, LOD management',
      //   segments: 17,
      // },
      {
        name: 'Typography & Micro-UI',
        percentage: 94,
        status: '94% [PRISTINE]',
        description: 'Skeuomorphic tactile buttons, 0px border discipline, Courier monospace',
        segments: 18,
      },
      {
        name: 'Responsive Layout Architecture',
        percentage: 96,
        status: '96% [FLUID]',
        description: 'Multi-window stacking, desktop canvas scaling, mobile adaptive modals',
        segments: 19,
      },
    ],
    extraNote: 'Hardware accelerated rendering via WebGL 2.0 with fallback software pipeline.',
  },
  {
    id: 3,
    name: 'Tools & Systems',
    icon: 'build',
    headline: 'Development Environment',
    skills: [
      {
        name: 'Version Control',
        percentage: 94,
        status: '94% [PROD]',
        description: 'Git, GitHub Actions, Trunk-based dev, Semantic releases',
        segments: 18,
      },
      {
        name: 'Bundlers & Tooling',
        percentage: 92,
        status: '92% [FAST]',
        description: 'Vite 6, TypeScript 5, Turbopack, ESLint, PostCSS',
        segments: 18,
      },
      // {
      //   name: 'Testing & Reliability',
      //   percentage: 86,
      //   status: '86% [COVERED]',
      //   description: 'Vitest, Playwright, React Testing Library, Accessibility auditing',
      //   segments: 17,
      // },
      // {
      //   name: 'Database & ORM',
      //   percentage: 82,
      //   status: '82% [INTEGRATED]',
      //   description: 'PostgreSQL, Drizzle ORM, Prisma, Redis cache layers',
      //   segments: 16,
      // },
    ],
    extraNote: 'All developer tools configured with strict TypeScript compiler checking and zero runtime warnings.',
  },
];

export const AUDIO_TRACKS: any[] = [  {
    id: 1,
    title: 'I Dont Want to Miss a Thing - Aerosmith',
    artist: 'Aerosmith',
    duration: '05:23',
    bitrate: '128 KBPS',
    frequencies: [55, 82, 45, 90, 68, 72, 40, 85, 30, 65],
    audioUrl: '/public/audio/track1.mp3',
  },
  {
    id: 2,
    title: 'Youre Still The One - Shania Twain',
    artist: 'Shania Twain',
    duration: '03:20',
    bitrate: '128 KBPS',
    frequencies: [55, 82, 45, 90, 68, 72, 40, 85, 30, 65],
    audioUrl: '/public/audio/track2.mp3',
  },
  {
    id: 3,
    title: 'Just The Two Of Us - Bill Withers',
    artist: 'Bill Withers',
    duration: '03:52',
    bitrate: '128 KBPS',
    frequencies: [25, 45, 78, 62, 88, 50, 65, 35, 75, 42],
    audioUrl: '/public/audio/track3.mp3',
  },
  {
    id: 4,
    title: 'If I Let You Go - Westlife',
    artist: 'Westlife',
    duration: '03.41',
    bitrate: '160 KBPS',
    frequencies: [70, 60, 85, 40, 50, 80, 95, 30, 45, 88],
    audioUrl: '/public/audio/track4.mp3',
  },
];
