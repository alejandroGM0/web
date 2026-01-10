import React from 'react';
import Button from '@mui/material/Button';

/**
 * PrimaryButton - Orange gradient button
 */
export function PrimaryButton({ children, ...props }) {
    return (
        <Button
            {...props}
            sx={{
                background: 'linear-gradient(90deg, #f97316, #ea580c)',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                padding: '12px 32px',
                borderRadius: '50px',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    background: 'linear-gradient(90deg, #ea580c, #f97316)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(249, 115, 22, 0.4)',
                },
                ...props.sx
            }}
        >
            {children}
        </Button>
    );
}

/**
 * SecondaryButton - Outlined button with white border
 */
export function SecondaryButton({ children, ...props }) {
    return (
        <Button
            {...props}
            sx={{
                background: 'transparent',
                color: 'white',
                fontWeight: 500,
                textTransform: 'none',
                padding: '10px 24px',
                borderRadius: '50px',
                fontSize: '0.95rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                ...props.sx
            }}
        >
            {children}
        </Button>
    );
}
