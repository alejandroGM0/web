import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PaletteIcon from '@mui/icons-material/Palette';
import CloudIcon from '@mui/icons-material/Cloud';
import { sectionSpacing } from '../config/layout';

/**
 * Skill Card Component - Small glass card for individual skills
 */
function SkillCard({ icon: Icon, title, subtitle, color, offset = false }) {
    return (
        <Box
            sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                p: 3,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                mt: offset ? 4 : 0,
                '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                }
            }}
        >
            <Icon sx={{ fontSize: 40, color: color, mb: 1.5 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}>
                {title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                {subtitle}
            </Typography>
        </Box>
    );
}

/**
 * About Component - Glassmorphism card with tilt effect
 * Matches reference design: 2-column layout, skill cards, stats
 */
export default function About({ page, isMobile }) {
    const cardRef = useRef(null);

    // Tilt effect (same as TiltCard)
    useEffect(() => {
        const card = cardRef.current;
        if (!card || isMobile) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const factor = 2; // Gentler tilt for large card

            const rotateX = ((y - centerY) / centerY) * factor * -1;
            const rotateY = ((x - centerX) / centerX) * factor;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
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
    }, [isMobile]);

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: sectionSpacing.py,
                px: sectionSpacing.px,
            }}
        >
            {/* Main Glass Card */}
            <Box
                ref={cardRef}
                sx={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.2)',
                    borderRadius: '24px',
                    p: { xs: 3, md: 6 },
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    transition: 'all 0.3s ease, transform 0.15s ease',
                    '&:hover': {
                        borderColor: 'rgba(249, 115, 22, 0.5)',
                        boxShadow: '0 8px 32px -1px rgba(249, 115, 22, 0.15)',
                    }
                }}
            >
                {/* Decorative background blur */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 256,
                        height: 256,
                        background: 'rgba(249, 115, 22, 0.1)',
                        filter: 'blur(80px)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }}
                />

                <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Left Column - Text Content */}
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.75rem', md: '2.25rem' },
                                mb: 3,
                                color: 'white',
                            }}
                        >
                            Behind the Code
                        </Typography>

                        <Box sx={{ '& > p': { mb: 2, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 } }}>
                            <Typography>
                                I'm a multidisciplinary <Box component="span" sx={{ color: '#f97316', fontWeight: 600 }}>Computer Engineer</Box> with a passion for bridging the gap between robust engineering and creative design.
                            </Typography>
                            <Typography>
                                With a background that blends algorithmic problem-solving with artistic intuition, I don't just build software that works—I build experiences that inspire. Whether it's optimizing backend infrastructure or crafting silky-smooth frontend animations, I treat every line of code as a brushstroke.
                            </Typography>
                        </Box>

                        {/* Stats */}
                        <Grid container spacing={3} sx={{ pt: 3 }}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}>
                                    5+
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Years Experience
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}>
                                    40+
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Projects Completed
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Column - Skill Cards */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <SkillCard
                                    icon={CodeIcon}
                                    title="Development"
                                    subtitle="Full Stack Engineering"
                                    color="#60a5fa"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SkillCard
                                    icon={PsychologyIcon}
                                    title="AI Solutions"
                                    subtitle="Machine Learning Integration"
                                    color="#c084fc"
                                    offset
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SkillCard
                                    icon={PaletteIcon}
                                    title="UI/UX"
                                    subtitle="Interactive Design"
                                    color="#f472b6"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SkillCard
                                    icon={CloudIcon}
                                    title="Cloud"
                                    subtitle="Scalable Architecture"
                                    color="#4ade80"
                                    offset
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}