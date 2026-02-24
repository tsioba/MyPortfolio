import React, { useEffect, useRef, useState } from 'react';

/**
 * Cyber-Grid Pulse Cursor (Clean Core Version)
 * Ένας προηγμένος κέρσορας με εφέ σκαναρίσματος και εξάγωνο πυρήνα στο κέντρο.
 * Αφαιρέθηκαν οι γωνίες (brackets) και οι HUD ενδείξεις.
 */
const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setIsHidden(false);
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isSelectable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isSelectable);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isHovered]);

  return (
    <div className={`fixed top-0 left-0 pointer-events-none z-[9999999999999999999999999] hidden md:block transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* ΚΕΝΤΡΙΚΟ ΣΤΑΥΡΟΝΗΜΑ ΚΑΙ ΠΥΡΗΝΑΣ */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        {/* Κάθετη Γραμμή */}
        <div className={`absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-[#34B7F1] to-transparent opacity-40 transition-all duration-300 ${isHovered ? 'h-32 opacity-100' : ''}`} />
        {/* Οριζόντια Γραμμή */}
        <div className={`absolute h-[1px] w-20 bg-gradient-to-r from-transparent via-[#34B7F1] to-transparent opacity-40 transition-all duration-300 ${isHovered ? 'w-32 opacity-100' : ''}`} />
        
        {/* ΕΞΑΓΩΝΟΣ ΠΥΡΗΝΑΣ (HEX CORE) */}
        <div className={`w-5 h-5 transition-all duration-500 flex items-center justify-center ${isHovered ? 'scale-125 rotate-90' : 'rotate-0'}`}>
           <svg viewBox="0 0 100 100" className={`w-full h-full fill-none stroke-current ${isHovered ? 'text-[#00F0FF]' : 'text-white opacity-80'}`} strokeWidth="8">
             <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
           </svg>
           {/* Το κεντρικό σημείο λάμψης */}
           <div className={`absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff] ${isHovered ? 'animate-ping' : ''}`} />
        </div>
      </div>

    </div>
  );
};

export default CustomCursor;