import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProjectDetail({ projects }) {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <Container sx={{ py: 10, color: 'white', textAlign: 'center' }}>
                <Typography variant="h4">Project not found</Typography>
                <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 10, color: 'white' }}>
            <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 4, color: 'white' }}>
                Back to Home
            </Button>
            <Box className="glass-card" sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom className="gradient-text">
                    {project.title}
                </Typography>
                <Typography variant="body1">
                    {project.description}
                </Typography>
                {/* Detail content would go here */}
            </Box>
        </Container>
    );
}
