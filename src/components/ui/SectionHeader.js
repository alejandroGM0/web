import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * SectionHeader - Consistent section title styling
 */
export default function SectionHeader({ title, subtitle, align = 'center', mb = 4 }) {
    return (
        <Box sx={{ textAlign: align, mb }}>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    color: 'white',
                    mb: subtitle ? 1.5 : 0,
                }}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    sx={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.1rem',
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
}
