import { motion } from "framer-motion";

const HeroLanding = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

      {/* ── Ambient glow blobs (matches theme) ─────────────────────────── */}
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "10%", left: "15%",
        }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,102,217,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "15%", right: "15%",
        }}
      />
      <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,176,205,0.10) 0%, transparent 70%)",
          filter: "blur(70px)",
          top: "55%", left: "65%",
        }}
      />

      {/* ── Subtle star-like particles ──────────────────────────────────── */}
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            background: i % 4 === 0 ? "#ddb8ff" : i % 4 === 1 ? "#adc6ff" : "rgba(221,184,255,0.5)",
            top: `${5 + (i * 37 + 13) % 90}%`,
            left: `${3 + (i * 53 + 7) % 94}%`,
            opacity: 0.25 + (i % 5) * 0.1,
            animationDelay: `${(i * 0.4) % 3}s`,
            animationDuration: `${2.5 + (i % 4) * 0.5}s`,
          }}
        />
      ))}

      {/* ── Orbital decorative ring ──────────────────────────────────────── */}
      <div className="absolute pointer-events-none"
        style={{
          width: 480, height: 480,
          borderRadius: "50%",
          border: "1px solid rgba(221,184,255,0.07)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          animation: "spin 40s linear infinite",
        }}
      />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-4"
      >
        {/* Label chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-8"
          style={{
            background: "rgba(221,184,255,0.08)",
            border: "1px solid rgba(221,184,255,0.2)",
            borderRadius: 999,
            padding: "5px 16px",
          }}
        >
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 14 }}>auto_awesome</span>
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-primary">
            MCA Farewell Evening · 2026
          </span>
        </motion.div>

        {/* ── TWILIGHT '26 headline ───────────────────────────────────────── */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-[1.05] tracking-[-0.04em]"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "clamp(3.5rem, 13vw, 9rem)",
            background: "linear-gradient(135deg, #ffffff 15%, #ddb8ff 45%, #9333ea 75%, #adc6ff 95%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 40px rgba(147,51,234,0.35)) drop-shadow(0 0 80px rgba(221,184,255,0.15))",
            animation: "shimmerHeading 6s linear infinite",
          }}
        >
          TWILIGHT
          <br />
          <span style={{
            background: "linear-gradient(135deg, #ddb8ff 0%, #adc6ff 40%, #ffb0cd 85%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmerHeading 5s linear infinite reverse",
          }}>
            2K26
          </span>
        </motion.h1>

        {/* Shine sweep over the heading */}
        <div className="relative w-fit mx-auto overflow-hidden" style={{ marginTop: -8 }}>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animation: "shine 4s linear infinite" }}
          />
        </div>

        {/* Divider line — purple gradient instead of yellow */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "180px" }}
          transition={{ delay: 1, duration: 1 }}
          className="mx-auto my-7"
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #9333ea, #ddb8ff, #0566d9, transparent)",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="tracking-[4px] text-sm font-medium"
          style={{
            fontFamily: "'Geist', sans-serif",
            color: "rgba(207,194,215,0.65)",
            letterSpacing: "0.2em",
          }}
        >
          Where Memories Become Timeless
        </motion.p>

        {/* Scroll nudge */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="mt-14 text-xs tracking-[3px] font-semibold"
          style={{ color: "rgba(221,184,255,0.4)", letterSpacing: "0.2em" }}
        >
          SCROLL
        </motion.div>

        {/* CTA button — glassmorphism style matching theme */}
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(147,51,234,0.5)" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-500"
          style={{
            fontFamily: "'Geist', sans-serif",
            color: "#ddb8ff",
            background: "rgba(147,51,234,0.12)",
            border: "1px solid rgba(221,184,255,0.25)",
            borderRadius: 8,
            boxShadow: "0 0 16px rgba(147,51,234,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          Open Invitation
        </motion.button>
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #050505, transparent)" }}
      />

      {/* Keyframes */}
      <style>{`
        @keyframes shimmerHeading {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroLanding;