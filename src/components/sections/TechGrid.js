import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import SectionHeader from '../ui/SectionHeader';
import { sectionSpacing } from '../../config/layout';

// Helper component for Marquee Row
const MarqueeRow = ({ items, direction = 'normal', speed = '40s' }) => {
    return (
        <div className="marquee-container" style={{ marginBottom: '2rem' }}>
            <div
                className={`marquee-content ${direction === 'reverse' ? 'reverse' : ''}`}
                style={{ animationDuration: speed }}
            >
                {/* Duplicate content enough times to ensure seamless infinite scroll */}
                {[...items, ...items, ...items, ...items].map((tech, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 3,
                            py: 1.5,
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.3s ease',
                            flexShrink: 0,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.08)',
                                borderColor: '#f97316',
                                transform: 'scale(1.05)',
                                boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)',
                            }
                        }}
                    >
                        <i
                            className={`devicon-${tech.iconName}-plain`}
                            style={{
                                fontSize: '2rem',
                                color: tech.color || 'white',
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {tech.title}
                        </Typography>
                    </Box>
                ))}
            </div>
        </div>
    );
};

// Data split into rows
const ROW_1 = [
    { title: "Python", iconName: "python", color: "#3776AB" },
    { title: "C++", iconName: "cplusplus", color: "#00599C" },
    { title: "JavaScript", iconName: "javascript", color: "#F7DF1E" },
    { title: "TypeScript", iconName: "typescript", color: "#3178C6" },
    { title: "Lua", iconName: "lua", color: "#2C2D72" },
];

const ROW_2 = [
    { title: "React", iconName: "react", color: "#61DAFB" },
    { title: "Node.js", iconName: "nodejs", color: "#339933" },
    { title: "Django", iconName: "django", color: "#092E20" },
    { title: "Flask", iconName: "flask", color: "#ffffff" },
    { title: "HTML5", iconName: "html5", color: "#E34F26" },
    { title: "CSS3", iconName: "css3", color: "#1572B6" },
];

const ROW_3 = [
    { title: "AWS", iconName: "amazonwebservices", color: "#FF9900" },
    { title: "Docker", iconName: "docker", color: "#2496ED" },
    { title: "Git", iconName: "git", color: "#F05032" },
    { title: "MongoDB", iconName: "mongodb", color: "#47A248" },
    { title: "PostgreSQL", iconName: "postgresql", color: "#4169E1" },
    { title: "Arduino", iconName: "arduino", color: "#00979D" },
];

export default function TechGrid({ page }) {
    const isActive = page === 2;
    const [show, setShow] = React.useState(isActive || page === undefined);

    React.useEffect(() => {
        if (isActive) setShow(true);
    }, [isActive]);

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%', // Full height to center content
                pt: sectionSpacing.pt,
                pb: sectionSpacing.py,
                px: sectionSpacing.px,
                overflow: 'hidden', // Hide overflow for marquees
            }}
        >
            <Box sx={{ width: '100%' }}>
                {/* Section Title */}
                <SectionHeader
                    title="Technologies & Tools"
                    subtitle="The arsenal I use to build ideas."
                    mb={6}
                />

                {/* Marquee Rows */}
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <MarqueeRow items={ROW_1} direction="normal" speed="35s" />
                    <MarqueeRow items={ROW_2} direction="reverse" speed="30s" />
                    <MarqueeRow items={ROW_3} direction="normal" speed="38s" />
                </Box>
            </Box>
        </Container>
    );
}
