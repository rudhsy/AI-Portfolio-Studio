
import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The World as an Interface",
    category: "AR/VR/MR Research",
    year: "Ongoing",
    role: "Researcher",
    shortDescription: "Developing a novel Mixed Reality interaction model that transforms real-world objects into an interface.",
    coverImageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#FFFFFF",
    caseStudy: [
      { type: 'text', content: "Developing a novel Mixed Reality interaction model that transforms real-world objects into an interface, reducing the cognitive load of traditional WIMP-based UIs." },
      { type: 'image', content: "https://picsum.photos/1200/800", caption: "Mixed Reality Prototype Concept" },
      { type: 'text', content: "Prototyping on the Meta Quest 3, leveraging passthrough, hand-tracking, and computer vision to enable direct, tangible interaction with everyday objects." },
      { type: 'text', content: "Designing a context-aware, adaptive UI with a proactive AI agent that provides spatially-anchored information and anticipates user needs." }
    ]
  },
  {
    id: 2,
    title: "AASAAN",
    category: "UX Project",
    year: "2024",
    role: "Lead Designer",
    shortDescription: "Directed the end-to-end design of a backend app and dashboard for polling officers.",
    coverImageGradient: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    textColor: "#5D4037",
    caseStudy: [
      { type: 'text', content: "Directed the end-to-end design of a backend app and dashboard for polling officers, cutting critical report submission time by over 90% (from 5+ min to <30s)." },
      { type: 'image', content: "https://picsum.photos/1200/801", caption: "Dashboard Interface" },
      { type: 'text', content: "Translated insights from contextual interviews with 17 officials into a comprehensive design solution, including a new IA, visual identity, and a high-fidelity prototype." }
    ]
  },
  {
    id: 3,
    title: "inDrive App Redesign",
    category: "Ergonomics",
    year: "2024",
    role: "UX Researcher",
    shortDescription: "Data-driven UI redesign validated by eye-tracking solving critical pain points.",
    coverImageGradient: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    textColor: "#4A148C",
    caseStudy: [
      { type: 'text', content: "Directed an ergonomic analysis using Heuristic Evaluation, HTA, & SHERPA, which revealed a high 60.67 NASA-TLX and a subpar 60.71 SUS score." },
      { type: 'image', content: "https://picsum.photos/1200/802", caption: "Redesigned Flow" },
      { type: 'text', content: "Delivered a data-driven UI redesign with a new Information Architecture that solved critical pain points, like the 'Add Stops' button, as validated by eye-tracking." }
    ]
  },
  {
    id: 4,
    title: "Outlier - Narrative VR Puzzle Game",
    category: "VR Game",
    year: "2025",
    role: "Unity Developer",
    shortDescription: "High-fidelity Unity prototype for Meta Quest 2 with natural hand-tracking.",
    coverImageGradient: "linear-gradient(to right, #434343 0%, black 100%)",
    textColor: "#FFFFFF",
    caseStudy: [
      { type: 'text', content: "Built a high-fidelity Unity prototype for Meta Quest 2, enabling natural hand-tracking interactions in an immersive puzzle narrative." },
      { type: 'image', content: "https://picsum.photos/1200/803", caption: "Gameplay Screenshot" },
      { type: 'text', content: "Playtested with 25+ participants during course exhibition, receiving highly positive feedback on intuitiveness and engagement." }
    ]
  },
  {
    id: 5,
    title: "ChronoShift",
    category: "Tangible Interface",
    year: "2023",
    role: "Interaction Designer",
    shortDescription: "A physical dial interface for navigating historical timelines in digital museums.",
    coverImageGradient: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
    textColor: "#FFFFFF",
    caseStudy: [
      { type: 'text', content: "Designed a haptic dial controller that allows museum visitors to scroll through historical eras with physical resistance feedback representing the passage of time." },
      { type: 'image', content: "https://picsum.photos/1200/804", caption: "Physical Prototype" },
      { type: 'text', content: "Conducted user testing with 40 participants, demonstrating a 45% increase in information retention compared to standard touchscreen sliders." }
    ]
  },
  {
    id: 6,
    title: "EcoSense Dashboard",
    category: "Data Visualization",
    year: "2023",
    role: "Frontend Developer",
    shortDescription: "Real-time environmental monitoring dashboard for smart city infrastructure.",
    coverImageGradient: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
    textColor: "#FFFFFF",
    caseStudy: [
      { type: 'text', content: "Built a React-based dashboard visualizing air quality indices, noise levels, and energy consumption across 12 city districts in real-time." },
      { type: 'image', content: "https://picsum.photos/1200/805", caption: "Dashboard Analytics View" },
      { type: 'text', content: "Optimized WebGL rendering for large datasets, ensuring smooth 60fps performance on low-end municipal hardware." }
    ]
  }
];