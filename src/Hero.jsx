import React from 'react';

export default function Hero() {
    return (
    <section id="accueil" className="bg-gradient-to-r from-primary to-secondary text-white py-20 fade-in text-center">
        <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-bounce">Votre partenaire multiservices à Lubumbashi</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">CONSTELLATION offre des solutions professionnelles dans divers domaines pour répondre à tous vos besoins.</p>
        <div className="flex justify-center space-x-4">
            <a href="#contact" className="bg-accent hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:scale-105">Contactez-nous</a>
            <a href="#services" className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:scale-105">Nos services</a>
        </div>
        </div>
    </section>
    );
}