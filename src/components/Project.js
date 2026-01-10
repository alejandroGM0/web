import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TiltCard from './ui/TiltCard';
import { SecondaryButton } from './ui/Buttons';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

/**
 * Project card component
 */
export default function Project(props) {
    return (
        <TiltCard
            sx={{
                height: props.isMobile ? 'auto' : '100%',
                maxWidth: props.isMobile ? '100%' : '450px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Project Image */}
            {props.coverImage && (
                <Box
                    sx={{
                        width: '100%',
                        height: props.isMobile ? '200px' : '220px',
                        backgroundImage: `url(${props.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            {/* Content */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
                    {props.title}
                </Typography>

                <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                    {props.description}
                </Typography>

                {/* Technologies */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {props.technologies?.slice(0, 4).map((tech, index) => (
                        <Chip
                            key={index}
                            label={tech}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 107, 0, 0.15)',
                                color: 'var(--color-secondary)',
                                fontWeight: 500,
                                border: '1px solid rgba(255, 107, 0, 0.3)',
                            }}
                        />
                    ))}
                </Box>

                {/* Links */}
                <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                    {props.githubUrl && (
                        <SecondaryButton
                            component="a"
                            href={props.githubUrl}
                            target="_blank"
                            size="small"
                            startIcon={<GitHubIcon />}
                        >
                            Code
                        </SecondaryButton>
                    )}
                    {props.liveUrl && (
                        <SecondaryButton
                            component="a"
                            href={props.liveUrl}
                            target="_blank"
                            size="small"
                            startIcon={<LaunchIcon />}
                        >
                            Demo
                        </SecondaryButton>
                    )}
                </Box>
            </Box>
        </TiltCard>
    );
}
