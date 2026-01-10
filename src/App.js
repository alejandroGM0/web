import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Core components
import Appbar from './components/Appbar';
import NeuralCanvas from './components/ui/NeuralCanvas';
import UpdateDialog from './components/ui/UpdateDialog';

// Section components
import Hero from './components/sections/Hero';
import About from './components/About';
import TechGrid from './components/sections/TechGrid';
import ExperienceGrid from './components/sections/ExperienceGrid';
import Projects from './components/sections/Projects';
import Contact from './components/Contact';
import ProjectDetail from './components/pages/ProjectDetail';

// Styles
import './assets/styles/App.css';

// Utils
import loadProjectsAsync from './utils/projectLoader';

// Fullpage configuration
const FULLPAGE_CREDITS = { enabled: true, label: '', position: 'right' };
const SECTION_ANCHORS = ['Home', 'About', 'Tech', 'Experience', 'Projects', 'Contact'];

/**
 * Global Notification Component - renders OUTSIDE of fullpage
 */
function GlobalNotification({ open, onClose, success, message }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{
                zIndex: 99999,
                position: 'fixed !important',
                bottom: '24px !important',
                right: '24px !important',
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 2,
                borderRadius: '16px',
                background: 'rgba(20, 20, 30, 0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: success
                    ? '0 8px 32px 0 rgba(74, 222, 128, 0.15)'
                    : '0 8px 32px 0 rgba(239, 68, 68, 0.15)',
            }}>
                {success ? (
                    <CheckCircleIcon sx={{ color: '#4ade80' }} />
                ) : (
                    <ErrorIcon sx={{ color: '#ef4444' }} />
                )}
                <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>
                    {message}
                </Typography>
            </Box>
        </Snackbar>
    );
}

/**
 * Main HomePage component with fullpage scroll navigation
 */
function HomePage({ projects }) {
    const [page, setPage] = useState(0);
    const [fpApi, setFpApi] = useState(null);
    // Only show dialog if user hasn't seen it before
    const [openDialog, setOpenDialog] = useState(() => {
        const hasSeenDialog = localStorage.getItem('hasSeenUpdateDialog');
        return !hasSeenDialog;
    });

    // Global notification state
    const [notification, setNotification] = useState({
        open: false,
        success: true,
        message: ''
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Handle fullpage section changes
    const handleAfterLoad = (origin, destination) => {
        if (destination) {
            setPage(destination.index);
        }
    };

    // Navigate to section by index
    const handleMenuClick = (sectionIndex) => {
        if (fpApi && SECTION_ANCHORS[sectionIndex]) {
            fpApi.moveTo(SECTION_ANCHORS[sectionIndex]);
        }
    };

    // Handle dialog close - save to localStorage
    const handleCloseDialog = () => {
        localStorage.setItem('hasSeenUpdateDialog', 'true');
        setOpenDialog(false);
    };

    // Show notification - passed to Contact
    const showNotification = (success, message) => {
        setNotification({ open: true, success, message });
    };

    // Close notification
    const closeNotification = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <>
            <UpdateDialog open={openDialog} onClose={handleCloseDialog} />

            {/* Neural Canvas background - fixed behind content */}
            <NeuralCanvas />

            {/* Main content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Appbar onMenuClick={handleMenuClick} activeSection={page} />

                <ReactFullpage
                    afterLoad={handleAfterLoad}
                    navigation={true}
                    licenseKey={"YOUR_LICENSE_KEY"}
                    credits={FULLPAGE_CREDITS}
                    slidesNavigation={false}
                    css3={true}
                    verticalCentered={false}
                    controlArrows={true}
                    fitToSection={true}
                    responsiveHeight={600}
                    responsiveWidth={768}
                    slidesNavPosition='bottom'
                    scrollOverflow={false}
                    normalScrollElementTouchThreshold={5}
                    keyboardScrolling={true}
                    animateAnchor={true}
                    recordHistory={true}
                    scrollingSpeed={800}
                    fitToSectionDelay={2000}
                    autoScrolling={true}
                    anchors={SECTION_ANCHORS}
                    render={({ fullpageApi }) => {
                        // Store API ref without triggering re-render
                        if (fullpageApi && !fpApi) {
                            setFpApi(fullpageApi);
                        }

                        return (
                            <ReactFullpage.Wrapper>
                                {/* Hero Section */}
                                <div className="section section-bg-dark section-no-padding">
                                    <Hero
                                        isMobile={isMobile}
                                        onContactClick={() => fullpageApi?.moveTo('Contact')}
                                        onScrollDown={() => fullpageApi?.moveSectionDown()}
                                    />
                                </div>

                                {/* About Section */}
                                <div className="section section-bg-dark">
                                    <About page={page} isMobile={isMobile} />
                                </div>

                                {/* Tech Section */}
                                <div className="section section-bg-dark">
                                    <TechGrid page={page} />
                                </div>

                                {/* Experience Section */}
                                <div className="section section-bg-dark">
                                    <ExperienceGrid page={page} />
                                </div>

                                {/* Projects Section */}
                                <div className="section section-bg-dark">
                                    <Projects isMobile={isMobile} projects={projects} page={page} />
                                </div>

                                {/* Contact Section */}
                                <div className="section section-bg-dark">
                                    <Contact page={page} onShowNotification={showNotification} />
                                </div>
                            </ReactFullpage.Wrapper>
                        );
                    }}
                />
            </div>

            {/* Global Notification - OUTSIDE of fullpage wrapper */}
            <GlobalNotification
                open={notification.open}
                onClose={closeNotification}
                success={notification.success}
                message={notification.message}
            />
        </>
    );
}

export default function App() {
    // Load projects from markdown files asynchronously
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjectsAsync().then((loadedProjects) => {
            setProjects(loadedProjects);
            setLoading(false);
        });
    }, []);

    return (
        <BrowserRouter basename="/codertysmi.github.io">
            <Routes>
                <Route path="/" element={<HomePage projects={projects} loading={loading} />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
