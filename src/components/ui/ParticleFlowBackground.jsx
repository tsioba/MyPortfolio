import React, { useEffect, useRef } from 'react';

const ParticleFlowBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    const particleCount = 120;
    
    // Ρυθμίσεις για το εφέ "Flow Field"
    const noiseScale = 0.003; // Πόσο "σφιχτά" είναι τα κύματα
    const speed = 0.8;
    const colors = ['#34B7F1', '#7B61FF', '#00F0FF'];

    let mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.history = []; // Για να ζωγραφίζουμε την "ουρά"
        this.maxHistory = Math.floor(Math.random() * 15 + 5);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = 0;
      }

      update() {
        // Υπολογισμός γωνίας βάσει θέσης (Flow Field Logic)
        this.angle = (Math.sin(this.x * noiseScale) + Math.cos(this.y * noiseScale)) * Math.PI * 2;
        
        this.vx = Math.cos(this.angle) * speed;
        this.vy = Math.sin(this.angle) * speed;

        // Αλληλεπίδραση με ποντίκι: Τα σωματίδια αποφεύγουν το ποντίκι
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          const angleToMouse = Math.atan2(dy, dx);
          this.vx -= Math.cos(angleToMouse) * force * 2;
          this.vy -= Math.sin(angleToMouse) * force * 2;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Αποθήκευση ιστορικού για την ουρά
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) {
          this.history.shift();
        }

        // Reset αν βγει εκτός οθόνης
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.init();
        }
      }

      draw() {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.4; // Διακριτικό εφέ
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      handleResize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Σβήνουμε το canvas με πολύ μικρό opacity για να αφήνει ένα αχνό trail
      ctx.fillStyle = 'rgba(14, 22, 33, 0.1)'; 
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      requestAnimationFrame(animate);
    };

    init();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

export default ParticleFlowBackground;