import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiSpringboot, 
  SiJavascript, 
  SiMysql, 
  SiHtml5, 
  SiTailwindcss 
} from 'react-icons/si'; 
import { FaJava } from 'react-icons/fa';
import { TbBrandReactNative } from 'react-icons/tb';
import PageTransition from '../components/ui/PageTransition';

const Skills = () => {
  const skillStack = [
    { icon: SiReact, label: 'React', color: '#61DAFB' },
    { icon: FaJava, label: 'Java', color: '#f89820' },
    { icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F' },
    { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
    { icon: SiMysql, label: 'MySQL', color: '#4479A1' },
    { icon: TbBrandReactNative, label: 'React Native', color: '#61DAFB' },
    { icon: SiHtml5, label: 'HTML5', color: '#E34F26' },
    { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#38B2AC' }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
        
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#34B7F1] font-mono text-xs tracking-[0.4em] uppercase font-bold block mb-4">
            Mastered Technologies
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Technical <span className="text-[#34B7F1]">Stack.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillStack.map((skill, idx) => (
            <div 
              key={idx} 
              // Χρησιμοποιούμε CSS Variable (--icon-color) για να περάσουμε το χρώμα στο hover style
              style={{ '--icon-color': skill.color }}
              className="group relative bg-[#17212B]/40 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center gap-5 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#34B7F1]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-none"
            >
              {/* Subtle dynamic background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                style={{ backgroundColor: skill.color }}
              ></div>
              
              <div 
                className="relative z-10 p-5 rounded-2xl bg-[#0E1621] border border-white/5 shadow-2xl transition-all duration-500 group-hover:scale-110"
                style={{ color: skill.color }}
              >
                <skill.icon 
                  size={45} 
                  className="skill-icon transition-all duration-500"
                />
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-bold text-gray-200 group-hover:text-white transition-colors tracking-tight text-lg">
                  {skill.label}
                </span>
                
                <div 
                  className="w-0 group-hover:w-full h-0.5 transition-all duration-500 mt-1"
                  style={{ backgroundColor: skill.color }}
                ></div>
              </div>

              {/* Το "μαγικό" CSS για το σωστό χρώμα στο glow */}
              <style jsx>{`
                .group:hover .skill-icon {
                  filter: drop-shadow(0 0 15px var(--icon-color));
                }
              `}</style>
            </div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Skills;