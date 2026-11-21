import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directions from './pages/Directions';
import Schedule from './pages/Schedule';
import Subscriptions from './pages/Subscriptions';
import Teachers from './pages/Teachers';
import About from './pages/About';
import Events from './pages/Events';
import Careers from './pages/Careers';
import Booking from './pages/Booking';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}