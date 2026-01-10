import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    return colors[tech] || '#f97316'; // Default to orange
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
 * Single Project Card Component - Matching reference design
 */
function ProjectCard({ project }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/project/${project.slug}`);
    };

    // Determine badge type
    const badgeType = project.badgeType || project.technologies[0] || 'Project';
    const badgeStyle = getBadgeStyle(badgeType);

    return (
        <TiltCard
            onClick={handleClick}
            sx={{
                width: '100%',
                maxWidth: '400px',
                height: { xs: '420px', md: '480px' },
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                p: 0,
                background: 'rgba(20, 20, 25, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                },
            }}
        >
            {/* Image Area - Takes up ~60% of card */}
            <Box
                sx={{
                    height: '60%',
                    position: 'relative',
                    borderRadius: '16px 16px 0 0',
                    overflow: 'hidden',
                    background: '#0d0d0d',
                }}
            >
                {/* Project Image or Placeholder */}
                {project.heroImage ? (
                    <img
                        src={project.heroImage}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    // Placeholder with code preview style
                    <Box sx={{
                        p: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)',
                    }}>
                        <Box sx={{
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.4)',
                            lineHeight: 1.8,
                        }}>
                            <div style={{ color: '#6b7280' }}>{'// ' + project.title}</div>
                            <div><span style={{ color: '#c084fc' }}>import</span> {'{'}App{'}'} <span style={{ color: '#c084fc' }}>from</span> <span style={{ color: '#86efac' }}>'./app'</span></div>
                            <div><span style={{ color: '#c084fc' }}>const</span> <span style={{ color: '#60a5fa' }}>init</span> = () {'=>'} {'{'}</div>
                            <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#60a5fa' }}>render</span>({'<'}<span style={{ color: '#fbbf24' }}>App</span> {'/>'})</div>
                            <div>{'}'}</div>
                        </Box>
                    </Box>
                )}

                {/* Badge in top-right corner */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.color,
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        border: `1px solid ${badgeStyle.border}`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}
                >
                    {badgeType}
                </Box>
            </Box>

            {/* Content Area */}
            <Box
                sx={{
                    flex: 1,
                    p: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    {/* Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 1,
                            fontSize: '1.15rem',
                        }}
                    >
                        {project.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.55)',
                            fontSize: '0.85rem',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {project.shortDescription}
                    </Typography>
                </Box>

                {/* Tech Tags at bottom with colored borders */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
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
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontWeight: 500,
                                    height: '26px',
                                    '& .MuiChip-label': {
                                        px: 1.5,
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
        </TiltCard>
    );
}

/**
 * Projects Section - Horizontal slider with navigation
 */
export default function Projects({ isMobile, projects, page }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const projectsPerSlide = isMobile ? 1 : 3;
    const totalSlides = Math.ceil(projects.length / projectsPerSlide);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const getVisibleProjects = () => {
        const start = currentSlide * projectsPerSlide;
        return projects.slice(start, start + projectsPerSlide);
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: sectionSpacing.py,
                px: sectionSpacing.px,
            }}
        >
            <Box>
                <SectionHeader
                    title="Featured Projects"
                    subtitle="Explore a collection of high-performance applications built with modern technologies."
                    mb={{ xs: 4, md: 6 }}
                />

                {/* Slider Container */}
                <Box sx={{ position: 'relative' }}>
                    {/* Projects Display */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: { xs: 2, md: 4 },
                            px: { xs: 0, md: 6 },
                            minHeight: { xs: '440px', md: '500px' },
                        }}
                    >
                        {getVisibleProjects().map((project, index) => (
                            <ProjectCard key={`${currentSlide}-${index}`} project={project} />
                        ))}
                    </Box>

                    {/* Navigation Arrows */}
                    {totalSlides > 1 && (
                        <>
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: -10, md: 0 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    bgcolor: 'rgba(249, 115, 22, 0.1)',
                                    border: '1px solid rgba(249, 115, 22, 0.3)',
                                    color: '#f97316',
                                    '&:hover': {
                                        bgcolor: 'rgba(249, 115, 22, 0.2)',
                                        borderColor: 'rgba(249, 115, 22, 0.5)',
                                    },
                                }}
                            >
                                <ArrowBackIosNewIcon />
                            </IconButton>

                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: -10, md: 0 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    bgcolor: 'rgba(249, 115, 22, 0.1)',
                                    border: '1px solid rgba(249, 115, 22, 0.3)',
                                    color: '#f97316',
                                    '&:hover': {
                                        bgcolor: 'rgba(249, 115, 22, 0.2)',
                                        borderColor: 'rgba(249, 115, 22, 0.5)',
                                    },
                                }}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {totalSlides > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1.5,
                                mt: 4,
                            }}
                        >
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    sx={{
                                        width: currentSlide === index ? 24 : 8,
                                        height: 8,
                                        borderRadius: '4px',
                                        bgcolor: currentSlide === index
                                            ? '#f97316'
                                            : 'rgba(255, 255, 255, 0.2)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: currentSlide === index
                                                ? '#f97316'
                                                : 'rgba(255, 255, 255, 0.4)',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
}
