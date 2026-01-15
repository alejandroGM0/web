import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import SectionHeader from '../ui/SectionHeader';
import TiltCard from '../ui/TiltCard';
import { sectionSpacing } from '../../config/layout';

// Tech badge colors based on technology name
const getTechColor = (tech) => {
    const colors = {
        'React': '#61dafb',
        'Node.js': '#68a063',
        'Socket.io': '#010101',
        'Python': '#3776ab',
        'Django': '#092e20',
        'React Native': '#61dafb',
        'PostGIS': '#336791',
        'Discord.py': '#5865f2',
        'MongoDB': '#47a248',
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Next.js': '#000000',
        'PostgreSQL': '#336791',
        'Redis': '#dc382d',
        'Docker': '#2496ed',
        'AWS': '#ff9900',
        'Firebase': '#ffca28',
        'GraphQL': '#e535ab',
    };
    return colors[tech] || '#f97316';
};

// Badge type colors
const getBadgeStyle = (type) => {
    const styles = {
        'Full Stack': { bg: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', border: 'rgba(74, 222, 128, 0.3)' },
        'Frontend': { bg: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', border: 'rgba(96, 165, 250, 0.3)' },
        'Backend': { bg: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', border: 'rgba(251, 146, 60, 0.3)' },
        'Bot': { bg: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa', border: 'rgba(167, 139, 250, 0.3)' },
        'Live': { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
    };
    return styles[type] || { bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: 'rgba(249, 115, 22, 0.3)' };
};

/**
 * Compact Project Card for 2x2 Grid
 */
function ProjectCard({ project, index, isVisible }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/project/${project.slug}`);
    };

    const badgeType = project.badgeType || project.technologies[0] || 'Project';
    const badgeStyle = getBadgeStyle(badgeType);

    return (
        <Box
            sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: `${index * 100}ms`,
                height: '100%',
            }}
        >
            <TiltCard
                onClick={handleClick}
                sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '220px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 0,
                    // NO overrides - inherits TiltCard defaults
                }}
            >
                {/* Image Area - 50% height */}
                <Box
                    sx={{
                        height: '50%',
                        minHeight: '100px',
                        position: 'relative',
                        borderRadius: '16px 16px 0 0',
                        overflow: 'hidden',
                        background: '#0d0d0d',
                    }}
                >
                    {project.heroImage ? (
                        <img
                            src={`${process.env.PUBLIC_URL}${project.heroImage}`}
                            alt={project.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Box sx={{
                            p: 1.5,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)',
                        }}>
                            <Box sx={{
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '0.6rem',
                                color: 'rgba(255,255,255,0.4)',
                                lineHeight: 1.6,
                            }}>
                                <div style={{ color: '#6b7280' }}>{'// ' + project.title}</div>
                                <div><span style={{ color: '#c084fc' }}>import</span> {'{'}App{'}'} <span style={{ color: '#c084fc' }}>from</span> <span style={{ color: '#86efac' }}>'./app'</span></div>
                                <div><span style={{ color: '#60a5fa' }}>render</span>({'<'}<span style={{ color: '#fbbf24' }}>App</span> {'/>'})</div>
                            </Box>
                        </Box>
                    )}

                    {/* Badge */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: badgeStyle.bg,
                            color: badgeStyle.color,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            border: `1px solid ${badgeStyle.border}`,
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                        }}
                    >
                        {badgeType}
                    </Box>
                </Box>

                {/* Content Area - 50% height */}
                <Box
                    sx={{
                        flex: 1,
                        p: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 0.5,
                                fontSize: '0.95rem',
                                lineHeight: 1.2,
                            }}
                        >
                            {project.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: '0.75rem',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {project.shortDescription}
                        </Typography>
                    </Box>

                    {/* Tech Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {project.technologies?.slice(0, 3).map((tech, i) => {
                            const color = getTechColor(tech);
                            return (
                                <Chip
                                    key={i}
                                    label={tech}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'transparent',
                                        color: color,
                                        border: `1px solid ${color}`,
                                        borderRadius: '4px',
                                        fontSize: '0.6rem',
                                        fontWeight: 500,
                                        height: '20px',
                                        '& .MuiChip-label': {
                                            px: 1,
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </TiltCard>
        </Box>
    );
}

/**
 * Projects Section - 2x2 Grid Layout (All projects visible)
 */
export default function Projects({ isMobile, projects, page }) {
    const isDebug = false;
    const [isVisible, setIsVisible] = useState(false);
    const hasAnimatedRef = React.useRef(false);

    // Trigger animation only once when first entering Projects section
    useEffect(() => {
        if (page === 4 && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, [page]);

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: sectionSpacing.py,
                px: sectionSpacing.px,
                height: '100%',
                position: 'relative', // Context for debug absolute
            }}
        >
            {/* DEBUG OVERLAY - TEMPORARY */}
            {isDebug && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                        background: 'rgba(255, 0, 0, 0.8)',
                        color: 'white',
                        p: 1,
                        fontSize: '12px',
                        pointerEvents: 'none',
                        maxWidth: '300px',
                    }}
                >
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                        DEBUG INFO:
                    </Typography>
                    <div>Projects loaded: {projects.length}</div>
                    <div>List: {projects.map(p => p.title).join(', ')}</div>
                </Box>
            )}

            <SectionHeader
                title="Featured Projects"
                subtitle="High-performance applications built with modern technologies."
                mb={{ xs: 2, md: 3 }}
            />

            {/* 2x2 Grid - All projects visible */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)',
                    },
                    gap: { xs: 1.5, md: 2 },
                    flex: 1,
                    maxHeight: { xs: 'auto', md: '400px' },
                }}
            >
                {projects.slice(0, 4).map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} isVisible={isVisible} />
                ))}
            </Box>
        </Container>
    );
}
