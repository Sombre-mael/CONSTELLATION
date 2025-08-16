import React from 'react';

const portfolioItems = [
    { title: "Projet Électrique Résidentiel", img: "/assets/reale.jpg", desc: "Installation complète d'un système électrique moderne dans une villa de luxe." },
    { title: "Rénovation Peinture Bureau", img: "/assets/realp.png", desc: "Rafraîchissement des espaces de travail avec des couleurs modernes et dynamiques." },
    { title: "Site Web Entreprise", img: "/assets/digit3.jpeg", desc: "Création d'un site web responsive et moderne pour une PME locale." },
    { title: "Expertise en menuiserie", img: "/assets/menui1.jpg", desc: "Des meubles de qualité faits sur mesure." },
    { title: "Immobilier", img: "/assets/immo2.jpeg", desc: "Des agents professionnels et prêts pour tous services dans l'immobilier." },
    { title: "Mécanique", img: "/assets/meca2.jpeg", desc: "Des mécaniciens hors pairs et pros pour rendre à votre véhicule une santé très bonne." },
    //{ title: "Nettoyage", img: "/assets/netto2.jpeg", desc: "Un service de nettoyage de qualité pour vos bâtiments." },
];

export default function Portfolio() {
    return (
    <section id="portfolio" className="py-16 bg-gray-100 fade-in">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Notre Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover-animate transition duration-300">
                <img src={item.img} alt={`Portfolio ${idx + 1}`} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    </section>
    );
}
