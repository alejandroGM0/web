import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TiltCard from '../ui/TiltCard';
import SectionHeader from '../ui/SectionHeader';
import { sectionSpacing, cardPadding, contentGap } from '../../config/layout';

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
 * ExperienceGrid component - Individual TiltCards matching About/Contact style
 * Uses TiltCard defaults without overriding base styles
 */
export default function ExperienceGrid({ page }) {
    return (
        <Container
            maxWidth="lg"
            sx={{
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

                {/* Individual TiltCards - Grid spacing handles external margins */}
                <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
                    {EXPERIENCES.map((exp, index) => (
                        <Grid item xs={6} sm={4} key={index}>
                            <TiltCard
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    minHeight: { xs: 180, md: 200 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0, // Remove gap, use explicit margins
                                    textAlign: 'center',
                                }}
                            >
                                {/* Logo - with bottom margin */}
                                <Box
                                    sx={{
                                        width: { xs: 80, md: 100 },
                                        height: { xs: 80, md: 100 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        mb: 2.5,
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <img
                                        src={exp.logo}
                                        alt={exp.company}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            filter: 'brightness(0) invert(1)',
                                            opacity: 0.95,
                                        }}
                                    />
                                </Box>

                                {/* Text Content */}
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'white',
                                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                                            mb: 0.5,
                                        }}
                                    >
                                        {exp.company}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: { xs: '0.8rem', md: '0.9rem' },
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
