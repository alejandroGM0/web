import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';

/**
 * TiltCard - Glassmorphism card with vanilla JS tilt effect
 * Based on user's reference design - no external dependencies
 */
export default function TiltCard({ children, sx = {}, onClick }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const factor = 5; // Tilt intensity

            const rotateX = ((y - centerY) / centerY) * factor * -1;
            const rotateY = ((x - centerX) / centerX) * factor;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <Box
            ref={cardRef}
            onClick={onClick}
            sx={{
                // Glassmorphism Base
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.2)',
                borderRadius: '16px',

                // Transition for smooth effects
                transition: 'all 0.3s ease, transform 0.15s ease',

                // Hover state
                '&:hover': {
                    borderColor: 'rgba(249, 115, 22, 0.5)', // Orange accent
                    boxShadow: '0 8px 32px -1px rgba(249, 115, 22, 0.15)',
                },

                // User custom styles
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}
