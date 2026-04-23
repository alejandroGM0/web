import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { PrimaryButton } from './ui/Buttons';
import TiltCard from './ui/TiltCard';
import SectionHeader from './ui/SectionHeader';
import { sectionSpacing, cardPadding } from '../config/layout';

// Shared TextField styles
const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(249, 115, 22, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#f97316' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
};

export default function Contact({ page, onShowNotification }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formsubmit.co/ajax/51b6588de426f1e017039ada825e70f9', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Use callback to show notification in App.js (outside fullpage)
        if (onShowNotification) {
          onShowNotification(true, "Message sent successfully! I'll get back to you soon.");
        }
        e.target.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      if (onShowNotification) {
        onShowNotification(false, 'Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: { xs: 'auto', md: '100%' },
      px: sectionSpacing.px,
      pt: sectionSpacing.pt,
      pb: sectionSpacing.py,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      <Box sx={{ width: '100%', maxWidth: '700px' }}>
        <SectionHeader
          title={
            <>
              Let's{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(to right, #f97316, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Connect
              </Box>
            </>
          }
          subtitle="Open to technical collaborations and engineering opportunities."
          mb={3}
        />

        <TiltCard sx={{ p: { xs: 2, md: 3.5 } }}>
          {/* Contact Form - FormSubmit */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              required
              sx={textFieldSx}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              required
              sx={textFieldSx}
            />
            <TextField
              name="message"
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              sx={textFieldSx}
            />
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                py: 1.5,
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <SendIcon sx={{ fontSize: 18 }} />
            </PrimaryButton>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <IconButton
              href="https://github.com/alejandroGM0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              sx={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  background: 'rgba(249, 115, 22, 0.1)',
                  borderColor: 'rgba(249, 115, 22, 0.3)'
                }
              }}
            >
              <GitHubIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/alejandro-gasca-72608136b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              sx={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  background: 'rgba(249, 115, 22, 0.1)',
                  borderColor: 'rgba(249, 115, 22, 0.3)'
                }
              }}
            >
              <LinkedInIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              © {new Date().getFullYear()} Alejandro Gasca. All rights reserved.
            </Typography>
          </Box>
        </TiltCard>
      </Box>
    </Container>

  );
}
