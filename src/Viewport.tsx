import { Routes, Route, Link } from 'react-router-dom'
import './Viewport.css'
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';

function Viewport() {
  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/terms">Terms and Conditions</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage textContent="This is the dynamic about page content passed as a prop!" />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
      </Routes>
    </>
  )
}

export default Viewport
