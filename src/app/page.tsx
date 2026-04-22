"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ── Constants ─────────────────────────────────────────────── */
const PLAY_STORE_URL = "https://play.google.com/store";

/* ── Animation helpers ─────────────────────────────────────── */
function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeInScale({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── SVG Icons ─────────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ── Transaction Popup ─────────────────────────────────────── */
function TransactionPopup({ text, delay, position }: { text: string; delay: number; position: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 3,
      }}
      className={`absolute ${position} z-20 glass-card px-4 py-2.5 rounded-2xl border border-teal/20 shadow-[0_0_20px_rgba(20,240,197,0.15)] flex items-center gap-3 backdrop-blur-md`}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
      <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">{text}</span>
    </motion.div>
  );
}

/* ── Showcase Card ─────────────────────────────────────────── */
function ShowcaseCard({
  emoji,
  label,
  description,
  imageSrc,
  imageAlt,
  delay,
}: {
  emoji: string;
  label: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  delay: number;
}) {
  return (
    <FadeInScale delay={delay}>
      <div className="group flex flex-col items-center text-center">
        {/* Device frame */}
        <div className="device-frame mb-6 max-w-[240px] sm:max-w-[260px] transition-transform duration-700 group-hover:scale-[1.02]">
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={260}
              height={520}
              className="w-full h-auto"
              quality={90}
            />
          </div>
        </div>

        {/* Label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{emoji}</span>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {label}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </FadeInScale>
  );
}

/* ── Escrow Step Card ──────────────────────────────────────── */
function EscrowStep({
  icon,
  title,
  description,
  step,
  delay,
  isLast,
}: {
  icon: string;
  title: string;
  description: string;
  step: number;
  delay: number;
  isLast?: boolean;
}) {
  return (
    <FadeIn delay={delay}>
      <div
        className={`relative glass-card rounded-2xl p-6 sm:p-8 group hover:border-teal/20 transition-all duration-500 h-full ${!isLast ? "escrow-connector" : ""}`}
      >
        {/* Step number */}
        <span className="absolute -top-3 left-6 sm:left-8 bg-teal text-slate-950 text-xs font-bold px-3 py-1 rounded-full tracking-wide">
          STEP {step}
        </span>

        {/* Icon circle */}
        <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-3xl mb-5 icon-glow group-hover:bg-teal/15 transition-colors duration-300">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </FadeIn>
  );
}

/* ── Quote Card Component ──────────────────────────────────── */
function QuoteCard({
  quote,
  name,
  detail,
  delay,
}: {
  quote: string;
  name: string;
  detail: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="quote-card h-full flex flex-col">
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 flex-1 pt-4">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-dim flex items-center justify-center">
            <span className="text-slate-950 font-bold text-sm">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">{name}</p>
            <p className="text-slate-400 text-xs">{detail}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="text-amber-400 w-3 h-3" />
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Trust Badge ───────────────────────────────────────────── */
function TrustBadge({
  icon,
  label,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl glass-card">
        <span className="text-teal">{icon}</span>
        <span className="text-xs sm:text-sm text-slate-300 font-medium">
          {label}
        </span>
      </div>
    </FadeIn>
  );
}

/* ── Floating Parallax Orbs ────────────────────────────────── */
function ParallaxOrbs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-teal/[0.03] blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-teal/[0.02] blur-3xl"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const handleLearnMore = () => {
    document
      .getElementById("showcase")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openPlayStore = () => {
    window.open(PLAY_STORE_URL, "_blank", "noopener");
  };

  return (
    <>
      {/* ─── Navbar ─────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Studylancer Logo" width={32} height={32} className="drop-shadow-[0_0_8px_rgba(20,240,197,0.4)]" />
            <span className="text-white font-semibold text-lg tracking-tight">
              Studylancer
            </span>
          </div>

          {/* Nav CTA */}
          <Button
            size="sm"
            className="bg-teal text-slate-950 hover:bg-teal-dim font-semibold text-xs px-4 cursor-pointer"
            onClick={openPlayStore}
          >
            <PlayIcon />
            Get the App
          </Button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center bg-grid hero-glow overflow-hidden pt-24 sm:pt-32 pb-20"
      >
        {/* Animated orb decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/[0.03] blur-3xl pointer-events-none animate-pulse-ring" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Col: Text Content */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10">
              {/* Badge */}
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-teal text-xs sm:text-sm font-medium tracking-wide">
                    Escrow-Protected Peer Learning
                  </span>
                </div>
              </FadeIn>

              {/* Headline */}
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                  Learn Anything.
                  <br />
                  Teach Anyone.
                  <br />
                  <span className="bg-gradient-to-r from-teal to-teal-dim bg-clip-text text-transparent">
                    Earn on Your Terms.
                  </span>
                </h1>
              </FadeIn>

              {/* Subheadline */}
              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                  Join a community where every student is a potential tutor. Post bounties for what you want to learn, or accept requests to teach and earn money securely.
                </p>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  <Button
                    size="lg"
                    id="cta-download"
                    className="bg-teal text-slate-950 hover:bg-teal-dim font-semibold text-sm sm:text-base h-12 px-6 sm:px-8 rounded-xl w-full sm:w-auto cursor-pointer shadow-[0_0_30px_rgba(20,240,197,0.2)] hover:shadow-[0_0_40px_rgba(20,240,197,0.35)] transition-all duration-300"
                    onClick={openPlayStore}
                  >
                    <PlayIcon />
                    Download on Google Play
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    id="cta-learn-more"
                    className="border-white/10 text-white hover:bg-white/5 hover:text-white font-medium text-sm sm:text-base h-12 px-6 sm:px-8 rounded-xl w-full sm:w-auto cursor-pointer transition-all duration-300"
                    onClick={handleLearnMore}
                  >
                    Learn More
                    <ChevronDownIcon />
                  </Button>
                </div>
              </FadeIn>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-12 sm:mt-16">
                <TrustBadge
                  icon={<ShieldCheckIcon />}
                  label="Escrow Protected"
                  delay={0.5}
                />
                <TrustBadge
                  icon={<UsersIcon />}
                  label="Verified Peers"
                  delay={0.6}
                />
              </div>
            </div>

            {/* Right Col: Interactive Demo iframe & Ads */}
            <FadeIn delay={0.4} className="relative flex items-center justify-center min-h-[550px] sm:min-h-[700px] w-full max-w-[600px] mx-auto lg:mr-0 z-0 mt-8 lg:mt-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe 
                  src="/demo.html" 
                  className="w-full h-full max-h-[850px] border-none bg-transparent pointer-events-auto" 
                  style={{ backgroundColor: 'transparent' }}
                  title="Studylancer Interactive Demo"
                />
              </div>
              
              {/* Transaction Popups (Ads-like elements) */}
              <TransactionPopup text="Rahul earned ₹350" delay={2} position="top-[12%] left-2 sm:left-[5%]" />
              <TransactionPopup text="Session Locked 🔒" delay={5} position="bottom-[20%] right-2 sm:right-[5%]" />
              <TransactionPopup text="New Bounty: OOP" delay={8} position="top-[38%] right-2 sm:right-[5%]" />
              <TransactionPopup text="Payment Released 💸" delay={11} position="bottom-[5%] left-2 sm:left-[10%]" />
            </FadeIn>
            
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SHOWCASE SECTION – The Real App
          ═══════════════════════════════════════════════════ */}
      <section id="showcase" className="relative py-20 sm:py-28 lg:py-32">
        <div className="section-divider" />
        <ParallaxOrbs />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Section header */}
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <span className="text-teal text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
                The Real App
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                See Studylancer in Action
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                A peer-to-peer marketplace built by students, for students.
                Browse, connect, and learn — all from your phone.
              </p>
            </div>
          </FadeIn>

          {/* 3-column screenshot grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 lg:gap-12">
            <ShowcaseCard
              emoji="🛒"
              label="Your Campus Marketplace"
              description="Browse active learning bounties. Find tutors matching your exact budget and time needs."
              imageSrc="/screenshots/marketplace.png"
              imageAlt="Studylancer Marketplace screen showing active bounties"
              delay={0.1}
            />
            <ShowcaseCard
              emoji="📜"
              label="Your Verified Creds"
              description="Build your academic reputation. Showcase ratings and classes taught."
              imageSrc="/screenshots/profile.png"
              imageAlt="Studylancer Profile screen showing ratings and achievements"
              delay={0.25}
            />
            <ShowcaseCard
              emoji="🎯"
              label="Define Your Need"
              description="Set topic, time, budget, and language. Find the perfect fit instantly."
              imageSrc="/screenshots/request.png"
              imageAlt="Studylancer Request Flow screen with form fields"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          THE ESCROW ADVANTAGE
          ═══════════════════════════════════════════════════ */}
      <section id="escrow" className="relative py-20 sm:py-28 lg:py-32">
        <div className="section-divider" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <span className="text-teal text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
                The Escrow Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Your Money, Always Protected
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Our 3-step escrow security loop ensures zero risk. Funds are
                locked until you confirm success.
              </p>
            </div>
          </FadeIn>

          {/* 3-column escrow steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <EscrowStep
              icon="🎯"
              title="Post Bounty"
              description="Define your learning need with topic, time, and budget. Your request goes live to verified campus peers instantly."
              step={1}
              delay={0.1}
            />
            <EscrowStep
              icon="🔒"
              title="Escrow Lock"
              description="Your payment is securely locked in escrow the moment a tutor accepts. Neither party can touch it prematurely."
              step={2}
              delay={0.2}
            />
            <EscrowStep
              icon="🤝"
              title="Release on Success"
              description="Only after you confirm the session was successful does the tutor receive payment. Complete control, zero risk."
              step={3}
              delay={0.3}
              isLast
            />
          </div>

          {/* Security badges row */}
          <FadeIn delay={0.5}>
            <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2.5 text-slate-400">
                <ShieldCheckIcon className="text-teal w-5 h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  Bank-Grade Security
                </span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2.5 text-slate-400">
                <LockIcon className="text-teal w-5 h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  End-to-End Encrypted
                </span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2.5 text-slate-400">
                <UsersIcon className="text-teal w-5 h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  Verified Students Only
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SOCIAL PROOF – Built Authentically
          ═══════════════════════════════════════════════════ */}
      <section id="social-proof" className="relative py-20 sm:py-28 lg:py-32">
        <div className="section-divider" />
        <ParallaxOrbs />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          {/* Section header */}
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <span className="text-teal text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
                Built Authentically
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Built Securely for Students,
                <br className="hidden sm:block" /> by Students.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Real voices from early adopters who are already learning smarter.
              </p>
            </div>
          </FadeIn>

          {/* Quote cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <QuoteCard
              quote="I set my own budget for DBMS help. Perfect for exam prep. No overpaying, no stress — just the exact help I needed."
              name="Aayush S."
              detail="3rd Year, Computer Science"
              delay={0.1}
            />
            <QuoteCard
              quote="The escrow feature gives me real confidence. I know my money is safe until the session is done and I'm satisfied."
              name="Priya M."
              detail="2nd Year, Electronics"
              delay={0.2}
            />
            <QuoteCard
              quote="I've been tutoring on Studylancer and the verified ratings system means students actually trust me. Win-win."
              name="Rohan K."
              detail="4th Year, Mechanical"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA BANNER
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 lg:py-28">
        <div className="section-divider" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
              {/* Background glow orbs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-teal/[0.04] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal/[0.03] rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal/10 mb-6">
                  <span className="text-3xl">🚀</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Ready to Learn Smarter?
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8">
                  Join students who are already defining their own terms. Set
                  your budget, choose your tutor, and learn with confidence.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="lg"
                    id="cta-download-bottom"
                    className="bg-teal text-slate-950 hover:bg-teal-dim font-semibold text-sm sm:text-base h-12 px-8 rounded-xl cursor-pointer shadow-[0_0_30px_rgba(20,240,197,0.2)] hover:shadow-[0_0_40px_rgba(20,240,197,0.35)] transition-all duration-300"
                    onClick={openPlayStore}
                  >
                    <PlayIcon />
                    Download on Google Play
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/10 text-white hover:bg-white/5 hover:text-white font-medium text-sm sm:text-base h-12 px-6 rounded-xl cursor-pointer transition-all duration-300"
                    onClick={() =>
                      document
                        .getElementById("escrow")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    How Escrow Works
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 sm:py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo + tagline */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-2.5">
                <Image src="/logo.svg" alt="Studylancer Logo" width={28} height={28} className="drop-shadow-[0_0_8px_rgba(20,240,197,0.4)]" />
                <span className="text-white font-semibold tracking-tight">
                  Studylancer
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm">
                <LockIcon />
                <span>Built securely for students, by students</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-400/70">
              © {new Date().getFullYear()} Studylancer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
