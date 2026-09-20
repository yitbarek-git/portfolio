import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/Home/HomePage';
import { ProjectsPage } from './pages/Projects/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetails/ProjectDetailsPage';
import { ServicesPage } from './pages/Services/ServicesPage';
import { JourneyPage } from './pages/Journey/JourneyPage';
import { BlogPage } from './pages/Blog/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetails/BlogDetailsPage';
import { TechLessonsPage } from './pages/TechLessons/TechLessonsPage';
import { TechLessonDetailsPage } from './pages/TechLessonDetails/TechLessonDetailsPage';
import { AILessonsPage } from './pages/AILessons/AILessonsPage';
import { AILessonDetailsPage } from './pages/AILessonDetails/AILessonDetailsPage';
import { AboutPage } from './pages/About/AboutPage';
import { ResourcesPage } from './pages/Resources/ResourcesPage';
import { CVPage } from './pages/CV/CVPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

// Admin Workspace
import { AdminDashboard } from './pages/Admin/AdminDashboard';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public App Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailsPage />} />
              <Route path="/tech-lessons" element={<TechLessonsPage />} />
              <Route path="/tech-lessons/:slug" element={<TechLessonDetailsPage />} />
              <Route path="/ai-lessons" element={<AILessonsPage />} />
              <Route path="/ai-lessons/:slug" element={<AILessonDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/cv" element={<CVPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Management Workspace */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="*" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}
