import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layout, Server, Cpu } from 'lucide-react'; 
import { 
  SiReact, SiSpringboot, SiJavascript, SiMysql, SiHtml5, SiTailwindcss 
} from 'react-icons/si'; 
import { FaJava } from 'react-icons/fa';
import { TbBrandReactNative } from 'react-icons/tb';
import TiltCard from '../components/ui/TiltCard';

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectsData = [
    { title: "3D E-Shop", type: "E-SHOP", desc: "Immersive 3D e-commerce.", tags: ["React", "Three.js"] },
    { title: "Coffee App", type: "APP", desc: "Mobile ordering system.", tags: ["RN", "Redux"] },
    { title: "Boat Booking", type: "PWA", desc: "Reservation system.", tags: ["Spring", "Kafka"] },
    { title: "Fitness Hub", type: "WEB", desc: "Analytics dashboard.", tags: ["React", "Chart.js"] },
  ];

  const servicesData = [
    {
      icon: Layout,
      title: "Frontend Development",
      desc: "Creating fast, responsive, and visually striking user interfaces with pixel-perfect attention to detail.",
      color: "text-[#34B7F1]"
    },
    {
      icon: Server,
      title: "Backend Architecture",
      desc: "Building scalable, secure APIs and managing complex databases to ensure robust application logic.",
      color: "text-[#6DB33F]"
    },
    {
      icon: Cpu, 
      title: "Custom Software",
      desc: "Delivering end-to-end tailored applications and cross-platform solutions that drive business growth.",
      color: "text-[#7B61FF]"
    }
  ];

  const skillStack = [
    { icon: SiReact, label: 'React', color: '#61DAFB' },
    { icon: FaJava, label: 'Java', color: '#f89820' },
    { icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F' },
    // ΑΛΛΑΓΗ 1: JS -> JavaScript
    { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' }, 
    { icon: SiMysql, label: 'MySQL', color: '#4479A1' },
    { icon: TbBrandReactNative, label: 'React Native', color: '#61DAFB' },
    { icon: SiHtml5, label: 'HTML5', color: '#E34F26' },
    { icon: SiTailwindcss, label: 'Tailwind', color: '#38B2AC' }
  ];

  const duplicatedSkills = [...skillStack, ...skillStack];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-3 md:px-6 pt-24 md:pt-32 pb-40 md:pb-56 min-h-screen relative z-10"
    >
      {/* --- SECTION 1: PROJECTS --- */}
      <section className="mb-20 md:mb-32">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12 flex items-center gap-3">
          <span className="w-8 md:w-12 h-1 bg-[#34B7F1]"></span> Featured Works
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
          {projectsData.map((project, idx) => (
            <TiltCard key={idx} className="h-full group cursor-none relative">
              <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-[#34B7F1] to-[#7B61FF] rounded-2xl md:rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative h-full bg-[#17212B] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col transition-transform duration-300">
                <div className="h-32 md:h-52 bg-gradient-to-b from-[#1a2634] to-[#0E1621] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#34B7F1]/5 mix-blend-overlay"></div>
                  <span className="text-2xl md:text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 uppercase">
                    {project.type}
                  </span>
                </div>

                <div className="p-3 md:p-8 flex-1 flex flex-col bg-[#17212B]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm md:text-2xl font-bold text-white group-hover:text-[#34B7F1] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <ExternalLink className="text-gray-500 hidden md:block" size={18} />
                  </div>
                  <p className="text-[#8E9BA8] text-[10px] md:text-sm mb-3 md:mb-6 line-clamp-2 md:line-clamp-none leading-relaxed flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-[#0E1621] text-[#34B7F1] text-[8px] md:text-xs font-bold rounded border border-[#34B7F1]/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-20 md:mb-32" />

      {/* --- SECTION 2: WHAT I DO --- */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#34B7F1] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold block mb-3">
            My Expertise
          </span>
          <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight">
            What I <span className="text-[#34B7F1]">Do.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          {servicesData.map((service, idx) => (
            <div 
              key={idx} 
              className="group relative bg-[#17212B]/40 backdrop-blur-sm p-5 md:p-10 rounded-2xl md:rounded-3xl flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#34B7F1]/30 cursor-none"
            >
              <div className="relative z-10 shrink-0 p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#0E1621] border border-white/5 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <service.icon className={`w-6 h-6 md:w-8 md:h-8 ${service.color} transition-colors duration-500`} />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-3 group-hover:text-[#34B7F1] transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-[#8E9BA8] text-[11px] md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-20 md:mb-32" />

      {/* --- SECTION 3: SKILLS --- */}
      <section>
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#34B7F1] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold block mb-3">
            Technical Stack
          </span>
          <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight">
            My <span className="text-[#34B7F1]">Skills.</span>
          </h2>
        </div>

        <div 
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="flex w-max animate-marquee gap-4 md:gap-6 py-4">
            {duplicatedSkills.map((skill, idx) => (
              <div 
                key={idx} 
                style={{ '--icon-color': skill.color }}
                className="group relative bg-[#17212B]/40 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center gap-5 border border-white/5 transition-all duration-500 hover:border-[#34B7F1]/40 cursor-none flex-shrink-0 w-[160px] md:w-[220px]"
              >
                <div className="relative z-10 p-5 rounded-2xl bg-[#0E1621] border border-white/5 shadow-2xl transition-all duration-500 md:group-hover:scale-110 md:group-hover:-translate-y-2" style={{ color: skill.color }}>
                  <skill.icon size={40} className="skill-icon md:text-[45px]" />
                </div>
                {/* ΑΛΛΑΓΗ 2: Προστέθηκε το text-center για να είναι κεντραρισμένο το κείμενο αν σπάσει σε δύο γραμμές */}
                <span className="font-bold text-base md:text-lg text-gray-200 group-hover:text-white transition-colors text-center">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .skill-icon { transition: all 0.5s; }
          .group:hover .skill-icon {
            filter: drop-shadow(0 0 15px var(--icon-color));
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />
    </motion.div>
  );
};

export default Projects;