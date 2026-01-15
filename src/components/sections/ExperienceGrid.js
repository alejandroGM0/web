import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import TiltCard from '../ui/TiltCard';
import SectionHeader from '../ui/SectionHeader';
import { sectionSpacing } from '../../config/layout';

// Import logos
import gtLogo from '../../images/gt_logo2.png';
import nHLogo from '../../images/logo.png';
import logo_cpepa from '../../images/logo_cpepa.png';
import logo_fd from '../../images/logo-futuro-digital.png';
import fiver_logo from '../../images/fiver_logo.png';
import upwork_logo from '../../images/Upwork-Logo.png';

const EXPERIENCES = [
    { company: "Grant Thornton", role: "BACKEND DEVELOPER", logo: gtLogo },
    { company: "National Highways", role: "BACKEND DEVELOPER", logo: nHLogo },
    { company: "CPEPA", role: "WEB DEVELOPER", logo: logo_cpepa },
    { company: "Futuro Digital", role: "WEB DEVELOPER", logo: logo_fd },
    { company: "Fiverr", role: "FREELANCE DEVELOPER", logo: fiver_logo },
    { company: "Upwork", role: "FREELANCE DEVELOPER", logo: upwork_logo },
];

export default function ExperienceGrid() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start', // Top aligned for consistent header position
                px: sectionSpacing.px,
                pt: sectionSpacing.pt, // Use standardized top padding
                pb: sectionSpacing.py,
            }}
        >
            {/* Header - Using SectionHeader component */}
            <SectionHeader
                title={
                    <>
                        Enterprises I've{' '}
                        <Box
                            component="span"
                            sx={{
                                background: 'linear-gradient(to right, #45A29E, #66FCF1)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Partnered With
                        </Box>
                    </>
                }
                subtitle="Delivering high-impact technical solutions and scalable architectures for global organizations."
                mb={6}
            />

            {/* Cards Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: { xs: 2, sm: 2.5, md: 3 },
                    width: '100%',
                    maxWidth: 1100,
                }}
            >
                {EXPERIENCES.map((exp, index) => (
                    <TiltCard
                        key={index}
                        sx={{
                            p: 3,
                            height: { xs: 150, sm: 165, md: 180 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5,
                            textAlign: 'center',
                            backgroundColor: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                        }}
                    >
                        {/* Logo Container - 100% width to ensure horizontal centering */}
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: 80, md: 100 },
                                    height: { xs: 45, md: 55 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 1,
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                }}
                            >
                                <img
                                    src={exp.logo}
                                    alt={exp.company}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'brightness(0) invert(1)',
                                        opacity: 0.9,
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Text Content */}
                        <Box sx={{ width: '100%' }}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: 'white',
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    mb: 0.75,
                                }}
                            >
                                {exp.company}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,0.5)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {exp.role}
                            </Typography>
                        </Box>
                    </TiltCard>
                ))}
            </Box>
        </Container>

    );
}
