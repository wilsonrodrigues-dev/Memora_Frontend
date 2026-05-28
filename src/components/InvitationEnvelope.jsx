import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import invitation from "../assets/invitation.jpeg";

const InvitationEnvelope = () => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="invitation"
      className="relative min-h-screen bg-gradient-to-b from-black via-[#120b02] to-black flex flex-col items-center justify-center overflow-x-hidden px-6 py-20"
    >
      {/* Background Glow */}
      <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-yellow-700/10 blur-2xl rounded-full"></div>

      {/* Tiny Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-yellow-500 rounded-full opacity-20"
          style={{
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
            className="text-4xl sm:text-5xl md:text-7xl text-center text-white font-['Cinzel'] mb-6 leading-tight"
          >
            Your Invitation Awaits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-yellow-500/80 tracking-[4px] text-sm md:text-base mb-10"
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
                border-yellow-600/30
                bg-gradient-to-b
                from-[#1f1f1f]
                via-[#141414]
                to-[#0d0d0d]
                overflow-hidden
                shadow-2xl
              "
            >
              {/* Gold Outline Glow */}
              <div className="absolute inset-0 rounded-[24px] border border-yellow-500/10"></div>

              {/* Bottom Folds */}
              <div className="absolute bottom-0 left-0 w-1/2 h-full border-r border-yellow-500/5 rotate-[35deg] origin-bottom"></div>

              <div className="absolute bottom-0 right-0 w-1/2 h-full border-l border-yellow-500/5 -rotate-[35deg] origin-bottom"></div>
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
                  border-yellow-500/40
                  shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                "
              >
                {/* Gold Edge Glow */}
                <div className="absolute inset-0 border border-yellow-500/10"></div>
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
                border-yellow-500/40

                bg-gradient-to-b
                from-[#1f1f1f]
                to-[#0a0a0a]

                flex
                items-center
                justify-center

                shadow-[0_0_25px_rgba(212,175,55,0.15)]
              "
            >
              <span className="text-yellow-500 tracking-[3px] text-[10px] md:text-xs">
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
            {/* Glow */}
            <div className="absolute w-[90%] md:w-[600px] h-[90%] bg-yellow-500/10 blur-2xl rounded-3xl"></div>

            {/* Invitation */}
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InvitationEnvelope;