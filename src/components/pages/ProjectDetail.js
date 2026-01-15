import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GridViewIcon from '@mui/icons-material/GridView';
import LayersIcon from '@mui/icons-material/Layers';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MapIcon from '@mui/icons-material/Map';
import MemoryIcon from '@mui/icons-material/Memory';
import SchoolIcon from '@mui/icons-material/School';
import TiltCard from '../ui/TiltCard';
import { PrimaryButton, SecondaryButton } from '../ui/Buttons';

// Section Number Badge - Portfolio Orange Style
function SectionNumber({ number, variant = 'default' }) {
    const styles = {
        default: { bg: 'rgba(249, 115, 22, 0.15)', text: 'var(--color-primary)', border: 'rgba(249, 115, 22, 0.3)' },
        danger: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
        success: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' }
    };
    const s = styles[variant];
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: '8px',
            backgroundColor: s.bg, color: s.text, fontWeight: 700,
            border: `1px solid ${s.border}`, fontSize: '0.875rem'
        }}>{number}</Box>
    );
}

// Feature Card - Portfolio Style
function FeatureCard({ icon, title, description, color }) {
    const colors = {
        blue: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
        purple: { bg: 'rgba(168, 85, 247, 0.1)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.2)' },
        emerald: { bg: 'rgba(16, 185, 129, 0.1)', text: '#34d399', border: 'rgba(16, 185, 129, 0.2)' },
        amber: { bg: 'rgba(249, 115, 22, 0.1)', text: 'var(--color-primary)', border: 'rgba(249, 115, 22, 0.2)' },
    };
    const c = colors[color] || colors.amber;

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{
                p: 1, borderRadius: '8px', backgroundColor: c.bg, color: c.text,
                border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{icon}</Box>
            <Box>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', mb: 0.5 }}>{title}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', lineHeight: 1.6 }}>{description}</Typography>
            </Box>
        </Box>
    );
}

export default function ProjectDetail({ projects = [] }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeCodeTab, setActiveCodeTab] = useState(0);

    const project = projects.find(p => p.slug === slug);
    const currentIndex = useMemo(() => projects.findIndex(p => p.slug === slug), [projects, slug]);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    // Build slides
    const slides = useMemo(() => {
        if (!project) return [];
        const prefix = process.env.PUBLIC_URL || '';
        const arr = [];
        if (project.coverImage) {
            const url = project.coverImage.startsWith('http') ? project.coverImage : `${prefix}${project.coverImage}`;
            arr.push({ url, caption: project.title });
        }
        if (project.images?.length > 0) {
            project.images.forEach((img, i) => {
                const isObj = typeof img === 'object';
                const rawUrl = isObj ? img.url : img;
                const caption = isObj ? img.caption : `Screenshot ${i + 1}`;
                const url = rawUrl.startsWith('http') ? rawUrl : `${prefix}${rawUrl}`;
                arr.push({ url, caption });
            });
        }
        return arr;
    }, [project]);

    // CRITICAL: Set data-page attribute FIRST - this triggers CSS rules in App.css
    // Using useLayoutEffect ensures this happens synchronously before paint
    React.useLayoutEffect(() => {
        // Set attribute IMMEDIATELY - App.css rules will activate instantly
        document.body.setAttribute('data-page', 'project-detail');

        // Also force scroll to top
        window.scrollTo(0, 0);

        return () => {
            // Cleanup when leaving project detail
            document.body.removeAttribute('data-page');
        };
    }, [slug]);

    useEffect(() => { setCurrentSlide(0); }, [slug]);

    const changeSlide = (dir) => {
        let idx = currentSlide + dir;
        if (idx < 0) idx = slides.length - 1;
        if (idx >= slides.length) idx = 0;
        setCurrentSlide(idx);
    };

    if (!project) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>Project not found</Typography>
                <SecondaryButton startIcon={<ArrowBackIcon />} onClick={() => navigate('/#Projects')}>Back to Home</SecondaryButton>
            </Container>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'var(--color-background)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* NAV - Glassmorphism Style */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button startIcon={<ArrowBackIcon sx={{ transition: 'transform 0.2s' }} />} onClick={() => navigate('/#Projects')}
                            sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'none', fontSize: '0.875rem', fontWeight: 500, '&:hover': { color: 'white', backgroundColor: 'transparent', '& .MuiSvgIcon-root': { transform: 'translateX(-4px)' } } }}>
                            Back to Portfolio
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                                onClick={() => prevProject && navigate(`/project/${prevProject.slug}`)}
                                disabled={!prevProject}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '10px',
                                    backgroundColor: prevProject ? 'rgba(255,255,255,0.05)' : 'transparent',
                                    border: prevProject ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                                    color: prevProject ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(249, 115, 22, 0.15)',
                                        borderColor: 'rgba(249, 115, 22, 0.3)',
                                        color: 'var(--color-primary)',
                                        transform: 'translateX(-2px)'
                                    },
                                    '&.Mui-disabled': {
                                        color: 'rgba(255,255,255,0.15)',
                                    }
                                }}
                                title="Previous Project"
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => nextProject && navigate(`/project/${nextProject.slug}`)}
                                disabled={!nextProject}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '10px',
                                    backgroundColor: nextProject ? 'rgba(255,255,255,0.05)' : 'transparent',
                                    border: nextProject ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                                    color: nextProject ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(249, 115, 22, 0.15)',
                                        borderColor: 'rgba(249, 115, 22, 0.3)',
                                        color: 'var(--color-primary)',
                                        transform: 'translateX(2px)'
                                    },
                                    '&.Mui-disabled': {
                                        color: 'rgba(255,255,255,0.15)',
                                    }
                                }}
                                title="Next Project"
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* MAIN */}
            <Box component="main" sx={{ flexGrow: 1, pt: '112px', pb: 10 }}>
                <Container maxWidth="lg">
                    {/* HEADER - Full Width */}
                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            {project.badgeType && (
                                <Chip label={project.badgeType} size="small" sx={{ backgroundColor: 'rgba(249, 115, 22, 0.15)', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(249, 115, 22, 0.3)', height: 24 }} />
                            )}
                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', fontFamily: 'monospace' }}>2026</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, letterSpacing: '-0.02em', mb: 3, fontSize: { xs: '2rem', md: '2.75rem' } }}>{project.title}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '48rem' }}>{project.shortDescription}</Typography>
                    </Box>

                    {/* GRID - Slider aligned with Sidebar */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '8fr 4fr' }, gap: 6 }}>

                        {/* LEFT COLUMN */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                            {/* IMAGE GALLERY - TiltCard Style */}
                            {slides.length > 0 && (
                                <TiltCard sx={{ overflow: 'hidden', position: 'relative', '&:hover .gallery-nav': { opacity: 1 } }}>
                                    <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                                        <Box component="img" src={slides[currentSlide]?.url} alt={slides[currentSlide]?.caption}
                                            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }} />
                                        {slides.length > 1 && (<>
                                            <IconButton className="gallery-nav" onClick={() => changeSlide(-1)} sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', opacity: 0, transition: 'all 0.2s', '&:hover': { backgroundColor: 'var(--color-primary)', color: 'white' } }}><ChevronLeftIcon /></IconButton>
                                            <IconButton className="gallery-nav" onClick={() => changeSlide(1)} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', opacity: 0, transition: 'all 0.2s', '&:hover': { backgroundColor: 'var(--color-primary)', color: 'white' } }}><ChevronRightIcon /></IconButton>
                                        </>)}
                                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', p: 3, pt: 6 }}>
                                            <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '1rem' }}>{slides[currentSlide]?.caption}</Typography>
                                        </Box>
                                    </Box>
                                    {slides.length > 1 && (
                                        <Box sx={{ display: 'flex', gap: 1, p: 1.5, backgroundColor: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
                                            {slides.map((slide, i) => (
                                                <Box key={i} onClick={() => setCurrentSlide(i)} sx={{ flexShrink: 0, width: 80, height: 50, borderRadius: '8px', overflow: 'hidden', border: i === currentSlide ? '2px solid var(--color-primary)' : '2px solid transparent', opacity: i === currentSlide ? 1 : 0.5, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { opacity: 1 } }}>
                                                    <Box component="img" src={slide.url} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </TiltCard>
                            )}

                            {/* SECTION 1: DESCRIPTION */}
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                    <SectionNumber number="1" />
                                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>Project Description</Typography>
                                </Box>
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1rem' }}>
                                    {project.shortDescription}
                                </Typography>

                                {/* MARKDOWN CONTENT */}
                                {project.content && (
                                    <Box sx={{
                                        mt: 4,
                                        '& p': { lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', mb: 2 },
                                        '& h1, & h2': { color: 'white', fontWeight: 700, mt: 4, mb: 2, fontSize: '1.25rem' },
                                        '& h3': { color: 'var(--color-primary)', fontWeight: 600, mt: 3, mb: 1.5, fontSize: '1.1rem' },
                                        '& ul, & ol': { color: 'rgba(255,255,255,0.7)', pl: 3, mb: 2 },
                                        '& li': { mb: 0.5 },
                                        '& strong': { color: 'white', fontWeight: 600 },
                                        '& blockquote': { borderLeft: '4px solid var(--color-primary)', pl: 2, fontStyle: 'italic', my: 2 }
                                    }}>
                                        <ReactMarkdown>{project.content}</ReactMarkdown>
                                    </Box>
                                )}
                            </Box>

                            {/* KEY FEATURES - TiltCard Style */}
                            <TiltCard sx={{ p: { xs: 3, md: 4 } }}>
                                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1rem', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <GridViewIcon sx={{ color: 'var(--color-primary)' }} /> Key Features
                                </Typography>
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                                    {project.features ? (
                                        project.features.map((feature, index) => {
                                            const Icons = {
                                                GridView: <GridViewIcon />,
                                                Layers: <LayersIcon />,
                                                AccountTree: <AccountTreeIcon />,
                                                Map: <MapIcon />
                                            };
                                            return (
                                                <FeatureCard
                                                    key={index}
                                                    icon={Icons[feature.icon] || <GridViewIcon />}
                                                    title={feature.title}
                                                    description={feature.description}
                                                    color={feature.color}
                                                />
                                            );
                                        })
                                    ) : (
                                        <>
                                            <FeatureCard icon={<GridViewIcon />} title="Custom Architecture" description={`Built with ${project.technologies?.[0] || 'modern tech'}`} color="blue" />
                                            <FeatureCard icon={<LayersIcon />} title="Optimized Performance" description="High-performance implementation" color="purple" />
                                            <FeatureCard icon={<AccountTreeIcon />} title="Scalable Design" description="Built for growth and maintainability" color="emerald" />
                                            <FeatureCard icon={<MapIcon />} title="Modern Patterns" description="Following best practices" color="amber" />
                                        </>
                                    )}
                                </Box>
                            </TiltCard>

                            {/* SECTION 2: CHALLENGE */}
                            {project.challenge && (
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                        <SectionNumber number="2" variant="danger" />
                                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>Technical Difficulties</Typography>
                                    </Box>
                                    <TiltCard sx={{ p: { xs: 3, md: 4 }, borderLeft: '4px solid #ef4444' }}>
                                        <Typography sx={{ color: '#f87171', fontWeight: 600, fontSize: '1rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <MemoryIcon /> The Challenge
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>{project.challenge}</Typography>
                                    </TiltCard>
                                </Box>
                            )}

                            {/* SECTION 3: SOLUTION */}
                            {project.solution && (
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                        <SectionNumber number="3" variant="success" />
                                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>The Solution</Typography>
                                    </Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, mb: 4 }}>{project.solution}</Typography>

                                    {/* Solution Features Grid */}
                                    {project.solutionFeatures && (
                                        <TiltCard sx={{ p: { xs: 3, md: 4 }, mt: 4 }}>
                                            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1rem', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <RocketLaunchIcon sx={{ color: '#10b981' }} /> Implementation Details
                                            </Typography>
                                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                                                {project.solutionFeatures.map((feature, index) => {
                                                    const Icons = {
                                                        GridView: <GridViewIcon />,
                                                        Layers: <LayersIcon />,
                                                        AccountTree: <AccountTreeIcon />,
                                                        Map: <MapIcon />,
                                                        Memory: <MemoryIcon />,
                                                        RocketLaunch: <RocketLaunchIcon />,
                                                        Code: <CodeIcon />
                                                    };
                                                    return (
                                                        <FeatureCard
                                                            key={index}
                                                            icon={Icons[feature.icon] || <GridViewIcon />}
                                                            title={feature.title}
                                                            description={feature.description}
                                                            color={feature.color}
                                                        />
                                                    );
                                                })}
                                            </Box>
                                        </TiltCard>
                                    )}

                                    {/* Dynamic Code Block with Tabs */}
                                    {project.codeSnippets && project.codeSnippets.length > 0 && (
                                        <TiltCard sx={{ overflow: 'hidden', mt: 4 }}>
                                            <Box sx={{ backgroundColor: 'rgba(0,0,0,0.3)', px: 2, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography sx={{ color: '#34d399', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CodeIcon sx={{ fontSize: 14 }} /> Key Algorithms
                                                </Typography>
                                                <Box sx={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '8px', p: 0.5, border: '1px solid rgba(255,255,255,0.1)' }}>
                                                    {project.codeSnippets.map((snippet, idx) => (
                                                        <Button
                                                            key={idx}
                                                            onClick={() => setActiveCodeTab(idx)}
                                                            sx={{
                                                                px: 1.5,
                                                                py: 0.5,
                                                                fontSize: '0.75rem',
                                                                fontWeight: 500,
                                                                borderRadius: '6px',
                                                                minWidth: 'auto',
                                                                backgroundColor: activeCodeTab === idx ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                                color: activeCodeTab === idx ? 'white' : 'rgba(255,255,255,0.5)',
                                                                '&:hover': { color: 'white' }
                                                            }}
                                                        >
                                                            {snippet.label}
                                                        </Button>
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box sx={{ p: 3, backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                                                    {project.codeSnippets[activeCodeTab || 0].description}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ p: 3, backgroundColor: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', fontSize: '0.8rem', color: '#60a5fa', overflowX: 'auto' }}>
                                                <pre style={{ margin: 0 }}>
                                                    {project.codeSnippets[activeCodeTab || 0].code}
                                                </pre>
                                            </Box>
                                        </TiltCard>
                                    )}
                                </Box>
                            )}
                        </Box>

                        {/* RIGHT COLUMN - SIDEBAR */}
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 3 }}>

                                {/* PROJECT INFO - TiltCard Style */}
                                <TiltCard sx={{ overflow: 'hidden' }}>
                                    <Box sx={{ backgroundColor: 'rgba(0,0,0,0.2)', px: 3, py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project Info</Typography>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', pb: 1.5 }}>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Role</Typography>
                                            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{project.role || 'Developer'}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', pb: 1.5 }}>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Timeline</Typography>
                                            <Typography sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>{project.devTime || 'N/A'}</Typography>
                                        </Box>

                                        {/* Tech Stack */}
                                        <Box sx={{ pt: 1 }}>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1.5 }}>Tech Stack</Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {project.technologies?.map((tech, i) => (
                                                    <Chip key={i} label={tech} size="small" sx={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', border: '1px solid rgba(249, 115, 22, 0.25)', height: 28 }} />
                                                ))}
                                            </Box>
                                        </Box>

                                        {/* Actions */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 2 }}>
                                            {(project.demoUrl || project.liveUrl) && (
                                                <PrimaryButton startIcon={<RocketLaunchIcon />} href={project.demoUrl || project.liveUrl} target="_blank" fullWidth sx={{ py: 1.5 }}>Play Demo</PrimaryButton>
                                            )}
                                            {project.githubUrl && (
                                                <SecondaryButton startIcon={<CodeIcon />} href={project.githubUrl} target="_blank" fullWidth sx={{ py: 1.5 }}>Source Code</SecondaryButton>
                                            )}
                                        </Box>
                                    </Box>
                                </TiltCard>

                                {/* KEY TAKEAWAY - TiltCard Style */}
                                {project.keyLearning && (
                                    <TiltCard sx={{ p: 3 }}>
                                        <Typography sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.75rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            <SchoolIcon sx={{ fontSize: '0.875rem' }} /> Key Takeaway
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontStyle: 'italic', lineHeight: 1.7 }}>"{project.keyLearning}"</Typography>
                                    </TiltCard>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* FOOTER */}
            <Box component="footer" sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'var(--color-background)', py: 4, mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>© 2026 Portfolio</Typography>
                </Container>
            </Box>
        </Box>
    );
}
