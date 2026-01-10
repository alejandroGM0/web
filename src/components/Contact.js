import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import '../assets/styles/App.css';
import SectionHeader from './ui/SectionHeader';
import TiltCard from './ui/TiltCard';
import { sectionSpacing, cardPadding } from '../config/layout';


import { PrimaryButton } from './ui/Buttons';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: 'var(--color-text)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
  },
  '& .MuiFormLabel-root': {
    color: 'var(--color-text-secondary)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--glass-border)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-primary)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-secondary)',
    },
  },
  marginBottom: '12px',
}));

const ContactInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: '1rem',
  alignItems: 'flex-start',
}));

const IconBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(118, 75, 162, 0.15)',
  borderRadius: '10px',
  padding: '10px',
  marginRight: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--color-secondary)',
}));

const FORM_ENDPOINT = "https://formsubmit.co/ajax/51b6588de426f1e017039ada825e70f9";

export default function Contact(props) {
  const [status, setStatus] = useState();
  const [animate, setAnimate] = useState(props.page === 5 || props.page === undefined);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const toastTimer = useRef(null);

  const toastAccentColor =
    toast.severity === 'success'
      ? '#22c55e'
      : toast.severity === 'error'
        ? '#ef4444'
        : 'var(--color-secondary)';

  useEffect(() => {
    if (props.page === 5) setAnimate(true);
  }, [props.page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");

    // FormSubmit expects standard form-encoded payload (not JSON)
    const formData = new FormData(e.target);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("SUCCESS");
        triggerToast('Message sent successfully!', 'success');
        e.target.reset();
        return;
      }

      let serverMessage = '';
      try {
        const body = await response.json();
        serverMessage = body?.message || '';
      } catch {
        // ignore json parsing errors
      }

      setStatus("ERROR");
      triggerToast(serverMessage || 'An error occurred while sending the message. Please try again.', 'error');
    } catch {
      setStatus("ERROR");
      triggerToast('Network error while sending the message. Please try again.', 'error');
    }
  };

  const triggerToast = (message, severity) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ open: true, message, severity });
    toastTimer.current = setTimeout(() => {
      setToast(prev => ({ ...prev, open: false }));
    }, 6000);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const handleToastClose = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <MailOutlineIcon />,
      title: 'Email',
      content: 'alejandro3gps@gmail.com',
      link: 'mailto:alejandro3gps@gmail.com'
    },
    {
      icon: <LocationOnIcon />,
      title: 'Location',
      content: 'Aragon, Zaragoza, España',
      link: null
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: sectionSpacing.py, px: sectionSpacing.px }}>
      <Fade in={animate} timeout={800}>
        <Box>
          <SectionHeader
            title="Contact"
            subtitle="Fill out the form below and I'll get back to you as soon as possible."
            mb={2}
          />

          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <TiltCard sx={{ p: cardPadding, height: 'auto' }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        required
                        name="name"
                        label="Name"
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        required
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        required
                        name="message"
                        label="Message"
                        multiline
                        rows={3}
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
                      <PrimaryButton
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={status === "SENDING"}
                      >
                        {status === "SENDING" ? "Sending..." : "Send Message"}
                      </PrimaryButton>
                    </Grid>
                  </Grid>
                </form>

                <Box sx={{
                  mt: 3,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  pt: 2,
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <IconButton
                    component="a"
                    href="https://github.com/alejandroGM0"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'var(--color-text-secondary)',
                      transition: 'var(--transition-smooth)',
                      '&:hover': {
                        color: 'var(--color-primary)',
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', opacity: 0.8 }}>
                    © {new Date().getFullYear()} Alejandro Gasca. Built with React.
                  </Typography>
                </Box>
              </TiltCard>
            </Grid>
          </Grid>

        </Box>
      </Fade>

      {/* Render toast via portal so it escapes fullpage's overflow:hidden */}
      {ReactDOM.createPortal(
        <Fade in={toast.open} timeout={{ enter: 200, exit: 200 }}>
          <Box
            role="status"
            sx={{
              position: 'fixed',
              bottom: { xs: 16, md: 32 },
              right: { xs: 16, md: 32 },
              left: { xs: 16, md: 'auto' },
              px: 2.5,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              minWidth: { xs: 'auto', md: 280 },
              borderRadius: '12px',
              backgroundColor: 'rgba(10, 15, 28, 0.95)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(18px)',
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '999px',
                backgroundColor: toastAccentColor,
                boxShadow: '0 0 12px rgba(249, 115, 22, 0.4)',
                flex: '0 0 auto',
              }}
            />
            <Typography variant="body2" sx={{ color: 'var(--color-text)' }}>
              {toast.message}
            </Typography>
            <IconButton
              size="small"
              onClick={handleToastClose}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': { color: toastAccentColor },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Fade>,
        document.body
      )}
    </Container>
  );
}

