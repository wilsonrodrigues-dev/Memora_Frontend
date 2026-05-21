import React, { useState, useEffect } from "react";

function Countdown() {

  // Set target date
  const targetDate = new Date("2026-06-04T00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),

      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [countdown, setCountdown] = useState(calculateTimeLeft());

  useEffect(() => {

    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <section className="py-24 px-6 md:px-16 relative">

      <div className="glass-card max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center overflow-hidden border border-primary/20 relative">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>

        <h2 className="text-xs tracking-[0.3em] font-bold text-primary uppercase mb-12 relative z-10">
          The Clock is Ticking
        </h2>

        <div className="flex justify-center gap-4 md:gap-10 flex-wrap relative z-10">

          {/* Days */}
          <TimeCard value={countdown.days} label="Days" />

          <Colon />

          {/* Hours */}
          <TimeCard
            value={String(countdown.hours).padStart(2, "0")}
            label="Hours"
          />

          <Colon />

          {/* Minutes */}
          <TimeCard
            value={String(countdown.minutes).padStart(2, "0")}
            label="Minutes"
          />

          <Colon />

          {/* Seconds */}
          <TimeCard
            value={String(countdown.seconds).padStart(2, "0")}
            label="Seconds"
          />

        </div>
      </div>
    </section>
  );
}

function TimeCard({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[90px]">
      <span className="text-5xl md:text-8xl font-extrabold leading-none mb-3">
        {value}
      </span>

      <span className="text-[10px] md:text-xs font-semibold text-on-surface-variant/40 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <div className="text-4xl md:text-7xl font-light text-on-surface-variant/20 self-start md:mt-2">
      :
    </div>
  );
}

export default Countdown;