import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type PointerEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./utils/cn";
import img1 from "../cardnes/1.png";
import img2 from "../cardnes/2.png";
import img3 from "../cardnes/3.png";
import img4 from "../cardnes/4.png";
import img5 from "../cardnes/5.png";
import img6 from "../cardnes/6.png";
import img7 from "../cardnes/7.png";
import heroVideoLocal from "../cardnes/hero-video-1080p.mp4";
import heroImageMobile from "../cardnes/about-2.png";

import proj1 from "../cardnes/69a5f01d5a52f40d6923525a.jpg";
import proj2 from "../cardnes/69a5f01d9c1499eefb44404a.jpg";
import proj3 from "../cardnes/69a5f01dc1cc2f35df9631a2.jpg";
import proj4 from "../cardnes/69a5f01dc1cc2f5cc99631a1.jpg";
import proj5 from "../cardnes/69a5f01dc1cc2fdd7a9631a0.jpg";
import proj6 from "../cardnes/69a5f01dc6b5e933a9f786cd.jpg";

type ProjectFilter = "All" | "Residences" | "Commercial" | "Interiors" | "Structural";
type ProjectCategory = Exclude<ProjectFilter, "All">;

type Service = {
  title: string;
  image: string;
};


type Project = {
  title: string;
  category: ProjectCategory;
  location: string;
  scope: string;
  summary: string;
  before: string;
  after: string;
  image: string;
  size: "feature" | "wide" | "tall" | "standard";
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  project: string;
};

const filters: ProjectFilter[] = ["All", "Residences", "Commercial", "Interiors", "Structural"];

const heroVideo = heroVideoLocal;


const services: Service[] = [
  { title: "Carpet Services", image: img1 },
  { title: "Wood Flooring Services", image: img2 },
  { title: "New Construction", image: img3 },
  { title: "Remodeling Services", image: img4 },
  { title: "Painting Services", image: img5 },
  { title: "Power Washing", image: img6 },
  { title: "Sidewalk Services", image: img7 },
];

const projects: Project[] = [
  {
    title: "Cinder Ridge Residence",
    category: "Residences",
    location: "Austin, Texas",
    scope: "8,400 sq ft / ground-up build",
    summary:
      "A sculpted hillside residence built in exposed concrete, glass, and warm natural finishes with architect-level coordination from shell to lighting.",
    before: "Steep site, fractured planning, and severe grade constraints.",
    after: "A calm monolithic residence with controlled light and seamless indoor-outdoor geometry.",
    image: proj1,
    size: "feature",
  },
  {
    title: "Mercer Frame Offices",
    category: "Commercial",
    location: "New York, New York",
    scope: "21,000 sq ft / adaptive buildout",
    summary:
      "A steel-forward workplace retrofit shaped around acoustic control, hospitality finishes, and highly coordinated service integration.",
    before: "Dark shell conditions and disconnected circulation.",
    after: "Open collaborative floors with engineered flow and a premium material identity.",
    image: proj2,
    size: "tall",
  },
  {
    title: "Harborline Penthouse",
    category: "Interiors",
    location: "Miami, Florida",
    scope: "4,100 sq ft / full interior reconstruction",
    summary:
      "A luxury penthouse interior built around stone calibration, concealed lighting, warm oak, and tightly resolved architectural detailing.",
    before: "Developer-grade surfaces with no material rhythm.",
    after: "A restrained interior with hospitality-level finish and spatial continuity.",
    image: proj3,
    size: "wide",
  },
  {
    title: "Axis Loft Reinforcement",
    category: "Structural",
    location: "Brooklyn, New York",
    scope: "6,300 sq ft / structural recovery + conversion",
    summary:
      "A complex repair and residential conversion where hidden framing intervention had to support a gallery-grade finish language.",
    before: "Compromised framing, uneven floors, and unstable service routes.",
    after: "A stabilized structure with quiet detailing and durable finish continuity.",
    image: proj4,
    size: "standard",
  },
  {
    title: "Foundry Hall Flagship",
    category: "Commercial",
    location: "Chicago, Illinois",
    scope: "12,600 sq ft / retail-hospitality hybrid",
    summary:
      "An immersive flagship environment defined by exposed services, dark metal framing, rich material contrast, and calibrated customer flow.",
    before: "An empty volume with no visitor narrative or brand presence.",
    after: "A cinematic spatial experience anchored by industrial precision.",
    image: proj5,
    size: "wide",
  },
  {
    title: "Atelier Court Residence",
    category: "Residences",
    location: "Los Angeles, California",
    scope: "9,200 sq ft / luxury courtyard home",
    summary:
      "A courtyard house balancing privacy, concrete massing, warm timber, and hidden structural steel to create a composed modern sanctuary.",
    before: "Undeveloped lot with difficult light and privacy edges.",
    after: "A protected residence with measured openings, warm interiors, and strong structural rhythm.",
    image: proj6,
    size: "tall",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Site Intelligence",
    description:
      "Measured surveys, consultant coordination, field verification, and real construction planning before visible work begins.",
  },
  {
    id: "02",
    title: "Structural Resolution",
    description:
      "Framing, concrete, steel, MEP pathways, and envelope logic are coordinated first so finish work stays uncompromised.",
  },
  {
    id: "03",
    title: "Material Execution",
    description:
      "Mockups, fabrication, procurement, installation tolerances, and lighting relationships are controlled at the site level.",
  },
  {
    id: "04",
    title: "Final Calibration",
    description:
      "Surface quality, hardware alignment, finish touch-up, and handoff standards are refined with the same care as the structure.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "They approached our home like a construction atelier, not a contractor. Every reveal, steel edge, and concrete surface felt deliberate.",
    author: "Avery Nolan",
    role: "Private client",
    project: "Cinder Ridge Residence",
  },
  {
    quote:
      "The team understood engineering, finish quality, and client presentation at the same time. That combination is rare in commercial construction.",
    author: "Mira Chen",
    role: "Development director",
    project: "Mercer Frame Offices",
  },
  {
    quote:
      "They solved difficult structural conditions without compromising the architectural intent. The completed space feels powerful, calm, and permanent.",
    author: "Julian Reyes",
    role: "Architect collaborator",
    project: "Axis Loft Reinforcement",
  },
];

function SectionKicker({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-black font-bold">
      <span className="h-px w-9 bg-[#C85A2D]" />
      <span>{children}</span>
    </div>
  );
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PortfolioCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:-translate-y-1 block"
    >
      {/* Image Section (Top) */}
      <div className="relative h-[24rem] sm:h-[28rem] overflow-hidden w-full shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* White Box attached after the image (Bottom) */}
      <div className="flex flex-col justify-between flex-grow p-8 sm:p-10 bg-white">
        <div>
          <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] mb-3 font-bold">
            {project.category}
          </div>
          <h3 className="text-5xl font-display leading-tight text-[#C85A2D] mb-3">
            {project.title}
          </h3>
          <p className="text-lg leading-6 text-[#7B6F64] mb-6 line-clamp-2 font-bold">
            {project.summary}
          </p>
        </div>
        <div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#3E3B38] transition duration-300 hover:text-[#C85A2D] font-bold"
          >
            Read More
            <span aria-hidden="true" className="text-[#C85A2D] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (testimonialPaused) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [testimonialPaused]);

  const handleTestimonialPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    touchStartX.current = event.clientX;
  };

  const handleTestimonialPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        setActiveTestimonial((current) => (current + 1) % testimonials.length);
      } else {
        setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length);
      }
    }
    touchStartX.current = null;
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="relative overflow-x-hidden bg-[#FBF7F0] text-[#3E3B38]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(59,91,219,0.12),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(217,75,43,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />
        <div className="absolute inset-0 blueprint-grid opacity-[0.12]" />
      </div>

      {/* Detached Logo with Glass Card */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-12 lg:top-4 lg:left-16 z-[60]">
        <a
          href="#home"
          className="group flex items-center justify-center rounded-2xl sm:rounded-[2rem] border border-white/30 bg-white/20 px-3 py-2 sm:px-5 sm:py-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-[1.02]"
          aria-label="cardenas construction"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img
            src="/logo1.png"
            alt="Cardenas Construction Logo"
            className="w-[140px] xs:w-[170px] sm:w-[220px] lg:w-[250px] h-auto object-contain drop-shadow-md"
          />
        </a>
      </div>

      {/* Detached Permanent Navigation Pill */}
      <header className="fixed inset-x-0 top-3 sm:top-8 lg:top-9 z-50 flex justify-end lg:justify-center pointer-events-none px-4 sm:px-8 lg:pl-[10%]">
        <div className="pointer-events-auto flex items-center gap-4 sm:gap-8 rounded-full border border-[#D4C4B0] bg-[#FBF7F0]/95 px-3 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 shadow-[0_20px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl">
          <nav className="hidden items-center gap-8 lg:flex">
            {[
              ["Story", "#about"],
              ["Services", "#services"],
              ["Projects", "#projects"],
              ["Process", "#process"],
              ["Voices", "#testimonials"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="group relative text-sm font-bold uppercase tracking-[0.24em] text-[#7B6F64] transition-colors duration-300 hover:text-[#3E3B38]"
              >
                {label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#C85A2D] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="hidden rounded-full border border-[#C85A2D]/35 bg-[#C85A2D]/12 px-4 py-2 sm:px-5 sm:py-3 text-[0.6rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#3E3B38] transition duration-300 hover:border-[#B8860B] hover:bg-[#C85A2D]/22 xs:inline-flex items-center gap-2"
            >
              Start <span className="hidden sm:inline">a Project</span>
              <span className="text-[#B8860B]">→</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#1C1A18] text-[#FBF7F0] lg:hidden relative z-[70]"
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="space-y-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-5 bg-current origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-5 bg-current"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-5 bg-current origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[65] bg-[#FBF7F0] lg:hidden"
          >
            <div className="flex flex-col h-full px-8 py-24 sm:py-32">
              <nav className="flex flex-col gap-8">
                {[
                  ["Story", "#about"],
                  ["Services", "#services"],
                  ["Projects", "#projects"],
                  ["Process", "#process"],
                  ["Voices", "#testimonials"],
                ].map(([label, href], i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    key={label}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl xs:text-5xl font-display text-[#C85A2D] hover:translate-x-4 transition-transform duration-300"
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-10 border-t border-[#D4C4B0]"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-between rounded-full bg-[#1C1A18] px-8 py-6 text-sm font-bold uppercase tracking-[0.2em] text-[#FBF7F0]"
                >
                  Start a Project
                  <span className="text-[#C85A2D]">→</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section id="home" className="relative isolate min-h-screen overflow-hidden border-b border-[#D4C4B0]">
          <div className="absolute inset-0">
            {/* Video for medium+ screens, image for mobile to improve performance and readability */}
            <video
              className="hidden md:block h-full w-full object-cover"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ transform: reduceMotion ? undefined : `translateY(${scrollY * 0.08}px)` }}
            />
            <img
              className="block md:hidden h-full w-full object-cover"
              src={heroImageMobile}
              alt="Construction site"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,240,0.1),rgba(251,247,240,0.25)_68%,rgba(251,247,240,0.4))]" />
            {/* Darker overlay on small screens to improve text contrast over the video */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62),rgba(0,0,0,0.36)_68%,rgba(0,0,0,0.26))] md:hidden" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(200,90,45,0.12),transparent_22%)]" />

            <motion.div
              className="absolute right-[10%] top-[22%] hidden h-56 w-56 rounded-full bg-[#C85A2D]/10 blur-3xl md:block"
              animate={reduceMotion ? undefined : { opacity: [0.2, 0.45, 0.2], scale: [1, 1.08, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-[8%] top-[18%] hidden h-56 w-56 rounded-full bg-[#B8860B]/10 blur-3xl md:block"
              animate={reduceMotion ? undefined : { opacity: [0.2, 0.42, 0.2], y: [0, -18, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-[1920px] items-center px-6 pb-14 pt-36 xs:pt-48 sm:pt-64 lg:pt-[240px] sm:px-8 lg:px-12">
            <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_430px] xl:gap-16">
              <div className="space-y-10">
                <Reveal className="max-w-4xl space-y-8 sm:space-y-10 lg:space-y-16">
                  <div className="space-y-5">
                    <h1 className="font-display text-[clamp(2.75rem,12vw,9.5rem)] leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] text-balance text-white md:text-black drop-shadow-[0_8px_28px_rgba(0,0,0,0.6)]">
                      Residential And Commercial Construction Across New Jersey
                    </h1>
                  </div>
                  <div className="flex flex-col gap-4 xs:flex-row">
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FBF7F0]/38 px-7 py-4 text-[0.74rem] uppercase tracking-[0.24em] text-[#3E3B38] backdrop-blur-md transition duration-300 hover:bg-[#C85A2D] hover:shadow-[0_0_40px_rgba(217,75,43,0.24)] font-bold"
                    >
                      View Signature Projects
                      <span>↗</span>
                    </a>
                    <a
                      href="#about"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-[#7B6F64]/18 bg-[#FBF7F0]/38 px-7 py-4 text-[0.74rem] uppercase tracking-[0.24em] text-[#3E3B38] backdrop-blur-md transition duration-300 hover:border-[#B8860B]/50 hover:bg-[#C85A2D] font-bold"
                    >
                      Our Construction Philosophy
                      <span className="text-[#B8860B]">→</span>
                    </a>
                  </div>
                </Reveal>


              </div>


            </div>
          </div>
        </section>

        <section id="about" className="relative border-b border-[#D4C4B0] bg-[#FBF7F0] py-24 sm:py-28">
          <div className="mx-auto max-w-[1920px] px-6 sm:px-8 lg:px-12 flex flex-col gap-16 lg:gap-24">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
              <Reveal className="relative">
                <div className="relative h-full min-h-[540px] lg:min-h-[640px] w-full">
                  <div className="absolute -left-10 -top-10 h-[360px] w-[360px] rounded-full bg-[#C85A2D]/10 blur-3xl" />
                  <div className="relative h-full overflow-hidden rounded-[36px] border border-[#D4C4B0] bg-[#FBF7F0]/80 shadow-[0_40px_120px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:-translate-y-1">
                    <img src={img1} alt="Construction detail" className="h-[540px] lg:h-[640px] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111314]/24 via-transparent to-transparent" />
                    <div className="absolute left-6 bottom-6 rounded-[32px] border border-white/70 bg-white/75 px-5 py-4 text-sm uppercase tracking-[0.24em] text-[#3E3B38] shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl font-bold">
                      <div className="text-[0.68rem] font-bold">Built for every phase</div>
                      <div className="mt-1 text-2xl font-bold">6+ Years</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="space-y-10 lg:pl-12">
                <Reveal className="space-y-6">
                  <SectionKicker>Built from drawings. Proven on site.</SectionKicker>
                  <h2 className="font-display text-5xl tracking-[-0.03em] text-[#C85A2D] sm:text-7xl">
                    A construction atelier for warm architecture, quiet structure, and premium delivery.
                  </h2>
                  <p className="max-w-3xl text-lg leading-8 text-[#7B6F64]/92 sm:text-xl font-bold">
                    Cardenas Construction LLC serves Hackensack and greater New Jersey with an elegant approach to residential and commercial builds. Our work is distinguished by structural clarity, material discipline, and a refined process that keeps every project composed.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="space-y-12">
              <Reveal delay={0.05} className="grid gap-8 lg:gap-12 md:grid-cols-2">
                <div className="rounded-[28px] border border-[#D4C4B0] bg-white/85 p-10 lg:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 min-h-[290px]">
                  <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">Founder Story</div>
                  <p className="mt-4 text-lg leading-7 text-[#3E3B38] lg:text-lg lg:leading-8 font-bold">
                    Our team began in technically demanding renovations and concrete work, then grew into a local construction studio with deep structural and finish expertise.
                  </p>
                  <dl className="mt-6 grid gap-4 text-sm leading-7 text-[#7B6F64] font-bold">
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.24em] text-[#C85A2D]">Specialty</dt>
                      <dd className="mt-2 text-[#3E3B38]">Complex builds with elevated structural and finish demands</dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.24em] text-[#C85A2D]">Approach</dt>
                      <dd className="mt-2 text-[#3E3B38]">Clear planning, communicated milestones, and consistent execution</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[28px] border border-[#D4C4B0] bg-white/85 p-10 lg:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 min-h-[290px]">
                  <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">Field Presence</div>
                  <p className="mt-4 text-lg leading-7 text-[#3E3B38] lg:text-lg lg:leading-8 font-bold">
                    We build with calm site leadership, engineered sequencing, and a finish-first mindset. The result is construction that feels deliberate at every scale.
                  </p>
                  <ul className="mt-6 space-y-3 text-[#7B6F64]">
                    <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#C85A2D]" />Tight tolerances and calm coordination</li>
                    <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#C85A2D]" />Material language that reads as a whole</li>
                    <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#C85A2D]" />Built for long-term performance and presence</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="grid gap-8 lg:gap-12 md:grid-cols-3">
                {[
                  { title: "Structural clarity", body: "Hidden structure is composed with equal care as finished surfaces." },
                  { title: "Material language", body: "Timber, stone, steel and finish are read as a single premium composition." },
                  { title: "Enduring craftsmanship", body: "Details are resolved for permanence, tactility, and quiet luxury." },
                ].map((item, index) => (
                  <article key={item.title} className="group rounded-[28px] border border-[#D4C4B0] bg-white/85 p-10 shadow-[0_24px_60px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 min-h-[260px]">
                    <div className="mb-3 text-[0.68rem] uppercase tracking-[0.26em] text-[#C85A2D] font-bold">0{index + 1}</div>
                    <h3 className="text-xl text-[#C85A2D] font-bold">{item.title}</h3>
                    <p className="mt-3 text-lg leading-7 text-[#7B6F64] font-bold">{item.body}</p>
                  </article>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="services" className="relative border-b border-[#D4C4B0] bg-[#FBF7F0] py-24 sm:py-28">
          <div className="mx-auto max-w-[1920px] px-6 sm:px-8 lg:px-12">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <Reveal className="space-y-5">
                <SectionKicker>Services</SectionKicker>
                <h2 className="font-display text-5xl leading-none tracking-[-0.03em] text-[#C85A2D] sm:text-7xl">
                  Bespoke service suites delivered with architectural precision.
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="lg:max-w-2xl lg:justify-self-end">
                <p className="text-lg leading-8 text-[#7B6F64]/88 sm:text-xl font-bold">
                  A premium gallery of service offerings anchored by clean imagery, refined spacing, and a calm, elevated experience.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Reveal
                  key={service.title}
                  delay={index * 0.04}
                  className={index === services.length - 1 ? "sm:col-span-2 xl:col-span-3" : ""}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.04 }}
                    className="group overflow-hidden rounded-[32px] border border-[#D4C4B0] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,0,0,0.16)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-[22rem] w-full object-cover transition duration-700 group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">Service</div>
                      <h3 className="mt-4 text-5xl font-display leading-tight text-[#C85A2D]">{service.title}</h3>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative border-b border-[#D4C4B0] py-24 sm:py-28">
          <div className="mx-auto max-w-[1920px] px-6 sm:px-8 lg:px-12">
            <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <Reveal className="max-w-4xl space-y-5">
                <SectionKicker>Featured Projects</SectionKicker>
                <h2 className="font-display text-5xl leading-none tracking-[-0.03em] text-[#C85A2D] sm:text-7xl">
                  A portfolio that feels like modern architecture in print—and in motion.
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-[#7B6F64]/86 sm:text-xl font-bold">
                  Selected residences, structural transformations, commercial spaces, and high-end interiors. Each one reflects measured constraints,
                  technical coordination, and a material sensibility grounded in real craftsmanship.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "rounded-full border px-4 py-2 sm:px-5 sm:py-3 text-[0.65rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.22em] transition duration-300",
                        activeFilter === filter
                          ? "border-[#C85A2D] bg-[#C85A2D] text-[#3E3B38] shadow-[0_0_35px_rgba(217,75,43,0.2)]"
                          : "border-[#D4C4B0] bg-[#F5EFE6]/68 text-[#7B6F64] hover:border-[#B8860B]/40 hover:bg-[#F5EFE6]"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            <motion.div layout className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <PortfolioCard key={project.title} project={project} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="process" className="relative border-b border-[#D4C4B0] bg-[#FBF7F0] py-24 sm:py-28">
          <div className="mx-auto grid max-w-[1920px] gap-12 px-6 sm:px-8 lg:grid-cols-[0.96fr_1.04fr] lg:px-12">
            <div className="space-y-6">
              <Reveal className="space-y-6">
                <SectionKicker>Execution Framework</SectionKicker>
                <h2 className="font-display text-5xl leading-none tracking-[-0.03em] text-[#C85A2D] sm:text-7xl">
                  Blueprint thinking. Field discipline. Finished space with presence.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-[#7B6F64]/86 sm:text-xl font-bold">
                  Luxury construction is won long before the final photographs. It is won in planning, field coordination, tolerance control, and the ability to keep the original architectural idea intact under real jobsite pressure.
                </p>
              </Reveal>

              <div className="rounded-[36px] border border-[#D4C4B0] bg-white/90 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.14)]">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#C85A2D]/20 bg-[#FFF1E4]/80 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">
                  Process System
                </div>
                <h3 className="mt-6 text-5xl font-display tracking-[-0.03em] text-[#C85A2D]">A premium field framework for engineered construction delivery.</h3>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#7B6F64]/88 font-bold">
                  Every step is mapped so structure, materials, and finish align from mobilization through final calibration. This is construction designed to feel composed, decisive, and intentional.
                </p>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-[#D4C4B0] bg-[#FBF7F0]/85 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                    <div className="text-sm uppercase tracking-[0.24em] text-[#C85A2D] font-bold">Field Intelligence</div>
                    <p className="mt-4 text-lg leading-7 text-[#7B6F64] font-bold">Measured surveys, coordination, and real-site planning before visible work begins.</p>
                  </div>
                  <div className="rounded-[28px] border border-[#D4C4B0] bg-[#FBF7F0]/85 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                    <div className="text-sm uppercase tracking-[0.24em] text-[#C85A2D] font-bold">Material Precision</div>
                    <p className="mt-4 text-lg leading-7 text-[#7B6F64] font-bold">Mockups, procurement, and installation tolerances are coordinated with finish-first discipline.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col rounded-[36px] border border-[#D4C4B0] bg-[#FBF7F0]/90 p-8 sm:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.14)]">
              <div className="relative flex flex-col justify-between h-full gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group flex flex-col sm:flex-row gap-6 relative overflow-hidden rounded-[30px] border border-[#D4C4B0] bg-white/85 p-6 sm:p-8 shadow-[0_22px_50px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C85A2D]/20 bg-[#FFF1E4]/90 text-sm uppercase tracking-[0.2em] text-[#C85A2D] shadow-inner font-bold">
                      {step.id}
                    </div>
                    <div className="space-y-3 pt-1">
                      <h3 className="text-5xl font-semibold text-[#C85A2D]">{step.title}</h3>
                      <p className="text-lg leading-7 text-[#7B6F64]/90 font-bold">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative border-b border-[#D4C4B0] bg-[#FBF7F0] py-24 sm:py-28">
          <div className="mx-auto max-w-[1920px] px-6 sm:px-8 lg:px-12">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <Reveal className="space-y-5">
                <SectionKicker>Client Voices</SectionKicker>
                <h2 className="font-display text-5xl leading-none tracking-[-0.03em] text-[#C85A2D] sm:text-7xl">
                  Trusted voices from completed architecture and construction work.
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="lg:max-w-2xl lg:justify-self-end">
                <p className="text-lg leading-8 text-[#7B6F64]/86 sm:text-xl font-bold">
                  Testimonials from clients who value precision, material intelligence, and a construction partner that delivers with care.
                </p>
              </Reveal>
            </div>

            <div
              className="relative overflow-hidden rounded-[36px] border border-[#D4C4B0] bg-white/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:p-8"
              onPointerDown={handleTestimonialPointerDown}
              onPointerUp={handleTestimonialPointerUp}
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => setTestimonialPaused(false)}
            >
              <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#C85A2D]/10 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C85A2D]/50 to-transparent" />
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45 }}
                    className="relative rounded-[32px] border border-[#D4C4B0] bg-[#F5EFE6]/95 p-10 shadow-[0_26px_70px_rgba(0,0,0,0.12)]"
                  >
                    <div className="font-display text-6xl leading-none text-[#B8860B]">“</div>
                    <p className="mt-6 text-lg leading-9 text-[#3E3B38] font-bold">{testimonials[activeTestimonial].quote}</p>
                    <div className="mt-8 flex flex-col gap-2 border-t border-[#D4C4B0] pt-6 text-sm text-[#7B6F64] sm:flex-row sm:items-center sm:justify-between font-bold">
                      <div>
                        <div className="font-semibold uppercase tracking-[0.18em] text-[#3E3B38]">{testimonials[activeTestimonial].author}</div>
                        <div className="mt-1 text-[#9B8F80]">{testimonials[activeTestimonial].role} / {testimonials[activeTestimonial].project}</div>
                      </div>
                      <div className="flex gap-3">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            aria-label={`View testimonial ${index + 1}`}
                            onClick={() => setActiveTestimonial(index)}
                            className={cn(
                              "h-3 w-3 rounded-full transition-all duration-300",
                              activeTestimonial === index ? "bg-[#C85A2D]" : "bg-[#D4C4B0]/80"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4C4B0] bg-[#FBF7F0] text-[#3E3B38] transition duration-300 hover:border-[#C85A2D] hover:bg-[#F5E1D1]"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4C4B0] bg-[#FBF7F0] text-[#3E3B38] transition duration-300 hover:border-[#C85A2D] hover:bg-[#F5E1D1]"
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative isolate overflow-hidden bg-[#F6EEE3] py-24 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,90,45,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(184,134,11,0.12),transparent_24%)]" />
          <div className="absolute inset-0 blueprint-grid opacity-10" />

          <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8">
            <Reveal>
              <div className="grid gap-10 rounded-[40px] border border-[#D4C4B0] bg-white/90 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.14)] sm:grid-cols-[1.05fr_0.95fr] sm:p-12">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#C85A2D]/20 bg-[#FFF1E4]/80 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">
                    Ready to Build
                  </div>
                  <h2 className="font-display text-5xl leading-tight tracking-[-0.03em] text-[#C85A2D] sm:text-7xl">
                    Let’s shape spaces that feel intentional, resilient, and unmistakably premium.
                  </h2>
                  <p className="max-w-3xl text-lg leading-8 text-[#7B6F64]/90 sm:text-xl font-bold">
                    If your project demands architectural control, premium materials, disciplined field execution, and a partner who understands complexity, let’s begin with a conversation.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <a
                      href="mailto:contact@cardenasconstructiollc.com"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C85A2D] px-8 py-4 text-[0.76rem] uppercase tracking-[0.24em] text-[#3E3B38] transition duration-300 hover:bg-[#B8860B] hover:shadow-[0_0_40px_rgba(217,75,43,0.24)] font-bold"
                    >
                      Contact Us
                    </a>
                    <a
                      href="tel:+12014500645"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-[#D4C4B0] bg-[#FBF7F0] px-8 py-4 text-[0.76rem] uppercase tracking-[0.24em] text-[#3E3B38] transition duration-300 hover:border-[#C85A2D] hover:bg-[#F5E1D1] font-bold"
                    >
                      +1 (201) 450-0645
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[32px] bg-[#E7DCCB]/70 p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(200,90,45,0.14),transparent_30%)]" />
                  <div className="relative h-full space-y-6">
                    <div className="rounded-[28px] bg-white/85 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                      <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">Office</div>
                      <div className="mt-4 text-lg text-[#3E3B38] font-bold">Hackensack, NJ</div>
                      <p className="mt-3 text-lg leading-7 text-[#7B6F64] font-bold">Local HQ with regional service across New Jersey.</p>
                    </div>
                    <div className="rounded-[28px] bg-white/85 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                      <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">Availability</div>
                      <div className="mt-4 text-lg text-[#3E3B38] font-bold">Mon–Sat / 6am–8pm</div>
                      <p className="mt-3 text-lg leading-7 text-[#7B6F64] font-bold">Responsive planning and rapid mobilization for every new build.</p>
                    </div>
                    <div className="rounded-[28px] bg-white/85 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                      <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#C85A2D] font-bold">Design Partner</div>
                      <div className="mt-4 text-lg text-[#3E3B38] font-bold">Architects, developers, homeowners</div>
                      <p className="mt-3 text-lg leading-7 text-[#7B6F64] font-bold">Collaborating with design teams to preserve intent while building with rigor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-[#1C1A18] text-[#FBF7F0]">
        <div className="mx-auto max-w-[1920px] px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
            <div className="space-y-8">
              <div className="flex flex-col gap-5">
                <div className="w-fit rounded-xl sm:rounded-2xl bg-[#FBF7F0]/95 px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#D4C4B0]/20">
                  <img
                    src="/logo1.png"
                    alt="Cardenas Construction Logo"
                    className="w-[180px] sm:w-[220px] h-auto object-contain drop-shadow-sm"
                  />
                </div>
                <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#B8860B] font-bold ml-1">
                  Premium building services
                </div>
              </div>
              <p className="max-w-md text-lg leading-8 text-[#A89F91] font-bold">
                Elite construction for luxury homes, commercial environments, modern architectural interiors, and large-scale precision builds.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  ["LinkedIn", "#"],
                  ["Instagram", "#"],
                  ["Houzz", "#"],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="text-[0.7rem] uppercase tracking-[0.28em] text-[#FBF7F0]/60 transition-colors duration-300 hover:text-[#C85A2D] font-bold">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6 text-[0.72rem] uppercase tracking-[0.3em] text-[#C85A2D] font-bold">Navigate</div>
              <div className="space-y-4 text-sm text-[#A89F91] font-bold">
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#about">Story</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#services">Services</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#projects">Projects</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#contact">Contact</a>
              </div>
            </div>

            <div>
              <div className="mb-6 text-[0.72rem] uppercase tracking-[0.3em] text-[#C85A2D] font-bold">Services</div>
              <div className="space-y-4 text-sm text-[#A89F91] font-bold">
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#services">Carpet Services</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#services">New Construction</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#services">Remodeling</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="#services">Painting</a>
              </div>
            </div>

            <div>
              <div className="mb-6 text-[0.72rem] uppercase tracking-[0.3em] text-[#C85A2D] font-bold">Connect</div>
              <div className="space-y-4 text-sm text-[#A89F91] font-bold">
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="mailto:contact@cardenasconstructiollc.com">contact@cardenasconstructiollc.com</a>
                <a className="block transition-colors duration-300 hover:text-[#FBF7F0]" href="tel:+12014500645">+1 (201) 450-0645</a>
                <div>Mon–Sat / 6:00–20:00</div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-[#FBF7F0]/10 pt-8 text-[0.7rem] uppercase tracking-[0.26em] text-[#A89F91] sm:flex-row sm:items-center sm:justify-between font-bold">
            <div>Copyright 2026 Cardenas Construction LLC. All Rights Reserved.</div>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#home" className="transition-colors duration-300 hover:text-[#FBF7F0]">Top</a>
              <a href="#projects" className="transition-colors duration-300 hover:text-[#FBF7F0]">Case Studies</a>
              <a href="#contact" className="transition-colors duration-300 hover:text-[#FBF7F0]">Start a Build</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
