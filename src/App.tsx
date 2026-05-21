import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "./utils/cn";

type ServiceIconType =
  | "remodel"
  | "custom"
  | "commercial"
  | "kitchen"
  | "bathroom"
  | "concrete"
  | "exterior"
  | "structural"
  | "flooring"
  | "finish";

type ProjectFilter = "All" | "Residences" | "Commercial" | "Interiors" | "Structural";
type ProjectCategory = Exclude<ProjectFilter, "All">;

type Service = {
  title: string;
  strap: string;
  description: string;
  image: string;
  icon: ServiceIconType;
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

const heroVideo =
  "https://videos.pexels.com/video-files/33070695/14096107_3840_2160_30fps.mp4";
const heroPoster =
  "https://images.pexels.com/photos/5511066/pexels-photo-5511066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600";

const services: Service[] = [ { title: "Luxury Remodeling", strap: "Whole-home transformations", description: "Structural upgrades, plan reconfiguration, finish refinement, and detailed sequencing for residences that demand calm execution.", image: "https://images.pexels.com/photos/7045316/pexels-photo-7045316.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "remodel", }, { title: "Custom Construction", strap: "Ground-up architectural builds", description: "From early site mobilization to final handover, we construct one-of-a-kind residences with structural rigor and material clarity.", image: "https://images.pexels.com/photos/5511066/pexels-photo-5511066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "custom", }, { title: "Commercial Buildouts", strap: "Workplaces, retail, hospitality", description: "Premium tenant improvements and flagship environments shaped by clean detailing, engineering discipline, and schedule control.", image: "https://images.pexels.com/photos/20578678/pexels-photo-20578678.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "commercial", }, { title: "Kitchen Renovation", strap: "Millwork and stone precision", description: "Performance kitchens coordinated around cabinetry tolerances, concealed services, premium surfaces, and warm architectural lighting.", image: "https://images.pexels.com/photos/6489127/pexels-photo-6489127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "kitchen", }, { title: "Bathroom Renovation", strap: "Spa-grade technical detailing", description: "Waterproof assemblies, large-format stone, custom vanities, and precise fixture integration finished to a luxury hospitality standard.", image: "https://images.pexels.com/photos/8082223/pexels-photo-8082223.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "bathroom", }, { title: "Concrete & Masonry", strap: "Texture, structure, permanence", description: "Monolithic pours, retaining systems, architectural concrete, and masonry packages that feel as resolved as the spaces around them.", image: "https://images.pexels.com/photos/4534504/pexels-photo-4534504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "concrete", }, { title: "Exterior Construction", strap: "Envelope and site work", description: "Facades, terraces, cladding, glazing interfaces, and exterior assemblies designed for durability, proportion, and environmental performance.", image: "https://images.pexels.com/photos/11312129/pexels-photo-11312129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "exterior", }, { title: "Structural Repairs", strap: "Engineer-aligned remediation", description: "Framing correction, slab reinforcement, steel intervention, and hidden structural recovery carried out without losing finish quality.", image: "https://images.pexels.com/photos/6473982/pexels-photo-6473982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "structural", }, { title: "Flooring", strap: "Gallery-grade surfaces", description: "Wide-plank wood, stone, porcelain, and poured systems installed with disciplined transitions, flatness control, and exact alignment.", image: "https://images.pexels.com/photos/7045316/pexels-photo-7045316.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "flooring", }, { title: "Painting & Finishing", strap: "The final construction layer", description: "Skim coats, mineral paints, staining, touch-up, and finish calibration that turn a completed build into a complete atmosphere.", image: "https://images.pexels.com/photos/6474129/pexels-photo-6474129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400", icon: "finish", }, ];

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
    image:
      "https://images.pexels.com/photos/11312129/pexels-photo-11312129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
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
    image:
      "https://images.pexels.com/photos/20578678/pexels-photo-20578678.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
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
    image:
      "https://images.pexels.com/photos/6489127/pexels-photo-6489127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
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
    image:
      "https://images.pexels.com/photos/6473982/pexels-photo-6473982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
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
    image:
      "https://images.pexels.com/photos/32494505/pexels-photo-32494505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
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
    image:
      "https://images.pexels.com/photos/4534504/pexels-photo-4534504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
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
    <div className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-black">
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

function ServiceIcon({ type }: { type: ServiceIconType }) {
  const cls = "h-5 w-5 text-[#7B6F64]";

  switch (type) {
    case "remodel":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 20h18" />
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );
    case "custom":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" />
          <path d="M12 22V11.5" />
          <path d="M20 6.5L12 11 4 6.5" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20V6l7-2v16" />
          <path d="M11 20h9V10l-9-2" />
          <path d="M7 9h1" />
          <path d="M7 13h1" />
          <path d="M14 13h1" />
          <path d="M14 17h1" />
        </svg>
      );
    case "kitchen":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 7h18" />
          <path d="M5 7v10" />
          <path d="M19 7v10" />
          <path d="M3 17h18" />
          <path d="M10 7v10" />
          <path d="M14 11h3" />
        </svg>
      );
    case "bathroom":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 11h12" />
          <path d="M8 11V7a4 4 0 0 1 8 0" />
          <path d="M5 11v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3" />
          <path d="M9 18v2" />
          <path d="M15 18v2" />
        </svg>
      );
    case "concrete":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 8h16" />
          <path d="M4 12h16" />
          <path d="M4 16h16" />
          <path d="M8 4v16" />
          <path d="M16 4v16" />
        </svg>
      );
    case "exterior":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20V6l8-3 8 3v14" />
          <path d="M12 3v17" />
          <path d="M8 9h1" />
          <path d="M15 9h1" />
          <path d="M8 13h1" />
          <path d="M15 13h1" />
        </svg>
      );
    case "structural":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 4v16" />
          <path d="M19 4v16" />
          <path d="M5 4h14" />
          <path d="M5 20h14" />
          <path d="M7 17L17 7" />
          <path d="M7 7l10 10" />
        </svg>
      );
    case "flooring":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
          <path d="M8 7v5" />
          <path d="M14 12v5" />
        </svg>
      );
    case "finish":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20l6-6" />
          <path d="M14 8l4 4" />
          <path d="M10 10l4-4 5 5-4 4" />
          <path d="M3 21h7" />
        </svg>
      );
    default:
      return null;
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const sizeClasses = {
    feature: "col-span-12 lg:col-span-7 row-span-3 min-h-[28rem] lg:min-h-[38rem]",
    wide: "col-span-12 md:col-span-6 lg:col-span-5 row-span-2 min-h-[24rem] lg:min-h-[25rem]",
    tall: "col-span-12 md:col-span-6 lg:col-span-5 row-span-3 min-h-[25rem] lg:min-h-[38rem]",
    standard: "col-span-12 md:col-span-6 lg:col-span-7 row-span-2 min-h-[24rem] lg:min-h-[25rem]",
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[30px] border border-[#D4C4B0] bg-[#F5EFE6] shadow-[0_28px_80px_rgba(0,0,0,0.28)]",
        sizeClasses[project.size]
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(14,15,18,0.14), rgba(14,15,18,0.95)), url(${project.image})`,
        }}
      />
      <div className="absolute inset-0 blueprint-grid opacity-25" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBF7F0]/80 to-transparent" />
      <div className="absolute left-6 top-6 h-10 w-10 rounded-full border border-[#B8860B]/35 bg-[#FBF7F0]/55 backdrop-blur-md" />
      <div className="absolute left-11 top-11 h-px w-24 bg-[#B8860B]/60" />

      <div className="relative flex h-full flex-col justify-between p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7B6F64]">
            <span className="rounded-full border border-[#7B6F64]/18 bg-[#FBF7F0]/60 px-3 py-1">{project.category}</span>
            <span className="rounded-full border border-[#B8860B]/20 bg-[#FBF7F0]/55 px-3 py-1 text-[#9B8F80]">{project.location}</span>
          </div>
          <div className="rounded-full border border-[#C85A2D]/25 bg-[#C85A2D]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#3E3B38]">
            {project.scope}
          </div>
        </div>

        <div className="max-w-2xl space-y-4">
          <div className="space-y-3">
            <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#9B8F80]">Case Study / {String(index + 1).padStart(2, "0")}</div>
            <h3 className="font-display text-4xl leading-[0.95] text-[#3E3B38] sm:text-5xl">{project.title}</h3>
            <p className="max-w-xl text-sm leading-7 text-[#7B6F64]/88 sm:text-base">{project.summary}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[#D4C4B0] bg-[#FBF7F0]/74 p-4 backdrop-blur-md">
              <div className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[#9B8F80]">Before</div>
              <p className="text-sm leading-6 text-[#7B6F64]">{project.before}</p>
            </div>
            <div className="rounded-2xl border border-[#B8860B]/25 bg-[#FBF7F0]/74 p-4 backdrop-blur-md">
              <div className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-[#B8860B]">After</div>
              <p className="text-sm leading-6 text-[#3E3B38]">{project.after}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
      setScrollY(window.scrollY);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "px-4 pt-4" : "px-0 pt-0")}>
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between gap-6 transition-all duration-500",
            scrolled
              ? "rounded-full border border-[#D4C4B0] bg-[#FBF7F0]/88 px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl"
              : "border border-transparent px-6 py-5"
          )}
        >
          <a href="#home" className="group flex items-center gap-4" aria-label="cardenas construction">
            <div className="relative grid h-11 w-11 place-items-center rounded-full border border-[#B8860B]/35 bg-[#F5EFE6]/85 text-[#3E3B38] backdrop-blur-md">
              <span className="absolute h-4 w-px bg-[#C85A2D]" />
              <span className="absolute w-4 border-t border-[#B8860B]" />
              <span className="text-[0.62rem] font-bold tracking-[0.28em]">SF</span>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.34em] text-[#3E3B38]">cardenas construction</div>
              <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#9B8F80]">Architectural Construction</div>
            </div>
          </a>

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
                className="group relative text-sm uppercase tracking-[0.24em] text-[#7B6F64] transition-colors duration-300 hover:text-[#3E3B38]"
              >
                {label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#C85A2D] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full border border-[#C85A2D]/35 bg-[#C85A2D]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#3E3B38] transition duration-300 hover:border-[#B8860B] hover:bg-[#C85A2D]/22 hover:shadow-[0_0_30px_rgba(217,75,43,0.18)]"
          >
            Start a Project
            <span className="text-[#B8860B]">→</span>
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative isolate min-h-screen overflow-hidden border-b border-[#D4C4B0]">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ transform: reduceMotion ? undefined : `translateY(${scrollY * 0.08}px)` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,240,0.1),rgba(251,247,240,0.25)_68%,rgba(251,247,240,0.4))]" />
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

          <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center px-6 pb-14 pt-32 sm:px-8 lg:px-12">
            <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_430px] xl:gap-16">
              <div className="space-y-10">
                <Reveal className="max-w-4xl space-y-6">
                  <SectionKicker>Architectural Industrial Luxury</SectionKicker>
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-3 rounded-full border border-[#7B6F64]/12 bg-[#FBF7F0]/40 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[#C85A2D] backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-[#C85A2D]" />
                      Trusted for elite homes, commercial spaces, and modern structural interiors
                    </div>
                    <h1 className="font-display text-[clamp(3.8rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em] text-balance text-black drop-shadow-lg">
                      Engineered To Impress.
                      <br />
                      Built To Endure.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-black/90 drop-shadow-md sm:text-lg">
                      We build with the confidence of structural engineering and the restraint of architectural design—combining raw materials,
                      exact execution, and premium craftsmanship into spaces that feel substantial, tactile, and unmistakably high-end.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FBF7F0]/38 px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#3E3B38] backdrop-blur-md transition duration-300 hover:bg-[#C85A2D] hover:shadow-[0_0_40px_rgba(217,75,43,0.24)]"
                    >
                      View Signature Projects
                      <span>↗</span>
                    </a>
                    <a
                      href="#about"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-[#7B6F64]/18 bg-[#FBF7F0]/38 px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#3E3B38] backdrop-blur-md transition duration-300 hover:border-[#B8860B]/50 hover:bg-[#C85A2D]"
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

        <section id="about" className="relative border-b border-[#D4C4B0] py-24 sm:py-28">
  <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
    <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
      <Reveal className="relative flex flex-col lg:col-span-5">
        <div className="relative mr-0 overflow-hidden rounded-[34px] border border-[#D4C4B0] bg-[#F5EFE6] p-4 sm:p-5 lg:mr-8">
          <div className="absolute inset-0 blueprint-grid opacity-20" />

          <img
            src="https://images.pexels.com/photos/4534504/pexels-photo-4534504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1000"
            alt="Contemporary concrete architecture"
            className="h-[32rem] w-full rounded-[26px] object-cover"
          />
        </div>

        <div className="steel-panel mt-6 w-full rounded-[28px] border border-[#D4C4B0] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.34)] md:block">
         <img
  src="https://images.pexels.com/photos/15124970/pexels-photo-15124970.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900"
  alt="Craftsman working in a luxury interior under construction"
  className="h-[32rem] w-full rounded-[26px] object-cover"
/>

        </div>
      </Reveal>

      <div className="space-y-8 lg:col-span-7 lg:pl-8">
        <Reveal className="space-y-5">
          <SectionKicker>Built from drawings. Proven on site.</SectionKicker>

          <h2 className="font-display text-4xl leading-none tracking-[-0.03em] text-[#C85A2D] sm:text-6xl">
            Construction that protects architectural intent at every layer.
          </h2>

          <p className="max-w-3xl text-base leading-8 text-[#7B6F64]/88 sm:text-lg">
            cardenas construction was shaped by builders who understand that luxury is not surface alone. It lives in the hidden structure,
            the calibrated light, the clean transition, and the way materials are allowed to feel honest. We execute demanding projects
            with the discipline of engineers and the sensitivity of architectural collaborators.
          </p>
        </Reveal>

       <Reveal delay={0.05} className="space-y-10">
  <div className="grid gap-6">
    <div className="rounded-[30px] border border-[#D4C4B0] bg-[#F5EFE6]/78 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
      <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#A94724]">
        Founder Story
      </div>

      <p className="text-base leading-8 text-[#3E3B38]">
        We began with concrete packages, structural interior work, and technically difficult renovations. Over time, that field depth evolved into a premium
        construction studio trusted for luxury residences, commercial environments, and highly detailed modern spaces.
      </p>

      <div className="mt-6 grid gap-3 border-t border-[#D4C4B0] pt-6 text-sm text-[#7B6F64] sm:grid-cols-2">
        <div>
          <div className="text-[0.66rem] uppercase tracking-[0.24em] text-[#C85A2D]">
            Specialty
          </div>

          <div className="mt-2">
            Complex builds with elevated structural and finish demands
          </div>
        </div>

        <div>
          <div className="text-[0.66rem] uppercase tracking-[0.24em] text-[#C85A2D]">
            Approach
          </div>

          <div className="mt-2">
            Engineer the hidden layers. Perfect the visible ones.
          </div>
        </div>
      </div>
    </div>

    <div className="rounded-[30px] border border-[#A94724]/18 bg-[#FBF7F0]/68 p-7 backdrop-blur-xl">
      <div className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#C85A2D]">
        Construction Coordinates
      </div>

      <div className="space-y-5 text-sm leading-7 text-[#7B6F64]">
        <div>
          <div className="mb-1 text-[0.66rem] uppercase tracking-[0.24em] text-[#A94724]">
            01 / Precision
          </div>

          Tight tolerances, clean geometry, and disciplined alignment between structure and finish.
        </div>

        <div>
          <div className="mb-1 text-[0.66rem] uppercase tracking-[0.24em] text-[#A94724]">
            02 / Material Honesty
          </div>

          Concrete should feel substantial. Steel should feel exact. Timber should feel warm, not decorative.
        </div>

        <div>
          <div className="mb-1 text-[0.66rem] uppercase tracking-[0.24em] text-[#A94724]">
            03 / Execution Calm
          </div>

          Clear site leadership, clean communication, and no chaos around difficult work.
        </div>
      </div>
    </div>
  </div>

  <div className="grid gap-6 md:grid-cols-3 pt-4">
    {[
      {
        title: "Structural clarity",
        body: "The hidden framework of a project should be as disciplined as the architecture people see.",
      },
      {
        title: "Premium material language",
        body: "Concrete, metal, stone, wood, and light are coordinated as one composition rather than disconnected trades.",
      },
      {
        title: "Enduring craftsmanship",
        body: "We build for permanence, tactile richness, and quiet confidence—not trend-driven decoration.",
      },
    ].map((item, index) => (
      <Reveal key={item.title} delay={0.08 + index * 0.05}>
        <div className="h-full rounded-[26px] border border-[#D4C4B0] bg-[#F5EFE6]/78 p-6">
          <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#C85A2D]">
            0{index + 1}
          </div>

          <h3 className="mb-3 text-xl font-semibold text-[#C85A2D]">
            {item.title}
          </h3>

          <p className="text-sm leading-7 text-[#7B6F64]/86">
            {item.body}
          </p>
        </div>
      </Reveal>
    ))}
  </div>
</Reveal>

        
      </div>
    </div>
  </div>
</section>

        <section id="services" className="relative border-b border-[#D4C4B0] bg-[#F5EFE6] py-24 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <Reveal className="space-y-5">
                <SectionKicker>Services</SectionKicker>
                <h2 className="font-display text-4xl leading-none tracking-[-0.03em] text-[#C85A2D] sm:text-6xl">
                  Industrial-grade construction services with luxury-level finish discipline.
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="lg:max-w-2xl lg:justify-self-end">
                <p className="text-base leading-8 text-[#C85A2D] sm:text-lg">
                  Every service is managed like a carefully coordinated build package. We bring planning, sequencing, structural awareness,
                  and finish intelligence to each project type so the final result feels engineered rather than assembled.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 0.03}>
                  <article className="group relative isolate overflow-hidden rounded-[28px] border border-[#D4C4B0] bg-[#252A31] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(14,15,18,0.14), rgba(14,15,18,0.96)), url(${service.image})`,
                      }}
                    />
                    <div className="absolute inset-0 blueprint-grid opacity-[0.18]" />
                    <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-[#B8860B]/0 via-[#B8860B]/60 to-[#B8860B]/0" />
                    <div className="relative flex min-h-[22rem] flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#7B6F64]/14 bg-[#FBF7F0]/54 backdrop-blur-md">
                          <ServiceIcon type={service.icon} />
                        </div>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#9B8F80]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div>
                        <div className="mb-3 text-[0.66rem] uppercase tracking-[0.24em] text-[#B8860B]">{service.strap}</div>
                        <h3 className="max-w-xs text-2xl font-semibold leading-tight text-[#3E3B38]">{service.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-[#7B6F64]/86">{service.description}</p>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-[#D4C4B0] pt-5">
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#C85A2D]">Construction Package</div>
                        <span className="text-xl text-[#7B6F64] transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative border-b border-[#D4C4B0] py-24 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <Reveal className="max-w-4xl space-y-5">
                <SectionKicker>Featured Projects</SectionKicker>
                <h2 className="font-display text-4xl leading-none tracking-[-0.03em] text-[#3E3B38] sm:text-6xl">
                  A portfolio that feels like modern architecture in print—and in motion.
                </h2>
                <p className="max-w-3xl text-base leading-8 text-[#7B6F64]/86 sm:text-lg">
                  Selected residences, structural transformations, commercial spaces, and high-end interiors. Each one reflects measured constraints,
                  technical coordination, and a material sensibility grounded in real craftsmanship.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex flex-wrap gap-3">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "rounded-full border px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition duration-300",
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

            <motion.div layout className="grid auto-rows-[12rem] gap-5 lg:grid-cols-12">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="process" className="relative border-b border-[#D4C4B0] bg-[#F5EFE6] py-24 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-12">
            <Reveal className="space-y-6">
              <SectionKicker>Execution Framework</SectionKicker>
              <h2 className="font-display text-4xl leading-none tracking-[-0.03em] text-[#3E3B38] sm:text-6xl">
                Blueprint thinking. Field discipline. Finished space with presence.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#7B6F64]/86 sm:text-lg">
                Luxury construction is won long before the final photographs. It is won in planning, field coordination, tolerance control,
                and the ability to keep the original architectural idea intact under real jobsite pressure.
              </p>

              <div className="steel-panel relative overflow-hidden rounded-[32px] border border-[#D4C4B0] p-7">
                <div className="absolute inset-0 blueprint-grid opacity-25" />
                <div className="relative space-y-5">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#9B8F80]">Material Ledger</div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["Carbon Black", "Quiet primary field for structure, contrast, and depth"],
                      ["Structural Blue", "Blueprint overlays, systems language, and precision cues"],
                      ["Burnt Orange", "Construction energy, action points, and strong emphasis"],
                      ["Copper Ember", "Warm premium highlight against industrial surfaces"],
                    ].map(([title, detail]) => (
                      <div key={title} className="rounded-[24px] border border-[#D4C4B0] bg-[#FBF7F0]/55 p-5">
                        <div className="text-sm font-semibold text-[#3E3B38]">{title}</div>
                        <div className="mt-2 text-sm leading-7 text-[#7B6F64]/82">{detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              {processSteps.map((step, index) => (
                <Reveal key={step.id} delay={index * 0.05}>
                  <div className="group relative overflow-hidden rounded-[30px] border border-[#D4C4B0] bg-[#FBF7F0]/74 p-6 shadow-[0_22px_50px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-7">
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-[#B8860B]/0 via-[#B8860B]/70 to-[#C85A2D]/0" />
                    <div className="absolute inset-0 blueprint-grid opacity-15" />
                    <div className="relative grid gap-6 sm:grid-cols-[90px_1fr] sm:items-start">
                      <div>
                        <div className="font-display text-5xl leading-none text-[#B8860B]">{step.id}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-[#3E3B38]">{step.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#7B6F64]/86 sm:text-base">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative border-b border-[#D4C4B0] py-24 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <Reveal className="space-y-5">
                <SectionKicker>Client Voices</SectionKicker>
                <h2 className="font-display text-4xl leading-none tracking-[-0.03em] text-[#3E3B38] sm:text-6xl">
                  Trusted where craftsmanship, structure, and complexity meet.
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="lg:max-w-2xl lg:justify-self-end">
                <p className="text-base leading-8 text-[#7B6F64]/86 sm:text-lg">
                  Our clients expect more than construction management. They expect a partner who can understand design intent,
                  resolve technical realities, and deliver a space that feels complete in both performance and atmosphere.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.author} delay={index * 0.06}>
                  <article className="group relative overflow-hidden rounded-[30px] border border-[#D4C4B0] bg-[#F5EFE6]/88 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C85A2D]/75 to-transparent" />
                    <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-[#C85A2D]/10 blur-3xl" />
                    <div className="relative space-y-6">
                      <div className="font-display text-6xl leading-none text-[#B8860B]">“</div>
                      <p className="text-base leading-8 text-[#3E3B38]">{testimonial.quote}</p>
                      <div className="border-t border-[#D4C4B0] pt-5">
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3E3B38]">{testimonial.author}</div>
                        <div className="mt-2 text-sm text-[#9B8F80]">
                          {testimonial.role} / {testimonial.project}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative isolate overflow-hidden py-24 sm:py-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(14,15,18,0.34), rgba(14,15,18,0.88)), url(https://images.pexels.com/photos/30917792/pexels-photo-30917792.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(217,75,43,0.18),transparent_20%),radial-gradient(circle_at_18%_38%,rgba(59,91,219,0.16),transparent_24%)]" />
          <div className="absolute inset-0 blueprint-grid opacity-35" />

          <div className="relative mx-auto max-w-[1100px] px-6 text-center sm:px-8">
            <Reveal className="space-y-8 rounded-[36px] border border-[#7B6F64]/12 bg-[#FBF7F0]/52 px-6 py-14 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:px-10 lg:px-16">
              <SectionKicker>Ready to Build</SectionKicker>
              <h2 className="font-display text-4xl leading-none tracking-[-0.03em] text-[#3E3B38] sm:text-7xl">
                Let’s Build Something That Lasts.
              </h2>
              <p className="mx-auto max-w-3xl text-base leading-8 text-[#7B6F64]/88 sm:text-lg">
                If your project demands architectural control, premium materials, disciplined field execution, and a construction partner comfortable with complexity,
                we should talk. We build luxury homes, commercial spaces, modern interiors, and structurally demanding environments.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:studio@strataforgebuild.com"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C85A2D] px-8 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#3E3B38] transition duration-300 hover:bg-[#B8860B] hover:shadow-[0_0_40px_rgba(217,75,43,0.24)]"
                >
                  studio@strataforgebuild.com
                </a>
                <a
                  href="tel:+16465550184"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-[#7B6F64]/18 bg-[#FBF7F0]/38 px-8 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#3E3B38] backdrop-blur-md transition duration-300 hover:border-[#B8860B]/50 hover:bg-[#F5EFE6]/72"
                >
                  +1 (646) 555-0184
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#D4C4B0] bg-[#FBF7F0]">
        <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative grid h-11 w-11 place-items-center rounded-full border border-[#B8860B]/35 bg-[#F5EFE6]/90">
                  <span className="absolute h-4 w-px bg-[#C85A2D]" />
                  <span className="absolute w-4 border-t border-[#B8860B]" />
                  <span className="text-[0.62rem] font-bold tracking-[0.28em]">SF</span>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.34em] text-[#3E3B38]">cardenas construction</div>
                  <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#9B8F80]">Architectural Construction</div>
                </div>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#7B6F64]/82">
                Elite construction for luxury homes, commercial environments, modern architectural interiors, and large-scale precision builds.
              </p>
            </div>

            <div>
              <div className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9B8F80]">Navigate</div>
              <div className="space-y-3 text-sm text-[#7B6F64]">
                <a className="block hover:text-[#3E3B38]" href="#about">
                  Story
                </a>
                <a className="block hover:text-[#3E3B38]" href="#services">
                  Services
                </a>
                <a className="block hover:text-[#3E3B38]" href="#projects">
                  Projects
                </a>
                <a className="block hover:text-[#3E3B38]" href="#contact">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9B8F80]">Studios</div>
              <div className="space-y-3 text-sm text-[#7B6F64]">
                <div>New York</div>
                <div>Austin</div>
                <div>Miami</div>
              </div>
            </div>

            <div>
              <div className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#9B8F80]">Connect</div>
              <div className="space-y-3 text-sm text-[#7B6F64]">
                <a className="block hover:text-[#3E3B38]" href="mailto:studio@strataforgebuild.com">
                  studio@strataforgebuild.com
                </a>
                <a className="block hover:text-[#3E3B38]" href="tel:+16465550184">
                  +1 (646) 555-0184
                </a>
                <div>Mon–Fri / 8:00–18:00</div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[#D4C4B0] pt-6 text-[0.7rem] uppercase tracking-[0.24em] text-[#9B8F80] sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 cardenas construction</div>
            <div className="flex gap-5">
              <a href="#home" className="hover:text-[#3E3B38]">
                Top
              </a>
              <a href="#projects" className="hover:text-[#3E3B38]">
                Case Studies
              </a>
              <a href="#contact" className="hover:text-[#3E3B38]">
                Start a Build
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
