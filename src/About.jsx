import React, { useState } from 'react';

export default function About() {
    return (
    <section id="apropos" className="py-16 bg-gray-100 fade-in">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <img src="/assets/Const.jpg" alt="Équipe CONSTELLATION" className="rounded-lg shadow-lg w-full" loading="lazy" />
        </div>
        <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">À propos de CONSTELLATION</h2>
            <p className="text-gray-600 mb-4">CONSTELLATION est une agence multiservices basée en Afrique, offrant des solutions professionnelles dans divers domaines pour répondre aux besoins de nos clients.</p>
            <p className="text-gray-600 mb-4">Notre équipe d'experts qualifiés s'engage à fournir des services de haute qualité, avec un souci du détail et un professionnalisme inégalé.</p>
            <p className="text-gray-600 mb-6">Nous couvrons un large éventail de services pour vous offrir une solution complète et intégrée.</p>
            <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-2">
                <i className="fas fa-check"></i>
                </div>
                <span className="font-medium">Professionnels qualifiés</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-2">
                <i className="fas fa-check"></i>
                </div>
                <span className="font-medium">Matériaux de qualité</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-2">
                    <i className="fas fa-check"></i>
                </div>
                <span className="font-medium">Service client exceptionnel</span>
            </div>
            </div>
        </div>
        </div>
    </section>
    );
}