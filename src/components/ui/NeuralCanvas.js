import React, { useRef, useEffect } from 'react';

/**
 * Neural network-style canvas background animation with mouse interaction.
 * Features: Mix of orange/white particles with connecting lines.
 */
export default function NeuralCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationId;
        const particles = [];

        const isMobile = window.innerWidth <= 900;
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        // Reduce particle count significantly for Firefox to ensure 60fps
        const particleCount = isMobile ? 32 : (isFirefox ? 40 : 60);
        const connectionDistance = isMobile ? 120 : 180;
        const mouseDistance = isMobile ? 110 : 150;

        let mouse = { x: null, y: null };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.1;
                this.vy = (Math.random() - 0.5) * 0.1;
                this.size = Math.random() * (isMobile ? 0.8 : 1) + (isMobile ? 0.3 : 0.5);
                this.color = Math.random() > 0.8
                    ? 'rgba(249, 115, 22, '
                    : 'rgba(255, 255, 255, ';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        this.vx -= forceDirectionX * force * 0.02;
                        this.vy -= forceDirectionY * force * 0.02;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + (isMobile ? '0.28)' : '0.5)');
                ctx.fill();
            }
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function init() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Background glows are now handled by CSS to save GPU cycles

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (opacity * (isMobile ? 0.06 : 0.15)) + ')';
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        resize();
        init();
        animate();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Static ambient glows defined in CSS for better performance
    const backgroundGlows = `
        radial-gradient(circle at 15% 20%, rgba(249, 115, 22, 0.02) 0%, transparent 400px),
        radial-gradient(circle at 85% 70%, rgba(249, 115, 22, 0.018) 0%, transparent 500px),
        radial-gradient(circle at 50% 90%, rgba(251, 146, 60, 0.015) 0%, transparent 350px)
    `;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                backgroundColor: '#0a0f1c',
                backgroundImage: backgroundGlows, // Moved from Canvas draw loop to CSS
                pointerEvents: 'none',
            }}
        />
    );
}
