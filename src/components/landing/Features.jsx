export default function Features() {
  const features = [
    { title: "Gestione Dati Centralizzata", description: "Tutti i tuoi dati aziendali in un unico posto, facilmente accessibili e gestibili." },
    { title: "Automazione dei Processi", description: "Semplifica i flussi di lavoro e aumenta l'efficienza con l'automazione intelligente." },
    { title: "Reportistica Avanzata", description: "Ottieni insights preziosi con report dettagliati e dashboard personalizzabili." },
    { title: "Sicurezza di Livello Enterprise", description: "Proteggi i tuoi dati sensibili con le nostre misure di sicurezza all'avanguardia." }
  ]

  return (
    <section id="features" className="py-20 bg-ivory/90 dark:bg-prussian/60 relative z-[1]">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gradient-custom mb-12">Le Nostre Funzionalità</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card transition-transform duration-300 hover:scale-105 will-change-transform"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}