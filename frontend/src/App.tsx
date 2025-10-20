import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import QAndA from './pages/QAndA';
import Resources from './pages/Resources';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ShareExperiencePage from './pages/Share-experience';
import ExperienceDetail from './pages/ExperienceDetail';
import Rewards from './pages/rewards';
import Admin from './pages/admin';
import JobPortal from './pages/JobPortal';

// Resume pages
import ResumeList from './pages/resume/ResumeList';
import ResumeDetail from './pages/resume/ResumeDetail';
import ResumeBuilder from './pages/resume/resumeBuilder'; // ensure the filename matches

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <Header />
        <main>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/share-experience" element={<ShareExperiencePage />} />
            <Route path="/experiences/:id" element={<ExperienceDetail />} />
            <Route path="/qa" element={<QAndA />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/jobs" element={<JobPortal />} />
            <Route path="/admin" element={<Admin />} />

            {/* Resume routes */}
            <Route path="/resumes" element={<ResumeList />} />
            <Route path="/resumes/:id" element={<ResumeDetail />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />

            {/* Optional: 404 page */}
            <Route path="*" element={<div className="text-center py-20 text-gray-500">Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
