
import { motion, useMotionValue, useSpring } from "framer-motion";

const HeroLanding = () => {
  return (
    <section

  className="relative h-screen bg-gradient-to-b from-black via-[#0f0b02] to-black flex items-center justify-center overflow-x-hidden"
> 
{[...Array(20)].map((_, i) => (
        
  <div
    key={i}
    className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-pulse"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: 0.3,
    }}
  />
))}
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-yellow-700/20 blur-3xl rounded-full"></div>

      {/* Content */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
  className="relative z-10 text-center"
>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="tracking-[6px] text-sm text-yellow-600 mb-4"
        >
          MCA FAREWELL EVENING · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
className="text-7xl md:text-9xl text-white font-['Cinzel'] drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"        >
          TWILIGHT '26
        </motion.h1>
    <div className="relative w-fit mx-auto overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-[shine_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
</div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 1, duration: 1 }}
          className="h-[1px] bg-yellow-600 mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-gray-300 tracking-[4px] font-['Montserrat']"
        >
          Where Memories Become Timeless
        </motion.p>

<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
  className="mt-16 text-yellow-600 text-sm tracking-[3px]"
>
  SCROLL
</motion.div>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
  console.log("clicked");

  document
    .getElementById("invitation")
    ?.scrollIntoView({ behavior: "smooth" });
}}
  onClick={() => {
    document
      .getElementById("invitation")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="mt-10 border border-yellow-600 px-8 py-3 tracking-[3px] text-sm text-yellow-500 hover:bg-yellow-600 hover:text-black transition-all duration-500"
>
  OPEN INVITATION
</motion.button>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
    </section>
    
  );
};

export default HeroLanding;