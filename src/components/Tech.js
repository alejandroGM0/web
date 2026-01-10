import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SectionHeader from './ui/SectionHeader';
import { sectionSpacing } from '../config/layout';

// Technology icons/names for the marquee
const TECHNOLOGIES = [
    { name: 'JavaScript', icon: '⚡' },
    { name: 'Python', icon: '🐍' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Django', icon: '🎸' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '📦' },
    { name: 'AWS', icon: '☁️' },
    { name: 'C/C++', icon: '💻' },
    { name: 'ROS', icon: '🤖' },
    { name: 'Raspberry Pi', icon: '🍓' },
];

/**
 * Tech section component
 */
export default function Tech({ page }) {
    return (
        <Container maxWidth="lg" sx={{ py: sectionSpacing.py, px: sectionSpacing.px }}>
            <SectionHeader
                title="Tech Stack"
                subtitle="Technologies I work with"
                mb={6}
            />

            {/* Marquee container */}
            <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                <Box
                    className="marquee-content"
                    sx={{
                        display: 'flex',
                        gap: 4,
                        animation: 'marquee 20s linear infinite',
                        '@keyframes marquee': {
                            '0%': { transform: 'translateX(0%)' },
                            '100%': { transform: 'translateX(-50%)' }
                        }
                    }}
                >
                    {/* Double the items for seamless loop */}
                    {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                padding: '12px 24px',
                                borderRadius: '50px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    borderColor: 'rgba(249, 115, 22, 0.3)',
                                }
                            }}
                        >
                            <Typography sx={{ fontSize: '1.5rem' }}>{tech.icon}</Typography>
                            <Typography sx={{ color: 'white', fontWeight: 500 }}>{tech.name}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
