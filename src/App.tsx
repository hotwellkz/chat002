import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';
import { Header } from './components/Layout/Header';
import { ChatContainer } from './components/Chat/ChatContainer';
import { LoginPage } from './components/Auth/LoginPage';
import { RegisterPage } from './components/Auth/RegisterPage';
import { PricingSection } from './components/Subscription/PricingSection';
import { TermsOfService } from './components/Legal/TermsOfService';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={user ? <ChatContainer /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;