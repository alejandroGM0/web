import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SectionHeader({ title, subtitle, mb = 6, textAlign = 'center' }) {
  return (
    <Box sx={{ mb: mb, textAlign: textAlign, position: 'relative', zIndex: 2 }}>
      <Typography
        variant="h2"
        component="h2"
        className="gradient-text"
        sx={{
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: { xs: '1rem', md: '1.2rem' },
            display: 'block',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
