import React, { useState, useEffect } from 'react';
import { QUOTES } from '../constants';

function QuoteRotator() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
    }, 4500);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <section className="py-24 bg-surface-container-low/30 overflow-hidden relative min-h-[160px] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-2xl md:text-4xl italic font-serif text-on-surface/90 transition-all duration-1000 transform scale-100 opacity-100">
          {QUOTES[currentQuote]}
        </p>
      </div>
    </section>
  );
}

export default QuoteRotator;
