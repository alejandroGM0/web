import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

/**
 * Gradient button for primary actions (Submit, Demo, etc.)
 */
export const PrimaryButton = styled(Button)(({ theme }) => ({
    backgroundImage: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
    color: 'white',
    padding: '10px 26px',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '50px',
    transition: 'var(--transition-smooth)',
    '&:hover': {
        boxShadow: '0 8px 20px rgba(118, 75, 162, 0.3)',
        transform: 'translateY(-3px)',
    }
}));

/**
 * Special Project Button - Distinct style for main CTAs
 */
export const ProjectButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(90deg, #FF6B00, #CF7A09)',
    color: 'white',
    padding: '12px 32px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '50px',
    textTransform: 'none',
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(90deg, #CF7A09, #FF6B00)',
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 20px rgba(255, 107, 0, 0.4)',
    }
}));

/**
 * Outline/Glass button for secondary actions (Code, GitHub, etc.)
 */
export const SecondaryButton = styled(Button)(({ theme }) => ({
    color: 'var(--color-text)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--glass-border)',
    padding: '10px 26px',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '50px',
    transition: 'var(--transition-smooth)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid var(--color-secondary)',
        transform: 'translateY(-3px)',
    }
}));

/**
 * Navigation button with underline effect
 */
export const NavigationButton = styled(Button)(({ theme }) => ({
    color: 'var(--color-text)',
    fontWeight: 500,
    marginLeft: '10px',
    marginRight: '10px',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: 'var(--color-secondary)',
        transition: 'var(--transition-smooth)',
    },
    '&:hover': {
        backgroundColor: 'transparent',
        '&::after': {
            width: '100%',
        }
    }
}));
