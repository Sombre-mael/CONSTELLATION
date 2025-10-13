import React, { useState } from 'react';

const portfolioItems = [
    { 
        title: "Réalisation Électrique Résidentiel", 
        img: "../public/assets/reale.jpg", 
        desc: "Installation complète d'un système électrique moderne dans une villa de luxe.",
        gallery: [
            "../public/assets/reale.jpg",
            "https://images.unsplash.com/photo-1621905252507-b35492cc74b4",
            "https://plus.unsplash.com/premium_photo-1678766821881-9d6899c22e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amV1bmUlMjBub2lyJTIwZWxlY3RyaWNpZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500"
        ],
        longDesc: "Notre équipe d'experts en électricité réalise des installations complètes et sur mesure pour votre maison. Nous garantissons un travail professionnel respectant toutes les normes de sécurité en vigueur. Nos services comprennent l'installation électrique résidentielle, la mise aux normes, la domotique et les systèmes d'éclairage intelligents.",
    },
    { 
        title: "Rénovation Peinture Batiment", 
        img: "../public/assets/realp.png", 
        desc: "Rafraîchissement des espaces de travail avec des couleurs modernes et dynamiques.",
        gallery: [
            "../public/assets/realp.png",
            "../public/assets/peint1.jpg"
        ],
        longDesc: "Nos services de peinture professionnelle transforment vos espaces de travail en environnements inspirants. Nous utilisons des peintures de haute qualité et des techniques modernes pour garantir une finition parfaite et durable."
    },
    { 
        title: "Design & Digital", 
        img: "../public/assets/digit3.jpeg", 
        desc: "Création d'un site web responsive et moderne pour une PME locale.",
        gallery: [
            "https://images.unsplash.com/photo-1547658719-da2b51169166",
            "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
        ],
        longDesc: "Notre équipe de développeurs web crée des sites web professionnels, responsive et optimisés pour le référencement. Nous proposons des solutions sur mesure incluant le design UX/UI, le développement frontend et backend, ainsi que la maintenance continue."
    },
    { 
        title: "Charpenterie", 
        img: "../public/assets/menui1.jpg", 
        desc: "Des meubles de qualité faits sur mesure.",
        gallery: [
            "https://plus.unsplash.com/premium_photo-1664302179163-4f37a6b67e54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
            "https://images.unsplash.com/photo-1527854176090-66db22836da9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
            "https://images.unsplash.com/photo-1577176434922-803273eba97a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWV1YmxlJTIwZW4lMjBib2lzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
        ],
        longDesc: "Nos menuisiers experts créent des pièces uniques et sur mesure pour votre intérieur. De la conception à la réalisation, nous utilisons des matériaux de première qualité pour garantir la durabilité et l'esthétique de nos créations."
    },
    { 
        title: "Immobilier", 
        img: "https://media.istockphoto.com/id/2197568906/fr/photo/real-estate-agent-delivering-sample-homes-to-customers-mortgage-loan-contracts-make-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=nV4HLvytIaBErGR-PAearodWbnCmtp__JpMTCG6HXsk=", 
        desc: "Des agents professionnels et prêts pour tous services dans l'immobilier.",
        gallery: [
            "https://images.unsplash.com/photo-1701589212546-2a1bcd94c5af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bG9nZW1lbnQlMjBBZnJpY2FpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
            "https://media.istockphoto.com/id/1311634251/fr/photo/plan-rapproch%C3%A9-du-jeune-groupe-africain-de-main-masculine-retiennent-des-clefs.webp?a=1&b=1&s=612x612&w=0&k=20&c=AQLk3kbo5Fq-9wktb4JLL4e3qdkW1DzsIUmHr_drOak="
        ],
        longDesc: "Notre agence immobilière offre un service complet d'achat, vente et location de biens. Nos agents expérimentés vous accompagnent dans toutes les étapes de votre projet immobilier, de la recherche à la finalisation de la transaction."
    },
    { 
        title: "Carrelage", 
        img: "../public/assets/carr.jpg", 
        desc: "Des mécaniciens hors pairs et pros pour rendre à votre véhicule une santé très bonne.",
        gallery: [
            "../public/assets/carr1.jpg",
            "../public/assets/carr2.jpg",
            "../public/assets/carr3.jpg",
        ],
        longDesc: "Notre équipe de mécaniciens qualifiés assure l'entretien et la réparation de tous types de véhicules. Nous utilisons des équipements de diagnostic modernes et des pièces de qualité pour garantir la fiabilité de nos interventions."
    },
    //{ title: "Nettoyage", img: "/assets/netto2.jpeg", desc: "Un service de nettoyage de qualité pour vos bâtiments." },
];

const Modal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    // Fonction pour créer la grille adaptative basée sur le nombre d'images
    const getGridClass = (imageCount) => {
        if (imageCount <= 1) return 'grid-cols-1';
        if (imageCount === 2) return 'grid-cols-2';
        if (imageCount === 3) return 'grid-cols-3';
        if (imageCount >= 4) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2';
    };

    const handleContactClick = () => {
        onClose(); // Ferme le modal
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-primary">{item.title}</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <span className="text-3xl">&times;</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-8">
                        {item.gallery && item.gallery.length > 0 && (
                            <div className={`grid ${getGridClass(item.gallery.length)} gap-4`}>
                                {item.gallery.map((img, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`${
                                            item.gallery.length === 1 ? 'col-span-full' :
                                            item.gallery.length === 3 && idx === 2 ? 'col-span-2 md:col-span-1' : ''
                                        }`}
                                    >
                                        <img 
                                            src={img}
                                            alt={`${item.title} ${idx + 1}`}
                                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="space-y-6">
                            <p className="text-gray-700 text-lg leading-relaxed">{item.longDesc || item.desc}</p>
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={handleContactClick}
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Nous contacter pour ce service
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Portfolio() {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section id="portfolio" className="py-16 bg-gray-100 fade-in">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Notre Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                        >
                            <img src={item.img} alt={`Portfolio ${idx + 1}`} className="w-full h-48 object-cover" loading="lazy" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal 
                isOpen={selectedItem !== null}
                onClose={() => setSelectedItem(null)}
                item={selectedItem || {}}
            />
        </section>
    );
}
