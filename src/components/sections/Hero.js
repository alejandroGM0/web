import React from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PrimaryButton } from '../ui/Buttons';

/**
 * Hero section component - Landing page first view
 * Single responsibility: Display hero content and navigation
 */
export default function Hero({ isMobile, onContactClick, onScrollDown }) {
    return (
        <div className="hero-section">
            <div className={isMobile ? "hero-content-mobile" : "hero-content"}>
                <div className="hero-text">
                    <h1 className="hero-name">
                        Alejandro
                        <br />
                        <span className="text-highlight">Gasca</span>
                    </h1>
                    <div className="mono-subtitle">
                        {isMobile ? (
                            <>
                                Computer Engineer • Full Stack
                                <br />
                                Embedded Systems
                            </>
                        ) : (
                            <>Computer Engineer • Full Stack • Embedded Systems</>
                        )}
                    </div>
                    <p className="hero-description">
                        I bridge the gap between hardware and software. specializing in building
                        creative solutions that matter.
                    </p>
                    <div className="hero-buttons">
                        <PrimaryButton onClick={onContactClick}>
                            Contact Me
                        </PrimaryButton>
                    </div>
                </div>

                {/* Arrow positioned at bottom */}
                <div className="arrow bounce">
                    <IconButton
                        className="scroll-button"
                        aria-label="Scroll down"
                        size="large"
                        onClick={onScrollDown}
                        sx={{
                            color: '#ffffff',
                            '&:hover': {
                                color: 'var(--color-primary)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <KeyboardArrowDownIcon fontSize="large" sx={{ fontSize: '3rem' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
