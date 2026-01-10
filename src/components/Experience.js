import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TiltCard from './ui/TiltCard';

/**
 * Experience card component - Individual experience display
 */
export default function Experience(props) {
    return (
        <TiltCard
            sx={{
                p: { xs: 2, md: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
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
                    p: 2,
                }}
            >
                <img
                    src={props.logo}
                    alt={props.company}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)',
                    }}
                />
            </Box>
            <Box>
                <Typography
                    variant="caption"
                    sx={{
                        color: '#f97316',
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        lineHeight: 1.2,
                        display: 'block',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    {props.role}
                </Typography>
            </Box>
        </TiltCard>
    );
}
