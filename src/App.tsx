import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy load secondary routes for fast initial page load
const Livestock = lazy(() => import('./pages/Livestock'));
const Poultry = lazy(() => import('./pages/Poultry'));
const Visit = lazy(() => import('./pages/Visit'));
const Admin = lazy(() => import('./pages/Admin'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livestock" element={<Livestock />} />
            <Route path="/poultry" element={<Poultry />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/admin" element={<Admin />} />
            {/* Catch all redirect to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
      <Analytics />
    </Router>
  );
}
