import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import LaunchIcon from '@mui/icons-material/Launch';
import TiltCard from '../ui/TiltCard';
import loadProjectsAsync from '../../utils/projectLoader';

/**
 * ProjectDetail - Full page view matching reference design
 */
export default function ProjectDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjectsAsync().then((projects) => {
            const found = projects.find(p => p.slug === slug);
            setProject(found);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: 'white' }}>
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (!project) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Project not found
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/#Projects')}
                    sx={{ color: 'var(--color-primary)' }}
                >
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'var(--color-background)',
            py: 4
        }}>
            <Container maxWidth="lg">
                {/* Top Bar: Back to Projects + Code Button */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 5
                }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/#Projects')}
                        sx={{
                            color: 'rgba(255,255,255,0.7)',
                            textTransform: 'none',
                            '&:hover': { color: 'white' }
                        }}
                    >
                        Back to Projects
                    </Button>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {project.demoUrl && (
                            <Button
                                variant="contained"
                                startIcon={<LaunchIcon />}
                                href={project.demoUrl}
                                target="_blank"
                                sx={{
                                    bgcolor: 'var(--color-primary)',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        bgcolor: 'var(--color-primary-dark)',
                                    }
                                }}
                            >
                                Live Demo
                            </Button>
                        )}

                        {project.githubUrl && (
                            <Button
                                variant="outlined"
                                startIcon={<CodeIcon />}
                                href={project.githubUrl}
                                target="_blank"
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        borderColor: 'var(--color-primary)',
                                        background: 'rgba(249, 115, 22, 0.1)'
                                    }
                                }}
                            >
                                Code
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Two Column Layout */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 320px' },
                    gap: 4
                }}>
                    {/* Left Column - Main Content */}
                    <Box>
                        {/* Project Gallery */}
                        {project.images && project.images.length > 0 && (
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                                    Gallery
                                </Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: 2
                                }}>
                                    {project.images.map((img, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={img}
                                            alt={`Project screenshot ${index + 1}`}
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.02)',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* The Challenge */}
                        <Box sx={{ mb: 5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: 'var(--color-primary)'
                                }} />
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                                    The Challenge
                                </Typography>
                            </Box>
                            <Typography sx={{
                                color: 'rgba(255,255,255,0.7)',
                                lineHeight: 1.8,
                                fontSize: '0.95rem'
                            }}>
                                {project.challenge ||
                                    `Building a modern, scalable application using ${project.technologies?.slice(0, 2).join(' and ') || 'cutting-edge technologies'} that meets real-world requirements while maintaining clean architecture and optimal performance.`
                                }
                            </Typography>
                        </Box>

                        {/* The Solution */}
                        <Box sx={{ mb: 5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: 'var(--color-primary)'
                                }} />
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                                    The Solution
                                </Typography>
                            </Box>
                            <Typography sx={{
                                color: 'rgba(255,255,255,0.7)',
                                lineHeight: 1.8,
                                fontSize: '0.95rem'
                            }}>
                                {project.solution ||
                                    `Implemented using modern development practices with ${project.technologies?.slice(0, 3).join(', ') || 'industry-standard frameworks'}, focusing on clean code, reusability, and maintainability. The solution emphasizes performance optimization and user experience.`
                                }
                            </Typography>
                        </Box>

                        {/* Technologies */}
                        <Box>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                                Technologies
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {project.technologies?.map((tech, i) => (
                                    <Chip
                                        key={i}
                                        label={tech}
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            color: 'rgba(255,255,255,0.8)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '8px',
                                            px: 1,
                                            '&:hover': {
                                                borderColor: 'var(--color-primary)',
                                                background: 'rgba(249, 115, 22, 0.1)',
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Column - Sidebar */}
                    <Box>
                        <TiltCard sx={{ p: 3 }}>
                            {/* Project Stats */}
                            <Typography variant="h6" sx={{
                                color: 'white',
                                fontWeight: 600,
                                mb: 3,
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Project Stats
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                        Dev Time
                                    </Typography>
                                    <Typography sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                                        {project.devTime || '3 Months'}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                        Role
                                    </Typography>
                                    <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>
                                        {project.role || 'Full Stack Developer'}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                        Battery
                                    </Typography>
                                    <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>
                                        {project.battery || '2.5 Hours'}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Key Learning */}
                            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                <Typography sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Key Learning
                                </Typography>
                                <Typography sx={{
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.7
                                }}>
                                    {project.keyLearning ||
                                        `Deepened understanding of ${project.technologies?.[0] || 'software architecture'} and improved problem-solving skills through real-world challenges.`
                                    }
                                </Typography>
                            </Box>
                        </TiltCard>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
