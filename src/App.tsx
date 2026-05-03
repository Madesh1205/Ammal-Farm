import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Livestock from './pages/Livestock';
import Poultry from './pages/Poultry';
import Visit from './pages/Visit';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/poultry" element={<Poultry />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/admin" element={<Admin />} />
          {/* Catch all redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
}
