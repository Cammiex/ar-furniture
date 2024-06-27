import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = React.lazy(() => import('../App'));
const LandingPage = React.lazy(() =>
  import('../pages/LandingPage/LandingPage')
);
const AboutPage = React.lazy(() => import('../pages/AboutPage/AboutPage'));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apps" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default ProjectRoutes;
