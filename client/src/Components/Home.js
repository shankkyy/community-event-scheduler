import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Team from './pages/Team';
import Contact from './pages/Contact';
import CreateEvent from './pages/CreateEvent';
import Navbar from './Navbar';
import UpdateEvent from './pages/UpdateEvent';
import Footer from './Footer';
function Home() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '200px' }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="update/:id" element={<UpdateEvent />} />
          </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
