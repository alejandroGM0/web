import React, { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';

/**
 * TiltCard - Glass morphism card with smooth tilt and subtle visible glow
 */
const TiltCard = forwardRef(function TiltCard({ children, sx = {}, tiltEnabled = true, ...props }, ref) {
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef(null);
    const animationRef = useRef(null);
    const targetRef = useRef({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
    const currentRef = useRef({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

    const animate = useCallback(() => {
        const lerp = (start, end, factor) => start + (end - start) * factor;
        const smoothFactor = 0.1;

        currentRef.current.rotateX = lerp(currentRef.current.rotateX, targetRef.current.rotateX, smoothFactor);
        currentRef.current.rotateY = lerp(currentRef.current.rotateY, targetRef.current.rotateY, smoothFactor);
        currentRef.current.glowX = lerp(currentRef.current.glowX, targetRef.current.glowX, smoothFactor);
        currentRef.current.glowY = lerp(currentRef.current.glowY, targetRef.current.glowY, smoothFactor);

        setTransform(`perspective(1000px) rotateX(${currentRef.current.rotateX}deg) rotateY(${currentRef.current.rotateY}deg)`);
        setGlowPosition({ x: currentRef.current.glowX, y: currentRef.current.glowY });

        const threshold = 0.01;
        const needsAnimation =
            Math.abs(currentRef.current.rotateX - targetRef.current.rotateX) > threshold ||
            Math.abs(currentRef.current.rotateY - targetRef.current.rotateY) > threshold;

        if (needsAnimation) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // CRITICAL FIX: Clear the animation ref when animation completes
            animationRef.current = null;
        }
    }, []);

    const handleMouseMove = (e) => {
        if (!tiltEnabled || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // More noticeable tilt effect
        targetRef.current.rotateX = ((y - centerY) / centerY) * -3;
        targetRef.current.rotateY = ((x - centerX) / centerX) * 3;
        targetRef.current.glowX = (x / rect.width) * 100;
        targetRef.current.glowY = (y / rect.height) * 100;

        if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    const handleMouseEnter = (e) => {
        setIsHovering(true);
        // Start from mouse position
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentRef.current.glowX = (x / rect.width) * 100;
            currentRef.current.glowY = (y / rect.height) * 100;
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        targetRef.current = { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 };

        if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    // Cleanup animation frame on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <Box
            ref={(node) => {
                cardRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid',
                borderColor: isHovering ? 'rgba(249, 115, 22, 0.35)' : 'rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                overflow: 'hidden',
                transform: transform,
                transformStyle: 'preserve-3d',
                transition: 'border-color 0.3s ease',
                // Subtle glow effect - visible but soft edges
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isHovering
                        ? `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(249, 115, 22, 0.03), transparent 80%)`
                        : 'transparent',
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                    opacity: isHovering ? 1 : 0,
                    zIndex: 0,
                },
                ...sx
            }}
            {...props}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Box>
    );
});

export default TiltCard;
