
import { FcElectricity } from 'react-icons/fc';
import { GiAutoRepair } from 'react-icons/gi';
import { FaPaintRoller } from 'react-icons/fa6';
import { GiBroom } from 'react-icons/gi';
import { FaLaptopCode } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa';
import { MdCarpenter } from 'react-icons/md';
import React from 'react';

const servicesList = [
    { title: 'Électricité', img: FcElectricity, desc: 'Installation, maintenance et dépannage électrique professionnel pour tous types de bâtiments.' },
    { title: 'Mécanique',   img: GiAutoRepair, desc: 'Services mécaniques complets pour véhicules et équipements industriels.' },
    { title: 'Peinture',    img: FaPaintRoller, desc: 'Peinture intérieure et extérieure de qualité avec des finitions impeccables.' },
    //{ title: 'Nettoyage',   img: GiBroom, desc: 'Services de nettoyage professionnel pour bâtiments résidentiels et commerciaux.' },
    { title: 'Design & Digital', img: FaLaptopCode, desc: 'Conception web, automatisation et gestion des réseaux sociaux pour votre entreprise.' },
    { title: 'Immobilier',  img: FaBuilding , desc: 'Services immobiliers complets : vente, location et gestion de propriétés.' },
    { title: 'Menuiserie',  img: MdCarpenter, desc: 'Fabrication et installation sur mesure de meubles et éléments en bois.' },
];

export default function Services() {
    return (
    <section id="services" className="py-16 bg-white fade-in">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover-animate transition duration-300">
                {typeof service.img === 'string' ? (
                    <img src={service.img} alt={`Service ${service.title}`} className="w-full h-48 object-cover" loading="lazy" />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                        <service.img className="w-24 h-24 text-blue-600" />
                    </div>
                )}
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
