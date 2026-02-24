import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Terminal } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: "Γεια! Είμαι το AI του Γιάννη. Πώς μπορώ να βοηθήσω;" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Κρατάμε το ύψος σε state για να το ελέγχουμε απόλυτα
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- ΤΟ FIX ΓΙΑ ΤΟ ΥΨΟΣ ---
  useEffect(() => {
    const handleResize = () => {
      // Όταν ανοίγει το πληκτρολόγιο, το window.innerHeight μικραίνει (στο Android/iOS με σωστό meta tag)
      setWindowHeight(window.innerHeight);
      scrollToBottom();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Κλείδωμα της πίσω σελίδας
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Scroll όταν έρχεται νέο μήνυμα
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      // --- ΕΔΩ ΕΙΝΑΙ ΟΙ ΟΔΗΓΙΕΣ (SYSTEM PROMPT) ---
      const systemPrompt = `Είσαι ο προσωπικός AI βοηθός του Γιάννη Τσιουμπανούδη (Giannis Tsioumpanoudis).

      ΑΥΣΤΗΡΟΙ ΚΑΝΟΝΕΣ ΣΥΜΠΕΡΙΦΟΡΑΣ:
      1. ΜΗΚΟΣ ΑΠΑΝΤΗΣΗΣ: Απάντα ΠΑΝΤΑ με 2 έως 4 σύντομες προτάσεις το πολύ. Απαγορεύεται να γράφεις μεγάλες παραγράφους.
      2. ΤΟΝΟΣ: Επαγγελματικός, φιλικός και άμεσος.
      3. ΓΛΩΣΣΑ: Απάντα αυστηρά στη γλώσσα του χρήστη (π.χ. Αγγλικά σε Αγγλικά, Ελληνικά σε Ελληνικά).
      4. ΑΓΝΩΣΤΕΣ ΠΛΗΡΟΦΟΡΙΕΣ: Αν σε ρωτήσουν κάτι που δεν υπάρχει στις παρακάτω πληροφορίες, απάντα ευγενικά ότι δεν γνωρίζεις και πρότεινέ τους να επικοινωνήσουν απευθείας με τον Γιάννη.

      ΔΕΔΟΜΕΝΑ ΓΙΑ ΤΟΝ ΓΙΑΝΝΗ (Χρησιμοποίησέ τα μόνο όταν η ερώτηση είναι σχετική):
      - Ιδιότητα: Software Engineer.
      - Σπουδές: Απόφοιτος Εφαρμοσμένης Πληροφορικής (B.Sc.) από το Πανεπιστήμιο Μακεδονίας.
      - Τεχνολογίες: React, Spring Boot, Java, JavaScript, MySQL, HTML, CSS.
      - Εμπειρία: Εργάζεται ως Freelancer. Στο παρελθόν εργάστηκε για σύντομο χρονικό διάστημα ως Frontend Developer στην Netsoft Technologies (2025).
      - Projects: Αναπτύσσει διάφορα web apps και custom software. Όταν σε ρωτούν για projects, να απαντάς γενικά για την κατασκευή web apps/software και ΝΑ ΤΟΥΣ ΠΡΟΤΡΕΠΕΙΣ ΠΑΝΤΑ να δουν τα επιλεγμένα projects που παρουσιάζει ο Γιάννης στη σελίδα του.
      - Επικοινωνία: Μέσω email στο tsioba02@gmail.com ή μέσω της φόρμας επικοινωνίας στο website www.tsioba.gr.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: [{ parts: [{ text: userMsg }] }]
          }),
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'assistant', text: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Προέκυψε σφάλμα σύνδεσης. Παρακαλώ δοκίμασε ξανά σε λίγο." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-[9999] font-sans">
      
      {/* --- CHAT CONTAINER --- */}
      <div 
        className={`
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
          
          /* MOBILE: Fixed, Top-0, Left-0, Right-0 (Ύψος μέσω style) */
          fixed inset-x-0 top-0 z-[10000]
          bg-[#0b1121] flex flex-col

          /* DESKTOP overrides */
          md:absolute md:inset-auto md:bottom-20 md:right-0 md:w-[380px] md:h-[600px] 
          md:rounded-2xl md:border md:border-blue-500/30 md:bg-[#0b1121]/95 md:backdrop-blur-2xl md:shadow-2xl
        `}
        style={{ height: window.innerWidth < 768 ? windowHeight : '600px' }}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-[#0b1121] p-4 flex justify-between items-center border-b border-blue-500/20 shrink-0 safe-area-top">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-400/30"><Terminal size={18} className="text-blue-400" /></div>
            <div><h3 className="text-white font-bold text-sm tracking-widest font-mono">GIANNIS_AI</h3><span className="text-[10px] text-blue-400/80 font-mono">SYSTEM ONLINE v2.5</span></div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/70 transition-colors cursor-pointer"><X size={24} /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0b1121] scrollbar-thin scrollbar-thumb-blue-900/50 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed shadow-lg ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' : 'bg-[#1e293b] text-blue-100 border border-blue-500/20 rounded-2xl rounded-tl-sm'}`}>{msg.text}</div>
            </div>
          ))}
          {isLoading && <div className="flex justify-start animate-pulse"><div className="bg-[#1e293b] p-3 rounded-2xl rounded-tl-sm border border-blue-500/10 flex items-center gap-2"><Loader2 size={16} className="text-blue-400 animate-spin" /><span className="text-xs text-blue-400 font-mono">Thinking...</span></div></div>}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#0f172a] border-t border-blue-500/20 flex gap-3 shrink-0 pb-safe md:pb-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            autoComplete="off"
            className="flex-1 bg-[#1e293b] text-white text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-400 border border-blue-500/10 placeholder-blue-500/30 transition-all font-mono"
            style={{ fontSize: '16px' }} 
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95 shadow-lg cursor-pointer"><Send size={20} /></button>
        </div>
      </div>

      {/* Toggle Button Container */}
      <div className="fixed bottom-8 right-4 md:bottom-10 md:right-8 z-[9999]">
        <div className="animate-bot-bounce">
          <button onClick={() => setIsOpen(!isOpen)} className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 active:scale-90 cursor-pointer ${isOpen ? 'rotate-180 scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <Bot size={30} className="transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bot-bounce {
          0%, 100% { transform: translateY(0); }
          5% { transform: translateY(-15px); }
          10% { transform: translateY(0); }
          15% { transform: translateY(-6px); }
          20% { transform: translateY(0); }
        }
        .animate-bot-bounce {
          animation: bot-bounce 5s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
        }
      `}} />
    </div>
  );
};

export default ChatWidget;