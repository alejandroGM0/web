import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Fade from '@mui/material/Fade';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TiltCard from '../ui/TiltCard';
import SectionHeader from '../ui/SectionHeader';
import { sectionSpacing, cardPadding } from '../../config/layout';

// Import your original logos
import gtLogo from '../../images/gt_logo2.png';
import nHLogo from '../../images/logo.png';
import logo_cpepa from '../../images/logo_cpepa.png';
import logo_fd from '../../images/logo-futuro-digital.png';
import fiver_logo from '../../images/fiver_logo.png';
import upwork_logo from '../../images/Upwork-Logo.png';

/**
 * Experience data - Your original companies
 */
const EXPERIENCES = [
    { company: "GT", role: "Backend Developer", logo: gtLogo },
    { company: "NH", role: "Backend Developer", logo: nHLogo },
    { company: "CPEPA", role: "Web Developer", logo: logo_cpepa },
    { company: "Futuro Digital", role: "Web Developer", logo: logo_fd },
    { company: "Fiverr", role: "Freelance Developer", logo: fiver_logo },
    { company: "Upwork", role: "Freelance Developer", logo: upwork_logo },
];

/**
 * ExperienceGrid component - Compact card layout for experiences
 */
export default function ExperienceGrid({ page }) {
    const isActive = page === 3;

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
            <Box sx={{ textAlign: 'center', width: '100%' }}>
                <SectionHeader
                    title={
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <CalendarMonthIcon sx={{ color: '#f97316', fontSize: 28 }} />
                            Enterprises I've Worked With
                        </Box>
                    }
                    subtitle="Proud to have contributed to these organizations"
                    mb={4}
                />

                {/* Experience Cards - 6 in a row on desktop */}
                <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} rowGap={{ xs: 3, md: 5 }} justifyContent="center">
                    {EXPERIENCES.map((exp, index) => (
                        <Grid item xs={6} sm={4} md={4} key={index}>
                            <TiltCard
                                sx={{
                                    p: { xs: 2, md: 3 },
                                    height: '100%',
                                    minHeight: { xs: '130px', md: '140px' },
                                    display: 'flex',
                                    flexDirection: 'column', // Always vertical
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    gap: 2,
                                    '&:hover': {
                                        borderColor: 'rgba(249, 115, 22, 0.4)',
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 55, sm: 65, md: 70 },
                                        height: { xs: 55, sm: 65, md: 70 },
                                        borderRadius: '16px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        p: 2,
                                        mb: 1, // Margin bottom to push text down
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
                                        }}
                                    />
                                </Box>

                                {/* Content Wrapper */}
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: '#f97316', // Orange highlight
                                            fontWeight: 700,
                                            fontSize: { xs: '1rem', md: '1.2rem' },
                                            lineHeight: 1.2,
                                            display: 'block',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {exp.role}
                                    </Typography>
                                </Box>
                            </TiltCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
