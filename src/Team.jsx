import React, { useState, useEffect } from 'react';

const teamMembers = [
    {
        name: "Marco Kabanza",
        role: "PDG de Constellation et Chef du Departement de peinture",
        image: "/assets/leader.jpg",
        quote: "Ensemble, nous construisons l'avenir du pays."
    },
    {
        name: "Ezechiel Mfuka",
        role: "Chef du Departement Digital",
        image: "/assets/ezechiel.jpg",
        quote: "La qualité et la sécurité de nos services sont nos priorités absolues."
    },
    {
        name: "Mael Kahilu",
        role: "Vice Chef du Departement Digital",
        image: "/assets/mael.jpg",
        quote: "L'innovation numérique au service de votre réussite."
    },
    {
        name: "Mme Evelyne Mulanga",
        role: "Chef des Amazones",
        image: "/assets/evelyn.jpg",
        quote: "Chaque défi est une occasion de prouver ma force, pas d'exprimer ma faiblesse."
    },
    {
        name: "Mme Sarah",
        role: "Chef de Departement de Communication et Membre des Amazones",
        image: "/assets/sarah.jpg",
        quote: "Je suis maîtresse de mon destin, et chaque jour est une nouvelle page blanche à écrire."
    },
    {
        name: "Mme Marianna",
        role: "Membre des Amazones",
        image: "/assets/marianna.jpg",
        quote: "Je ne suis pas survivante, je suis une guerrière qui a triomphé."
    },
    {
        name: "Mme Marie",
        role: "Membre des Amazones",
        image: "/assets/amazone1.jpg",
        quote: "La seule permission dont j'ai besoin pour briller est celle que je me donne moi même."
    },
    {
        name: "Marcus Kis",
        role: "Membre de Constellation",
        image: "/assets/kis.jpg",
        quote: "Je suis une force de la nature, et rien ne peut m'arrêter."
    },
    {
        name: "Mr Keddy",
        role: "Membre de Departement Peinture",
        image: "/assets/keddy.jpg",
        quote: "Ma vie est la preuve que de la poussière peuvent naître des étoiles."
    },
    {
        name: "Mr Jeno",
        role: "Membre de Departement Peinture",
        image: "/assets/jeno.jpg",
        quote: "Quand les doutes parlent, ma volonté leur répond."
    },
    {
        name: "Mr Elias",
        role: "Membre du departement d'éléctricié",
        image: "/assets/elias.jpg",
        quote: "Je suis la somme de tous mes combats et la preuve que le courage est plus fort que la douleur."
    },
    {
        name: "Equipe Constellation",
        role: "Etoile de Constellation",
        image: "/assets/equipe.jpg",
        quote: "L'univers n'est pas fait d'étoiles solitaires, mais d'étoiles qui, ensemble, dessinent les histoires et les chemins que d'autres suivront. C'est ça notre équipe"
    }
];

export default function Team() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Effet pour le défilement automatique
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
            );
        }, 7000); // Change toutes les 7 secondes

        return () => clearInterval(timer);
    }, []);

    // Navigation manuelle
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id="equipe" className="py-16 bg-gray-50 fade-in">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Notre Équipe</h2>
                
                <div className="relative overflow-hidden max-w-5xl mx-auto">
                    {/* Boutons de navigation */}
                    <button 
                        onClick={() => goToSlide(currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                        aria-label="Précédent"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => goToSlide(currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                        aria-label="Suivant"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Carrousel */}
                    <div className="flex transition-transform duration-500 ease-in-out"
                         style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {teamMembers.map((member, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-2">
                                <div className="relative h-[700px] rounded-lg overflow-hidden shadow-lg group bg-gray-900">
                                    <div className="h-full flex items-center justify-center">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="h-full w-auto max-w-none object-contain"
                                        />
                                    </div>
                                    {/* Overlay sombre avec dégradé */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                    
                                    {/* Contenu texte */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-300 bg-black/30 backdrop-blur-sm">
                                        <h3 className="text-2xl font-bold mb-3">{member.name}</h3>
                                        <p className="text-lg text-yellow-400 font-medium mb-4">{member.role}</p>
                                        <p className="text-white/90 text-lg italic mb-4 leading-relaxed">"{member.quote}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Points de navigation */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {teamMembers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    currentIndex === index ? 'bg-primary' : 'bg-gray-300'
                                }`}
                                aria-label={`Voir membre d'équipe ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
