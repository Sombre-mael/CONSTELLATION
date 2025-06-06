import React, { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    };

    return (
    <header className="bg-white shadow-md sticky top-0 z-50 fade-in">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
            <img src="/assets/Constellation.jpg" alt="Logo" className="rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-primary">CONSTELLATION</h1>
        </div>

        <nav className={`md:flex md:flex-row md:space-x-8 ${menuOpen ? 'flex flex-col space-y-4 absolute top-16 left-0 right-0 bg-white p-4 shadow-md' : 'hidden md:flex'}`}>
            <a href="#accueil" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Accueil</a>
            <a href="#services" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Services</a>
            <a href="#portfolio" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Portfolio</a>
            <a href="#apropos" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">À propos</a>
            <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Contact</a>
        </nav>

        <button onClick={toggleMenu} className="md:hidden text-gray-700" aria-label="Ouvrir le menu mobile">
            <i className="fas fa-bars text-2xl"></i>
        </button>
        </div>
    </header>
    );
}