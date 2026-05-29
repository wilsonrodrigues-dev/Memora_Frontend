import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import invitation from "../assets/invitation.jpeg";

const InvitationEnvelope = () => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="invitation"
      className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-x-hidden px-6 py-20"
    >
      {/* Background Glow */}
      <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}></div>

      {/* Tiny Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full opacity-30"
          style={{
            background: "#ddb8ff",
            top: `${10 + i * 10}%`,
            left: `${8 + i * 11}%`,
          }}
        />
      ))}

      {/* Heading */}
      {!open && (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl text-center mb-6 leading-tight font-bold tracking-tight" style={{ fontFamily: "'Geist', sans-serif", background: "linear-gradient(135deg, #ffffff 20%, #ddb8ff 50%, #9333ea 85%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 30px rgba(147,51,234,0.3))" }}
          >
            Your Invitation Awaits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="tracking-[4px] text-sm md:text-base mb-10" style={{ color: "rgba(221,184,255,0.6)" }}
          >
            Tap to Open
          </motion.p>
        </>
      )}

      {/* Envelope */}
      <AnimatePresence>
        {!open && (
          <motion.div
            style={{ perspective: "1200px" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 100,
            }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -4 }}
            onClick={() => setOpen(true)}
            className="relative cursor-pointer z-20"
          >
            {/* Shadow */}
            <div className="absolute top-[92%] left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/50 blur-2xl rounded-full"></div>

            {/* Envelope Body */}
            <div
              className="
                relative
                w-[300px]
                sm:w-[380px]
                md:w-[520px]
                h-[200px]
                sm:h-[240px]
                md:h-[320px]
                rounded-[24px]
                border
                border-[rgba(221,184,255,0.2)]
                bg-gradient-to-b
                from-[#1f1f1f]
                via-[#141414]
                to-[#0d0d0d]
                overflow-hidden
                shadow-2xl
              "
            >
              {/* Gold Outline Glow */}
              <div className="absolute inset-0 rounded-[24px]" style={{ border: "1px solid rgba(221,184,255,0.08)", boxShadow: "inset 0 0 40px rgba(147,51,234,0.05)" }}></div>

              {/* Bottom Folds */}
              <div className="absolute bottom-0 left-0 w-1/2 h-full rotate-[35deg] origin-bottom" style={{ borderRight: "1px solid rgba(221,184,255,0.05)" }}></div>

              <div className="absolute bottom-0 right-0 w-1/2 h-full -rotate-[35deg] origin-bottom" style={{ borderLeft: "1px solid rgba(221,184,255,0.05)" }}></div>
            </div>

            {/* TOP FLAP */}
            <motion.div
              animate={{
                rotateX: open ? 180 : 0,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "top",
                backfaceVisibility: "hidden",
              }}
              className="
                absolute
                top-0
                left-0
                w-full
                h-[100px]
                sm:h-[120px]
                md:h-[160px]
                z-30
              "
            >
              {/* Flap Shape */}
              <div
                className="
                  absolute
                  inset-0
                  bg-[#1a1a1a]
                  clip-path-envelope
                  border-t
                  border-l
                  border-r
                  border-[rgba(221,184,255,0.25)]
                  shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                "
              >
                {/* Gold Edge Glow */}
                <div className="absolute inset-0" style={{ border: "1px solid rgba(147,51,234,0.15)" }}></div>
              </div>
            </motion.div>

            {/* Seal */}
            <div
              className="
                absolute
                left-1/2
                top-[58%]
                -translate-x-1/2
                -translate-y-1/2
                z-40

                w-16
                h-16
                md:w-20
                md:h-20

                rounded-full
                border
                border-[rgba(221,184,255,0.3)]

                bg-gradient-to-b
                from-[#1a1a2e]
                to-[#0a0a0a]

                flex
                items-center
                justify-center

                shadow-[0_0_25px_rgba(147,51,234,0.3)]
              "
            >
              <span className="tracking-[3px] text-[10px] md:text-xs font-semibold" style={{ color: "#ddb8ff" }}>
                OPEN
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invitation Reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 120,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="relative z-30 flex justify-center items-center w-full"
          >
            {/* ── Layer 1: Wide ambient purple bloom ─────────────────── */}
            <div
              style={{
                position: "absolute",
                width: "110%",
                maxWidth: 700,
                height: "110%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(147,51,234,0.35) 0%, rgba(5,102,217,0.18) 45%, transparent 75%)",
                filter: "blur(60px)",
                zIndex: 0,
                animation: "glowPulseEnv 4s ease-in-out infinite",
              }}
            />

            {/* ── Layer 2: Tight halo right behind the image ─────────── */}
            <div
              style={{
                position: "absolute",
                width: "85%",
                maxWidth: 500,
                aspectRatio: "1",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(221,184,255,0.25) 0%, rgba(255,176,205,0.12) 40%, transparent 70%)",
                filter: "blur(30px)",
                zIndex: 0,
                animation: "glowPulseEnv 3s ease-in-out infinite reverse",
              }}
            />

            {/* ── Layer 3: Soft ring outline glow ────────────────────── */}
            <div
              style={{
                position: "absolute",
                width: "80%",
                maxWidth: 480,
                aspectRatio: "1",
                borderRadius: "50%",
                border: "1px solid rgba(221,184,255,0.18)",
                boxShadow:
                  "0 0 40px rgba(147,51,234,0.3), inset 0 0 40px rgba(147,51,234,0.1)",
                zIndex: 0,
              }}
            />

            {/* ── Invitation image ───────────────────────────────────── */}
            <img
              src={invitation}
              alt="Invitation"
              className="
                relative
                w-full
                max-w-[320px]
                sm:max-w-[380px]
                md:max-w-[450px]
                lg:max-w-[500px]
                rounded-3xl
                shadow-2xl
              "
              style={{
                zIndex: 1,
                boxShadow:
                  "0 0 0 1px rgba(221,184,255,0.15), 0 8px 40px rgba(147,51,234,0.4), 0 0 80px rgba(147,51,234,0.2)",
              }}
            />

            <style>{`
              @keyframes glowPulseEnv {
                0%, 100% { opacity: 0.8; transform: scale(1); }
                50%       { opacity: 1;   transform: scale(1.06); }
              }
            `}</style>
          </motion.div>

        )}
      </AnimatePresence>
    </section>
  );
};

export default InvitationEnvelope;