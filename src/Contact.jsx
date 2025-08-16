import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });

    const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = e => {
    e.preventDefault();
    // Tu peux ajouter ici la logique d'envoi (API, email, etc.)
    console.log(formData);
    alert('Message envoyé !');
    setFormData({ name: '', email: '', service: '', message: '' });
    };

    return (
    <section id="contact" className="py-16 bg-white fade-in">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contactez-nous</h2>
        <div className="flex flex-col md:flex-row gap-8">
            {/* Coordonnées */}
            <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 text-primary">Nos coordonnées</h3>
            <div className="space-y-4">
                <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">Adresse</h4>
                    <p className="text-gray-600">123 Avenue des Services, Ville, Pays</p>
                    </div>
                </div>
                <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                    <i className="fas fa-phone-alt"></i>
                </div>
                    <div>
                    <h4 className="font-bold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">+243 993 001 218</p>
                    </div>
                </div>
                <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                    <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">Email</h4>
                        <p className="text-gray-600">contact@constellation-afrique.com</p>
                    </div>
                </div>
            </div>
            {/* Réseaux sociaux */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-primary">Suivez-nous</h3>
                <div className="flex space-x-4">
                    <a href="https://web.facebook.com/profile.php?id=100093331440143" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition duration-300">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition duration-300">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justifiant-center text-white hover:bg-pink-600 transition duration-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition duration-300">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            </div>
            {/* Formulaire de contact */}
            <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 text-primary">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom complet</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Service intéressé</label>
                <select id="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Sélectionnez un service</option>
                    <option value="electricite">Électricité</option>
                    <option value="mecanique">Mécanique</option>
                    <option value="peinture">Peinture</option>
                    <option value="nettoyage">Nettoyage</option>
                    <option value="digital">Design & Digital</option>
                    <option value="immobilier">Immobilier</option>
                    <option value="menuiserie">Menuiserie</option>
                </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea id="message" rows="4" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:scale-105">Envoyer le message</button>
            </form>
            </div>
        </div>
        </div>
    </section>
    );
}