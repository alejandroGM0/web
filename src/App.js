import './assets/styles/App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Components
import Appbar from "./components/Appbar.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";

// Section components
import Hero from "./components/sections/Hero.js";
import TechGrid from "./components/sections/TechGrid.js";
import ExperienceGrid from "./components/sections/ExperienceGrid.js";
import Projects from "./components/sections/Projects.js";

// Page components
import ProjectDetail from "./components/pages/ProjectDetail.js";

// UI components
import UpdateDialog from "./components/ui/UpdateDialog.js";
import NeuralCanvas from "./components/ui/NeuralCanvas.js";

// Data
import { loadProjects } from "./data/projects.js";

// Constants
const FULLPAGE_CREDITS = { enabled: false, label: 'Made with fullPage.js', position: 'right' };
const SECTION_ANCHORS = ["Home", "About", "Tech", "Experience", "Projects", "Contact"];

/**
 * Home Page - Main fullpage portfolio
 */
function HomePage({ projects }) {
  const [page, setPage] = useState(0);
  const [fpApi, setFpApi] = useState(null);
  const [openDialog, setOpenDialog] = useState(true);

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

  return (
    <>
      <UpdateDialog open={openDialog} onClose={() => setOpenDialog(false)} />

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
          scrollOverflow={true}
          touchSensitivity={15}
          normalScrollElementTouchThreshold={5}
          keyboardScrolling={true}
          animateAnchor={true}
          recordHistory={true}
          scrollingSpeed={800}
          fitToSectionDelay={1000}
          anchors={SECTION_ANCHORS}
          render={({ fullpageApi }) => {
            // Store API ref without triggering re-render
            if (fullpageApi && !fpApi) {
              // Use setTimeout to defer state update outside render
              setTimeout(() => setFpApi(fullpageApi), 0);
            }
            return (
              <ReactFullpage.Wrapper>
                {/* Hero Section */}
                <div className="section section-bg-dark">
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
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <Contact page={page} />
                    </Grid>

                  </Grid>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    </>
  );
}

/**
 * Main App Component - Handles routing
 */
function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("App: Starting to load projects...");
        const data = await loadProjects();
        console.log("App: Loaded projects:", data);
        setProjects(data);
        if (data.length === 0) {
          setError("No projects found (empty list returned)");
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-screen" style={{ color: 'white', padding: '2rem' }}>Loading projects... (Check console)</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'white', padding: '2rem', zIndex: 9999, position: 'relative' }}>
        <h1>Error Loading Projects</h1>
        <pre>{error}</pre>
        <p>Please check the browser console for more details.</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage projects={projects} />} />
      <Route path="/project/:slug" element={<ProjectDetail projects={projects} />} />
      {/* Catch fullpage.js anchor routes */}
      <Route path="/:anchor" element={<HomePage projects={projects} />} />
    </Routes>
  );
}

export default App;