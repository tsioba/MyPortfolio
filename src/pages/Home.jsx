import React from 'react';
import { Code2, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import TiltCard from '../components/ui/TiltCard';

// Εισαγωγή του βίντεο από τα assets
import memojiVideo from '../assets/memoji.mp4'; 

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <PageTransition>
      <motion.div 
        className="container mx-auto px-6 min-h-screen flex items-center justify-center pt-32 md:pt-48 pb-40 md:pb-56"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full max-w-6xl">
          
          {/* --- LEFT SIDE: THE CARD --- */}
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex justify-center perspective-1000">
            <TiltCard className="relative w-72 h-72 md:w-[400px] md:h-[400px] group cursor-none">
              <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-[#027BCE] to-[#4A25E1] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <div className="relative w-full h-full bg-[#17212B] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 m-auto w-64 h-64 bg-[#027BCE]/20 blur-[60px] rounded-full scale-60 group-hover:scale-90 transition-transform duration-500 z-0"></div>
                
                {/* --- CONTAINER ΒΙΝΤΕΟ --- */}
                <div 
                    className="absolute inset-0 z-10 mix-blend-screen pointer-events-none overflow-hidden rounded-3xl bg-black"
                    style={{ 
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 55%, rgba(0,0,0,0.1) 85%, transparent 100%)', 
                        maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 55%, rgba(0,0,0,0.1) 85%, transparent 100%)',
                        WebkitTransform: 'translateZ(0)', 
                        transform: 'translateZ(0)'
                    }}
                >
                    <video 
                        src={memojiVideo} 
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover translate-y-4
                                   scale-110 contrast-110 brightness-75 
                                   md:scale-110 md:contrast-130 md:brightness-90
                                   group-hover:scale-115 md:group-hover:scale-120 
                                   transition-transform duration-500 ease-out"
                    />
                </div>

                <div className="absolute bottom-10 z-20 text-xl font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500 text-center w-full">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#027BCE] to-[#34B7F1]">HELLO THERE!</span>
                </div>
                
                {/* Icons */}
                <div className="absolute top-6 right-6 z-20 bg-[#0E1621]/90 backdrop-blur-md p-3 rounded-xl border border-[#027BCE]/30 shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
                  <Code2 className="text-[#027BCE]" size={24} />
                </div>
                <div className="absolute bottom-6 left-6 z-20 bg-[#0E1621]/90 backdrop-blur-md p-3 rounded-xl border border-[#4A25E1]/30 shadow-lg group-hover:translate-y-2 transition-transform duration-500">
                  <Database className="text-[#4A25E1]" size={24} />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* --- RIGHT SIDE: THE CONTENT --- */}
          <motion.div variants={itemVariants} className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight whitespace-nowrap">
                Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#027BCE] to-[#4A25E1]">Engineer</span>
              </h2>
              <p className="text-[#8E9BA8] font-mono text-sm tracking-widest uppercase font-bold">
                Crafting Digital Solutions
              </p>
            </div>

            {/* Κύριο Κείμενο */}
            <div className="text-[#8E9BA8] text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
              <p>
                I specialize in designing software architectures and developing full-stack applications. I focus on transforming complex problems into clean, scalable, and user-centric web solutions using modern tools like <strong>React</strong> and <strong>Spring Boot</strong>.
              </p>
            </div>
            
            {/* Stats (Χωρίς hover στα H3) */}
            <div className="flex justify-center md:justify-start gap-12 pt-4">
              <div>
                <h3 className="text-4xl font-bold text-white mb-1">
                  B.Sc.
                </h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#027BCE] to-[#34B7F1] text-xs font-bold uppercase tracking-tighter">
                  UoM Graduate
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-1">
                  3y+
                </h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A25E1] to-[#7B61FF] text-xs font-bold uppercase tracking-tighter">
                  Dev Experience
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </motion.div>
    </PageTransition>
  );
};

export default Home;