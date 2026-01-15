import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import TerminalIcon from '@mui/icons-material/Terminal';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../assets/styles/App.css';

// Navigation Link Style
const NavButton = styled(Button)(({ theme }) => ({
    color: 'var(--color-text)',
    fontWeight: 500,
    fontSize: '0.95rem',
    textTransform: 'none',
    padding: '6px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: '#fff',
    }
}));

// CTA Button Style
const CTAButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(90deg, #FF6B00, #CF7A09)',
    color: 'white',
    fontWeight: 600,
    textTransform: 'none',
    padding: '8px 24px',
    borderRadius: '50px',
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(90deg, #CF7A09, #FF6B00)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(255, 107, 0, 0.4)',
    }
}));

export default function Appbar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (sectionIndex) => {
        if (props.onMenuClick) {
            props.onMenuClick(sectionIndex);
        }
        handleClose();
    };

    // Nav items - Tech section (2) not shown in menu as requested
    const navItems = [
        { label: 'Home', section: 0 },
        { label: 'About', section: 1 },
        { label: 'Experience', section: 3 },
        { label: 'Projects', section: 4 },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)',
                maxWidth: '1200px',
                boxSizing: 'border-box',
                zIndex: 1100,
                display: 'flex',
                alignItems: 'center',
                padding: { xs: '6px 12px', sm: '8px 24px' },
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Logo Area */}
            <Box
                onClick={() => props.onMenuClick && props.onMenuClick(0)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mr: { xs: 1, md: 4 },
                    pl: { xs: 0, sm: 1 },
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.8 }
                }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 107, 0, 0.1)',
                    borderRadius: '8px',
                    p: 0.5
                }}>
                    <TerminalIcon sx={{ color: '#FF6B00', fontSize: 24 }} />
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Box component="span">Alejandro</Box>
                    <Box component="span" sx={{ color: '#FF6B00', ml: 0.5 }}>Gasca</Box>
                </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1, mr: 4 }}>
                    {navItems.map((item, index) => (
                        <NavButton
                            key={index}
                            disableRipple
                            onClick={() => props.onMenuClick && props.onMenuClick(item.section)}
                            sx={{
                                backgroundColor: props.activeSection === item.section ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                color: props.activeSection === item.section ? '#fff' : 'var(--color-text)',
                                '&:hover': {
                                    backgroundColor: props.activeSection === item.section ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                                }
                            }}
                        >
                            {item.label}
                        </NavButton>
                    ))}
                </Box>
            )}

            {/* Actions Area */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                {!isMobile && (
                    <CTAButton onClick={() => props.onMenuClick && props.onMenuClick(5)}>
                        Let's Talk
                    </CTAButton>
                )}

                {/* Mobile Menu Toggle */}
                {isMobile && (
                    <>
                        <IconButton
                            size="medium"
                            onClick={handleMenu}
                            sx={{ color: '#fff' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: 'rgba(30, 30, 30, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    mt: 1.5,
                                    minWidth: '180px',
                                    py: 1,
                                    px: 0.5
                                }
                            }}
                        >
                            {navItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleMenuItemClick(item.section)}
                                    selected={props.activeSection === item.section}
                                    sx={{
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        py: 1.5,
                                        px: 3,
                                        borderRadius: '8px',
                                        mx: 0.5
                                    }}
                                >
                                    {item.label}
                                </MenuItem>
                            ))}
                            <MenuItem
                                onClick={() => handleMenuItemClick(5)}
                                sx={{
                                    color: '#FF6B00',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    py: 1.5,
                                    px: 3,
                                    borderRadius: '8px',
                                    mx: 0.5
                                }}
                            >
                                Let's Talk
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Box>
        </Box>
    );
}
