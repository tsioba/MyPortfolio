import React from 'react';
import { Home, Cpu, Mail } from 'lucide-react';

const Navigation = ({ activeSection, setActiveSection }) => {
  const navLinks = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'projects', name: 'Works', icon: Cpu }, // Χρησιμοποιούμε το Cpu για τα έργα/skills
    { id: 'contact', name: 'Contact', icon: Mail },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-[#17212B]/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] pointer-events-auto">
      {navLinks.map((link) => (
        <button 
          key={link.id} 
          onClick={() => setActiveSection(link.id)}
          className={`
            relative group p-3 rounded-full transition-all duration-300 cursor-none flex flex-col items-center justify-center
            ${activeSection === link.id ? 'bg-[#34B7F1] text-[#0E1621]' : 'text-gray-400 hover:text-white hover:bg-white/10'}
          `}
        >
          <link.icon 
            size={22} 
            className={`transition-transform duration-300 ${activeSection === link.id ? 'scale-110' : 'group-hover:scale-110'}`} 
          />
          
          {/* Αφαιρέθηκε το Tooltip-style Label */}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;