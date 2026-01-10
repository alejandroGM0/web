import React from 'react';
import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NAV_ITEMS = ['Home', 'About', 'Tech', 'Experience', 'Projects', 'Contact'];

export default function Appbar({ activeSection, onMenuClick }) {
  const theme = useTheme();
  // We can use isMobile here if needed for responsive layout adjustments

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: { xs: '90%', sm: 'fit-content' },
        maxWidth: '1200px',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '8px 16px', sm: '12px 32px' },
        borderRadius: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeSection === index;
          return (
            <Link
              key={item}
              component="button"
              onClick={() => onMenuClick(index)}
              sx={{
                color: isActive ? '#f97316' : 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: { xs: '0.8rem', md: '0.95rem' },
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.2s',
                '&:hover': {
                  color: '#f97316',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              {item}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}