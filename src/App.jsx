import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Portfolio from './Portfolio';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Team from './Team';

function App() {
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Team />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;