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

        const particleCount = 60;
        const connectionDistance = 180;
        const mouseDistance = 150;

        let mouse = { x: null, y: null };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.1; // Slower (was 0.2)
                this.vy = (Math.random() - 0.5) * 0.1;
                this.size = Math.random() * 1 + 0.5;
                // Mix of orange and white particles
                this.color = Math.random() > 0.8
                    ? 'rgba(249, 115, 22, ' // Orange (20%)
                    : 'rgba(255, 255, 255, '; // White (80%)
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges and clamp position to prevent
                // particles from getting stuck in a flip loop outside the viewport
                if (this.x < 0) { this.x = 0; this.vx *= -1; }
                else if (this.x > width) { this.x = width; this.vx *= -1; }
                if (this.y < 0) { this.y = 0; this.vy *= -1; }
                else if (this.y > height) { this.y = height; this.vy *= -1; }

                // Mouse interaction - push particles away
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    // Guard against division-by-zero when mouse is exactly on particle
                    if (distance > 0.001 && distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        this.vx -= forceDirectionX * force * 0.02;
                        this.vy -= forceDirectionY * force * 0.02;
                    }
                }

                // Damp & clamp velocity so accumulated mouse pushes don't send
                // particles flying off at absurd speeds
                this.vx *= 0.995;
                this.vy *= 0.995;
                const maxSpeed = 1.5;
                if (this.vx > maxSpeed) this.vx = maxSpeed;
                else if (this.vx < -maxSpeed) this.vx = -maxSpeed;
                if (this.vy > maxSpeed) this.vy = maxSpeed;
                else if (this.vy < -maxSpeed) this.vy = -maxSpeed;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + '0.5)';
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

        // Soft ambient light glows positioned around the canvas
        const ambientGlows = [
            { x: 0.15, y: 0.2, radius: 400, color: 'rgba(249, 115, 22, 0.03)' },
            { x: 0.85, y: 0.7, radius: 500, color: 'rgba(249, 115, 22, 0.025)' },
            { x: 0.5, y: 0.9, radius: 350, color: 'rgba(251, 146, 60, 0.02)' },
        ];

        function drawAmbientGlows() {
            ambientGlows.forEach(glow => {
                const gradient = ctx.createRadialGradient(
                    glow.x * width, glow.y * height, 0,
                    glow.x * width, glow.y * height, glow.radius
                );
                gradient.addColorStop(0, glow.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw subtle background glows
            drawAmbientGlows();

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (opacity * 0.15) + ')';
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

        const handleVisibility = () => {
            if (document.hidden) {
                if (animationId) cancelAnimationFrame(animationId);
                animationId = null;
            } else if (!animationId) {
                animate();
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibility);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

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
                backgroundColor: '#0a0f1c', // Darker navy - unified with App.css
                pointerEvents: 'none',
            }}
        />
    );
}
