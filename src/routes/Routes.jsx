import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from '../pages/LoadingScreen/LoadingScreen';

const App = React.lazy(() => import('../App'));
const LandingPage = React.lazy(() =>
  import('../pages/LandingPage/LandingPage')
);
const AboutPage = React.lazy(() => import('../pages/AboutPage/AboutPage'));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apps" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/loading" element={<LoadingScreen />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default ProjectRoutes;
