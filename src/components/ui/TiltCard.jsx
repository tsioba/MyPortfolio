import React, { useRef } from 'react';

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    // 1. ΕΛΕΓΧΟΣ: Αν είναι κινητό (πλάτος < 768px), ΣΤΑΜΑΤΑ ΕΔΩ.
    // Μην κάνεις κανέναν υπολογισμό.
    if (window.innerWidth < 768) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Μειώσαμε λίγο την ένταση (από 5 σε 7 για διαίρεση) για πιο smooth effect στο Desktop
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    // Χρησιμοποιούμε requestAnimationFrame για να μην κολλάει ούτε στο Desktop
    requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      // Αφαιρούμε το preserve-3d στο mobile για να γλιτώσουμε GPU
      style={{ transformStyle: window.innerWidth < 768 ? 'flat' : 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export default TiltCard;