'use client'

import Link from 'next/link'

export default function Hero() {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="py-20 container mx-auto relative z-[1]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-ivory mb-6">
          Clarus: Software per la gestione dei dati e ottimizzazione dei processi aziendali
        </h1>
        <p className="text-xl text-ash mb-8 max-w-2xl mx-auto">
          Il nostro software all-in-one è progettato per aiutare le piccole e medio aziende a gestire i dati e i processi in modo efficiente e scalabile.
        </p>
        <a 
          href="#contact" 
          onClick={(e) => scrollToSection(e, 'contact')} 
          className="btn-primary inline-block max-w-md"
        >
          Richiedi una Demo
        </a>
      </div>
    </section>
  )
}