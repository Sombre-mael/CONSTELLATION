import React from 'react';

export default function Footer() {
    return (
    <footer className="bg-gray-800 text-white py-12 fade-in">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                        <img src="/assets/Constellation.jpg" alt="Logo" className="rounded-full" />
                    </div>
                    <h3 className="text-xl font-bold">CONSTELLATION</h3>
                </div>
                <p className="text-gray-400">Votre partenaire multiservices en Afrique pour tous vos besoins professionnels.</p>
            </div>
            <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Électricité</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Mécanique</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Peinture</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Nettoyage</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-4">Services (suite)</h4>
                <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Design & Digital</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Immobilier</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Menuiserie</a></li>
                </ul>
            </div>
            <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
                <ul className="space-y-2">
                <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                    <span className="text-gray-400">123 Avenue Carmel</span>
                </li>
                <li className="flex items-center">
                    <i className="fas fa-phone-alt text-gray-400 mr-2"></i>
                    <span className="text-gray-400">+243 993 001 218</span>
                </li>
                <li className="flex items-center">
                    <i className="fas fa-envelope text-gray-400 mr-2"></i>
                    <span className="text-gray-400">contact@constellation-afrique.com</span>
                </li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 CONSTELLATION. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    );
}