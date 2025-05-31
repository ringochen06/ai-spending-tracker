import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./Viewport.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";

const pathToValueMap: Record<string, number> = {
  "/": 0,
  "/about": 1,
  "/terms": 2,
};

const valueToPathMap: Record<number, string> = {
  0: "/",
  1: "/about",
  2: "/terms",
};

function Viewport() {
  const navigate = useNavigate();
  const location = useLocation();

  // Set initial value based on the current path, defaulting to 0 (Home)
  const [value, setValue] = React.useState(
    pathToValueMap[location.pathname] ?? 0
  );

  // Effect to update BottomNavigation value if the route changes (e.g., browser back/forward)
  React.useEffect(() => {
    setValue(pathToValueMap[location.pathname] ?? 0);
  }, [location.pathname]);

  const handleNavigationChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
    navigate(valueToPathMap[newValue]);
  };

  return (
    <>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <AboutPage textContent="This is the dynamic about page content passed as a prop!" />
            }
          />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
        </Routes>
      </main>
      {/* Use Paper component for background, shadow, and fixed positioning */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavigationChange}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="About" icon={<InfoIcon />} />
          <BottomNavigationAction label="Terms" icon={<DescriptionIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Viewport;
