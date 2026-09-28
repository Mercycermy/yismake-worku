import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import SeoManager from './components/SeoManager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Universe from './pages/Universe';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import About from './pages/About';
import News from './pages/News';
import InHisOwnWords from './pages/InHisOwnWords';
import OnWriting from './pages/OnWriting';
import Enquiries from './pages/Enquiries';
import Sources from './pages/Sources';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <SeoManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/archive" element={<News />} />
          <Route path="/in-his-own-words" element={<InHisOwnWords />} />
          <Route path="/on-writing" element={<OnWriting />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:slug" element={<BookDetail />} />
          <Route path="/author" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/contact" element={<Enquiries />} />
          <Route path="/sources" element={<Sources />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;
