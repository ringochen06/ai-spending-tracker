import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage"; // Updated import
import AddSpendingPage from "./pages/AddSpendingPage"; // Updated import
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Home as HomeIcon,
  ReceiptLong as ReceiptLongIcon, // Updated icon
  AddCircleOutline as AddCircleOutlineIcon, // Updated icon
} from "@mui/icons-material";
import "./Viewport.css";

const pathToValueMap: Record<string, number> = {
  "/": 0,
  "/transactions": 1, // Updated path
  "/add-spending": 2, // Updated path
};

const valueToPathMap: Record<number, string> = {
  0: "/",
  1: "/transactions", // Updated path
  2: "/add-spending", // Updated path
};

const Viewport = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Set initial value based on the current path, defaulting to 0 (Home)
  const [value, setValue] = useState(pathToValueMap[location.pathname] ?? 0);

  // Effect to update BottomNavigation value if the route changes (e.g., browser back/forward)
  useEffect(() => {
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
      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/add-spending" element={<AddSpendingPage />} />
        </Routes>
      </main>

      {/* Botton Nav Bar */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={10}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavigationChange}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Transactions"
            icon={<ReceiptLongIcon />}
          />
          <BottomNavigationAction
            label="Add Spending"
            icon={<AddCircleOutlineIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default Viewport;
