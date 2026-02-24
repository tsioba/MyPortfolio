import React, { useState, useRef } from 'react';
import { Loader2, Sparkles, Send, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import PageTransition from '../components/ui/PageTransition';

const Contact = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handlePolishMessage = async (e) => {
    e.preventDefault(); 
    if (!message.trim() || isPolishing) return;
    setIsPolishing(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Rewrite the following message to be highly professional, polite, and clear. RULES: 1) Keep it strictly to 2-3 short sentences. 2) Do NOT add any fake information, imaginary details, or unnecessary fluff. 3) Preserve the original meaning exactly. Message: "${message}"` }] }]
          }),
        }
      );
      const data = await response.json();
      setMessage(data.candidates[0].content.parts[0].text.trim());
    } catch (error) { console.error(error); } finally { setIsPolishing(false); }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIdAdmin = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const templateIdAutoReply = import.meta.env.VITE_EMAILJS_AUTOREPLY_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    Promise.all([
      emailjs.sendForm(serviceId, templateIdAdmin, formRef.current, publicKey),
      emailjs.sendForm(serviceId, templateIdAutoReply, formRef.current, publicKey)
    ])
      .then(() => {
        setStatus('success');
        setMessage("");
        formRef.current.reset();
        setTimeout(() => setStatus(null), 5000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <PageTransition>
      {/* pb-32 στο κινητό για να μη κρύβεται το κουμπί από το Nav */}
      <div className="flex items-center justify-center min-h-screen pt-24 pb-32 md:pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
          
          {/* --- HEADER --- */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Contact <span className="text-[#34B7F1]">Me</span>
            </h2>
            {/* Στο κινητό τα socials μένουν πάνω για οικονομία χώρου, στο PC θα μπουν κάτω */}
            <div className="flex md:hidden justify-center gap-4 mb-4">
              <a href="https://github.com/tsioba" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#17212B] border border-white/10 flex items-center justify-center text-gray-400">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/giannis-tsioympanoydis/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#17212B] border border-white/10 flex items-center justify-center text-gray-400">
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>

          {/* --- FORM CARD --- */}
          <motion.div 
            className="bg-[#17212B]/50 backdrop-blur-xl p-5 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
                <div className="space-y-1.5">
                  <label className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input name="user_name" required type="text" className="w-full bg-[#0E1621]/80 border border-gray-700/50 rounded-2xl p-3.5 md:p-4 text-white focus:border-[#34B7F1] outline-none transition-all cursor-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input name="user_email" required type="email" className="w-full bg-[#0E1621]/80 border border-gray-700/50 rounded-2xl p-3.5 md:p-4 text-white focus:border-[#34B7F1] outline-none transition-all cursor-none" placeholder="email@example.com" />
                </div>
              </div>
              
              <div className="space-y-2 text-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-1">
                  <label className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Message</label>
                  <button type="button" onClick={handlePolishMessage} disabled={isPolishing || !message} className="w-full md:w-auto flex items-center justify-center gap-2 text-[10px] font-black text-[#34B7F1] bg-[#34B7F1]/5 hover:bg-[#34B7F1]/20 px-4 py-2 rounded-xl border border-[#34B7F1]/30 transition-all cursor-none">
                    {isPolishing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    {isPolishing ? "POLISHING..." : "REFINE WITH AI"}
                  </button>
                </div>
                <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-[#0E1621]/80 border border-gray-700/50 rounded-2xl p-4 md:p-5 text-white h-32 md:h-48 focus:border-[#34B7F1] outline-none transition-all resize-none cursor-none" placeholder="Tell me what's on your mind..."></textarea>
              </div>

              {/* --- SUBMIT BUTTON --- */}
              <button 
                type="submit"
                disabled={isSending}
                className="group relative w-full py-4 md:py-5 rounded-2xl border border-white/10 
                           bg-white/5 text-white md:text-white/80 
                           hover:bg-[#34B7F1] hover:text-[#0E1621] 
                           font-black tracking-widest transition-all duration-300 
                           hover:scale-[1.01] flex items-center justify-center gap-3 
                           text-sm md:text-base cursor-none pointer-events-auto"
              >
                {isSending ? <Loader2 className="animate-spin" /> : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    SEND MESSAGE
                  </>
                )}
              </button>

              {/* --- SUCCESS / ERROR MESSAGE --- */}
              <AnimatePresence>
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className={`text-center text-xs md:text-sm font-bold flex items-center justify-center gap-2 ${status === 'success' ? 'text-[#34B7F1]' : 'text-red-500'}`}
                  >
                    {status === 'success' ? (
                      <><CheckCircle2 size={16} /> Message sent successfully!</>
                    ) : (
                      "Failed to send message. Please try again."
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* --- SOCIALS (Μόνο για PC, κάτω από τη φόρμα) --- */}
          <motion.div 
            className="hidden md:flex justify-center gap-8 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href="https://github.com/tsioba" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-none group">
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#34B7F1]/50 group-hover:bg-white/5 transition-all">
                <Github size={24} />
              </div>
              <span className="text-xs font-mono tracking-tighter"></span>
            </a>
            <a href="https://linkedin.com/in/giannis-tsioympanoydis/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-[#34B7F1] transition-colors cursor-none group">
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#34B7F1]/50 group-hover:bg-white/5 transition-all">
                <Linkedin size={24} />
              </div>
              <span className="text-xs font-mono tracking-tighter"></span>
            </a>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;