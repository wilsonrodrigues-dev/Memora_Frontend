const GoldenParticles = () => {
  return (
    <>
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-yellow-500/5 blur-3xl rounded-full"></div>

      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-yellow-600/5 blur-3xl rounded-full"></div>

      {/* Tiny Glow Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-400/20 blur-[1px]"
          style={{
            width: i % 2 === 0 ? "3px" : "2px",
            height: i % 2 === 0 ? "3px" : "2px",
            top: `${15 + i * 12}%`,
            left: `${10 + i * 14}%`,
          }}
        />
      ))}
    </>
  );
};

export default GoldenParticles;