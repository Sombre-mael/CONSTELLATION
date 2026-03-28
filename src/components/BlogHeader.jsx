import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BlogHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Check if we're on a blog-related page
    const isBlogPage = location.pathname.startsWith('/blog') || location.pathname.startsWith('/admin');

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-3 overflow-hidden">
                            <img src="/assets/Constellation.jpg" alt="Logo" className="rounded-full w-full h-full object-cover" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">CONSTELLATION</h1>
                    </Link>
                </div>

                <nav className={`md:flex md:flex-row md:space-x-6 ${menuOpen ? 'flex flex-col space-y-4 absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50' : 'hidden md:flex'}`}>
                    <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300" data-testid="nav-accueil">
                        Accueil
                    </Link>
                    <Link to="/#services" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300" data-testid="nav-services">
                        Services
                    </Link>
                    <Link to="/#portfolio" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300" data-testid="nav-portfolio">
                        Portfolio
                    </Link>
                    <Link to="/#apropos" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300" data-testid="nav-apropos">
                        À propos
                    </Link>
                    <Link to="/#equipe" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300" data-testid="nav-equipe">
                        Équipe
                    </Link>
                    <Link 
                        to="/blog" 
                        className={`font-medium transition-colors duration-300 ${isBlogPage ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                        data-testid="nav-blog"
                    >
                        Blog
                    </Link>
                    <Link to="/#contact" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300" data-testid="nav-contact">
                        Contact
                    </Link>
                </nav>

                <button onClick={toggleMenu} className="md:hidden text-gray-700" aria-label="Ouvrir le menu mobile">
                    <i className="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </header>
    );
}
