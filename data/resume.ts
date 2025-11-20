
import { ResumeData } from '../types';

export const RESUME: ResumeData = {
  personal: {
    name: "Anirudh A",
    rollNo: "22B3630",
    program: "B.Des.",
    department: "IDC School of Design",
    institute: "Indian Institute of Technology Bombay",
    specialization: "Design",
    gender: "Male",
    dob: "06/02/2004",
    graduationYear: "2026",
    cpi: "8.31",
    tagline: "Building thoughtful pathways from 'What if?' to 'What is' by designing interactions that make curiosity the only interface you need.",
    portfolio: "rudhsy.com"
  },
  education: [
    {
      id: 'edu1',
      title: 'Graduation',
      subtitle: 'IIT Bombay',
      date: '2026',
      description: 'CPI: 8.31'
    }
  ],
  projects: [
    {
      id: 'proj1',
      title: 'The World as an Interface',
      subtitle: 'AR/VR/MR project | Prof. Jayesh Pillai | Ongoing',
      bullets: [
        'Developing a novel Mixed Reality interaction model that transforms real-world objects into an interface, reducing the cognitive load of traditional WIMP-based UIs.',
        'Prototyping on the Meta Quest 3, leveraging passthrough, hand-tracking, and computer vision to enable direct, tangible interaction with everyday objects.',
        'Designing a context-aware, adaptive UI with a proactive AI agent that provides spatially-anchored information and anticipates user needs.'
      ]
    },
    {
      id: 'proj2',
      title: 'AASAAN',
      subtitle: 'UX Project | Prof. Anirudha Joshi | Aug 2024',
      bullets: [
        'Directed the end-to-end design of a backend app and dashboard for polling officers, cutting critical report submission time by over 90% (from 5+ min to <30s).',
        'Translated insights from contextual interviews with 17 officials into a comprehensive design solution, including a new IA, visual identity, and a high-fidelity prototype.'
      ]
    },
    {
      id: 'proj3',
      title: 'inDrive App Redesign',
      subtitle: 'Ergonomics Project | Prof. Wricha Mishra | Sept 2024',
      bullets: [
        'Directed an ergonomic analysis using Heuristic Evaluation, HTA, & SHERPA, which revealed a high 60.67 NASA-TLX and a subpar 60.71 SUS score.',
        'Delivered a data-driven UI redesign with a new Information Architecture that solved critical pain points, like the "Add Stops" button, as validated by eye-tracking.'
      ]
    },
    {
      id: 'proj4',
      title: 'Outlier - Narrative VR Puzzle Game',
      subtitle: 'VR Project | Prof. Jayesh Pillai | Feb 2025',
      bullets: [
        'Built a high-fidelity Unity prototype for Meta Quest 2, enabling natural hand-tracking interactions in an immersive puzzle narrative.',
        'Playtested with 25+ participants during course exhibition, receiving highly positive feedback on intuitiveness and engagement.'
      ]
    }
  ],
  experience: [
    {
      id: 'exp1',
      title: 'NeuralThread AI',
      subtitle: 'Designer | Dec - Jan 2025',
      bullets: [
        'Established the startup\'s foundational online presence by directing the end-to-end website design, from Information Architecture to final UI, creating the core brand identity, including the company logo and style guide.',
        'Designed an intuitive AI dashboard for fashion photo generation that significantly simplified a complex user workflow and improved task efficiency.'
      ]
    },
    {
      id: 'exp2',
      title: 'Malayalam Text-Entry Phrase Sets for Speech-Output Studies',
      subtitle: 'Research Assistant | Prof. Anirudha Joshi | May - July 2024',
      bullets: [
        'Conducted qualitative user studies with 10 native speakers to assess transcription accuracy from synthesized speech. Analyzed the auditory distinctiveness of Malayalam phrases to create a valuable corpus of audibly distinct phrases.',
        'Utilized Deductive Reasoning Strategy (DRS) to analyze transcription data, identifying key patterns and discrepancies in user-written phrases.'
      ]
    }
  ],
  positions: [
    {
      id: 'pos1',
      title: 'Dept. Joint Secretary',
      subtitle: '',
      description: 'Managed departmental logistics and communications between students, faculty, and the office.'
    },
    {
      id: 'pos2',
      title: 'Class Representative',
      subtitle: '',
      description: 'Advocated for student needs, ensuring feedback was implemented by faculty.'
    },
    {
      id: 'pos3',
      title: 'Design Clinic: Core Team',
      subtitle: '',
      description: 'Coordinated event logistics and communications between startups and IDC students.'
    }
  ],
  awards: [
    {
      id: 'aw1',
      title: 'NTSE Scholar (2020)',
      subtitle: '',
      description: 'Awarded a prestigious national scholarship for ranking in the top 0.2% of 1 million candidates in the two-stage examination.'
    },
    {
      id: 'aw2',
      title: 'Design General Championship',
      subtitle: '',
      description: '2nd position in Inter-Hostel General Championship conducted by The Design Club, IIT Bombay'
    }
  ],
  skills: [
    {
      name: 'Core',
      items: [
        'User Research', 'Contextual Inquiry', 'Usability Testing', 'Qualitative & Quantitative Analysis',
        'Prototyping', 'Wireframing', 'Tangible User Interfaces', 'Cognitive Walkthrough',
        'Data Visualization', 'Service Design', 'System Design', 'Mixed Reality (AR/VR/MR) Design', 'AI-Powered UI/UX'
      ]
    },
    {
      name: 'Design & Prototyping',
      items: ['Figma', 'Miro', 'FigJam', 'Framer', 'ProtoPie', 'Adobe Suite']
    },
    {
      name: 'Development & AI tools',
      items: [
        'Unity', 'Blender', 'Spline', 'Unreal Engine', 'Python', 'GitHub', 'VS Code',
        'Firebase', 'Ollama', 'Hugging Face', 'Notion', 'AI Studio', 'Lovable', 'Arduino IDE'
      ]
    }
  ]
};
