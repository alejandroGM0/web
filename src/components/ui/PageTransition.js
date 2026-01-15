import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

/**
 * Page transition - simplified to prevent double scrollbar flashes
 * The key prop on the box causes React to remount on route change,
 * which can cause visual artifacts. This version is safer.
 */
export default function PageTransition({ children }) {
    const location = useLocation();
    const isProjectDetail = location.pathname.includes('/project/');

    return (
        <Box
            sx={{
                background: 'var(--color-background, #0a0a0f)',
                minHeight: '100vh',
                // Disable animation for project detail to prevent scroll flash
                ...(isProjectDetail ? {} : {
                    animation: 'pageEnter 0.4s ease-out',
                }),
                '@keyframes pageEnter': {
                    '0%': {
                        opacity: 0.9,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
            }}
        >
            {children}
        </Box>
    );
}
