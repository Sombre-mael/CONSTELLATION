import React from 'react';

const servicesList = [
    { title: 'Électricité', img: '/assets/elec2.jpeg', desc: 'Installation, maintenance et dépannage électrique professionnel pour tous types de bâtiments.' },
    { title: 'Mécanique',   img: '/assets/meca2.jpeg', desc: 'Services mécaniques complets pour véhicules et équipements industriels.' },
    { title: 'Peinture',    img: '/assets/peint1.jpeg', desc: 'Peinture intérieure et extérieure de qualité avec des finitions impeccables.' },
    { title: 'Nettoyage',   img: '/assets/netto1.jpeg', desc: 'Services de nettoyage professionnel pour bâtiments résidentiels et commerciaux.' },
    { title: 'Design & Digital', img: '/assets/digit1.jpeg', desc: 'Conception web, automatisation et gestion des réseaux sociaux pour votre entreprise.' },
    { title: 'Immobilier',  img: '/assets/immo1.jpeg', desc: 'Services immobiliers complets : vente, location et gestion de propriétés.' },
    { title: 'Menuiserie',  img: '/assets/menui2.jpeg', desc: 'Fabrication et installation sur mesure de meubles et éléments en bois.' },
];

export default function Services() {
    return (
    <section id="services" className="py-16 bg-white fade-in">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover-animate transition duration-300">
                <img src={service.img} alt={`Service ${service.title}`} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    </section>
    );
}
