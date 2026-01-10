import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import SectionHeader from '../ui/SectionHeader';
import TiltCard from '../ui/TiltCard';
import { sectionSpacing, cardPadding } from '../../config/layout';

/**
 * Single Project Card Component - Using TiltCard for consistency
 */
function ProjectCard({ project }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/project/${project.slug}`);
    };

    // Determine badge label based on project tags or default
    const badgeLabel = project.technologies[0] || 'Project';

    return (
        <TiltCard
            onClick={handleClick}
            sx={{
                width: '100%',
                height: { xs: '320px', md: '380px' },
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                p: 0,
            }}
        >
            {/* Top Image/Gradient Area (~55%) - Dark Theme Style */}
            <Box
                sx={{
                    height: '55%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    position: 'relative',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px 16px 0 0',
                }}
            >
                {/* Badge Tag */}
                <Box
                    sx={{
                        backgroundColor: 'rgba(249, 115, 22, 0.15)',
                        color: '#f97316',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                    }}
                >
                    {badgeLabel}
                </Box>
            </Box>

            {/* Bottom Content Area */}
            <Box
                sx={{
                    flex: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 1,
                            fontSize: '1.25rem',
                        }}
                    >
                        {project.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {project.shortDescription}
                    </Typography>
                </Box>

                {/* Tech Tags at bottom */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.slice(0, 2).map((tech, index) => (
                        <Chip
                            key={index}
                            label={tech}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.7rem',
                                height: '24px',
                                borderRadius: '4px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </TiltCard>
    );
}

/**
 * Projects section component
 * Horizontal layout matching reference
 */
export default function Projects({ isMobile, projects = [], page }) {
    const isActive = page === 4;
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
                justifyContent: 'center',
                py: sectionSpacing.py,
                px: sectionSpacing.px,
            }}
        >
            <Fade in={show} timeout={800}>
                <Box>
                    <SectionHeader
                        title="Featured Projects"
                        subtitle="Click a card for details."
                        mb={{ xs: 3, md: 6 }}
                    />

                    {/* Horizontal Grid Layout */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: { xs: 2, md: 3 },
                            px: { xs: 0, md: 4 },
                            width: '100%',
                            pb: 2,
                        }}
                    >
                        {projects.slice(0, 3).map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </Box>
                </Box>
            </Fade>
        </Container>
    );
}
