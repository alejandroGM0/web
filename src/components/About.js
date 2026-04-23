import React, { useState, useEffect } from "react";
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SecondaryButton } from './ui/Buttons';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PaletteIcon from '@mui/icons-material/Palette';
import CloudIcon from '@mui/icons-material/Cloud';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TiltCard from './ui/TiltCard';
import SectionHeader from './ui/SectionHeader';
import { sectionSpacing, cardPadding, contentGap } from '../config/layout';

// 4 Skill cards matching reference design
const skills = [
    {
        icon: <CodeIcon sx={{ fontSize: 36 }} />,
        title: 'Development',
        subtitle: 'Full Stack Engineering',
        color: '#60a5fa' // Blue
    },
    {
        icon: <PsychologyIcon sx={{ fontSize: 36 }} />,
        title: 'AI Solutions',
        subtitle: 'Machine Learning Integration',
        color: '#a78bfa' // Purple
    },
    {
        icon: <PaletteIcon sx={{ fontSize: 36 }} />,
        title: 'UI/UX',
        subtitle: 'Interactive Design',
        color: '#f472b6' // Pink
    },
    {
        icon: <CloudIcon sx={{ fontSize: 36 }} />,
        title: 'Cloud',
        subtitle: 'Scalable Architecture',
        color: '#4ade80' // Green
    }
];

// Stats section
const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '12+', label: 'Projects Completed' }
];



export default function About(props) {
    // Start with animate true if we're on the about page (page 1)
    const [animate, setAnimate] = useState(props.page === 1 || props.page === undefined);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        if (props.page === 1) setAnimate(true);
    }, [props.page, props.isMobile]);

    const socialPlatforms = [
        { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/alejandroGM0' },
        { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/alejandro-gasca-72608136b/' }
    ];

    return (
        <Container
            maxWidth="lg"
            sx={{
                pt: sectionSpacing.pt,
                pb: { xs: 8, sm: 6, md: sectionSpacing.py.md },
                px: sectionSpacing.px,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                minHeight: { xs: 'auto', md: '100%' },
            }}
        >


            <Box>
                <TiltCard
                    sx={{
                        p: cardPadding,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'border-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
                    }}
                >


                    <Grid container spacing={contentGap} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                        {/* Left column - Text content */}
                        <Grid item xs={12} md={6}>
                            <SectionHeader
                                title="About Me"
                                align="left"
                                mb={3}
                            />
                            <Typography
                                component="div"
                                sx={{ '& p': { mb: 2, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', fontSize: '1rem' } }}
                            >
                                <Typography component="p">
                                    I'm a Computer Engineering student at the University of Zaragoza (Unizar) with a passion for bridging the gap between hardware and software. My expertise spans from <Box component="span" sx={{ color: '#fb923c', fontWeight: 600 }}>embedded systems</Box> and robotics to scalable <Box component="span" sx={{ color: '#fb923c', fontWeight: 600 }}>full-stack architectures</Box>.
                                </Typography>
                                <Typography component="p">
                                    I don't just write code; I build systems. Whether it's designing autonomous drone flight controllers, optimizing real-time algorithms, or crafting immersive web experiences, I focus on performance, reliability, and solving complex engineering challenges.
                                </Typography>
                            </Typography>

                            {/* Open Source Contributor Badge - eye-catching */}
                            <Box
                                component="a"
                                href="https://github.com/alejandroGM0"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1.25,
                                    mt: 1,
                                    mb: 2.5,
                                    px: 2,
                                    py: 1,
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    background: 'linear-gradient(90deg, rgba(249, 115, 22, 0.18), rgba(251, 146, 60, 0.08))',
                                    border: '1px solid rgba(249, 115, 22, 0.45)',
                                    boxShadow: '0 0 24px rgba(249, 115, 22, 0.15)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        background: 'linear-gradient(90deg, rgba(249, 115, 22, 0.28), rgba(251, 146, 60, 0.15))',
                                        borderColor: 'rgba(249, 115, 22, 0.7)',
                                        boxShadow: '0 0 32px rgba(249, 115, 22, 0.3)',
                                    },
                                    '@keyframes pulseDot': {
                                        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                        '50%': { opacity: 0.6, transform: 'scale(1.25)' },
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: '#4ade80',
                                        boxShadow: '0 0 8px #4ade80',
                                        animation: 'pulseDot 1.8s ease-in-out infinite',
                                    }}
                                />
                                <GitHubIcon sx={{ fontSize: 18, color: '#fb923c' }} />
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    Open Source Contributor
                                </Typography>
                            </Box>

                            {/* Stats section - like reference */}
                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pt: 1, mb: 3 }}>
                                {stats.map((stat, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Typography
                                            variant="h4"
                                            sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Social buttons */}
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                {socialPlatforms.map((platform, index) => (
                                    <SecondaryButton
                                        key={index}
                                        variant="outlined"
                                        size="small"
                                        startIcon={platform.icon}
                                        onMouseEnter={() => setHovered(platform.name)}
                                        onMouseLeave={() => setHovered(null)}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {platform.name}
                                    </SecondaryButton>
                                ))}
                            </Box>
                        </Grid>

                        {/* Right column - 4 Skill cards in 2x2 grid */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={{ xs: 1.5, md: 2 }}>
                                {skills.map((skill, index) => (
                                    <Grid item xs={6} key={index}>
                                        <TiltCard
                                            sx={{
                                                // Only layout - NO background/border overrides
                                                p: { xs: 2.25, md: 3 },
                                                textAlign: 'center',
                                                // Staggered layout: odd items (index 1, 3) pushed down
                                                mt: index % 2 === 1 ? { xs: 2, md: 2 } : 0,
                                            }}
                                        >
                                            <Box sx={{ color: skill.color, mb: 1.5 }}>
                                                {skill.icon}
                                            </Box>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}
                                            >
                                                {skill.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}
                                            >
                                                {skill.subtitle}
                                            </Typography>
                                        </TiltCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </TiltCard>
            </Box>
        </Container >
    );
}