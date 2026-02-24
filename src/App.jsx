import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// UI Imports
import ParticleFlowBackground from './components/ui/ParticleFlowBackground'; 
import CustomCursor from './components/ui/CustomCursor';
import PageTransition from './components/ui/PageTransition';

// Feature Imports
import ChatWidget from './components/features/ChatWidget';

// Layout Imports
import Navigation from './components/layout/Navigation';

// Page Imports
import Home from './pages/Home';
import Projects from './pages/Projects'; // Εδώ περιλαμβάνονται πλέον και τα Skills
import Contact from './pages/Contact';

import './index.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll στην κορυφή κατά την αλλαγή σελίδας
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo(0, 0);
  }, [activeSection]);

  const renderContent = () => {
    switch(activeSection) {
      case 'home': return <Home />;
      case 'projects': return <Projects />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="relative w-full bg-[#0E1621] text-white font-sans h-[100svh] md:h-screen overflow-hidden flex flex-col cursor-none">
      <CustomCursor />
      
      {/* Σταθερό Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <ParticleFlowBackground />
      </div>

      <ChatWidget />
      
      {/* --- LOGO --- */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none">
        <div 
          onClick={() => setActiveSection('home')}
          className="inline-flex text-2xl font-bold tracking-wider items-center gap-1 group cursor-none pointer-events-auto hover:opacity-80 transition-opacity bg-[#0E1621]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5"
        >
          TSIOBA
          <span className="w-2 h-2 rounded-full bg-[#34B7F1] group-hover:shadow-[0_0_15px_#34B7F1] transition-all duration-300"></span>
        </div>
      </div>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 relative z-10 w-full overflow-y-auto overflow-x-hidden no-scrollbar">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={activeSection}>
            {renderContent()}
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;