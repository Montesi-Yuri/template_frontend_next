'use client'

import Link from 'next/link'
import GuestLayout from '@/app/layouts/GuestLayout'
import Footer from '@/components/landing/Footer'


export default function PrivacyPolicy() {
    return (
        <>
            <GuestLayout>
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-ivory dark:text-ivory mb-8">Informativa sulla Privacy</h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-ivory dark:text-ivory">1. Raccolta delle Informazioni</h2>
                            <p className="mb-4 text-ivory/90 dark:text-ivory/90">
                                Raccogliamo diversi tipi di informazioni per vari scopi, al fine di fornire e migliorare il nostro servizio:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-ivory/80 dark:text-ivory/80">
                                <li>Dati personali (come nome, email e informazioni aziendali)</li>
                                <li>Dati di utilizzo del servizio</li>
                                <li>Cookies e dati di tracciamento</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-ivory dark:text-ivory">2. Utilizzo delle Informazioni</h2>
                            <p className="mb-4 text-ivory/90 dark:text-ivory/90">
                                Utilizziamo le informazioni raccolte per:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-ivory/80 dark:text-ivory/80">
                                <li>Fornire e mantenere il nostro servizio</li>
                                <li>Notificarvi cambiamenti al nostro servizio</li>
                                <li>Fornire supporto clienti</li>
                                <li>Analizzare l'uso del servizio per migliorarlo</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-ivory dark:text-ivory">3. Protezione dei Dati</h2>
                            <p className="mb-4 text-ivory/90 dark:text-ivory/90">
                                La sicurezza dei vostri dati è importante per noi. Implementiamo misure di sicurezza appropriate per proteggere
                                contro l'accesso non autorizzato, l'alterazione, la divulgazione o la distruzione dei vostri dati personali.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-ivory dark:text-ivory">4. Condivisione dei Dati</h2>
                            <p className="mb-4 text-ivory/90 dark:text-ivory/90">
                                Non vendiamo, scambiamo o trasferiamo in altro modo a terzi le vostre informazioni personali identificabili.
                                Questo non include terze parti fidate che ci assistono nel gestire il nostro sito web, condurre il nostro
                                business o servire gli utenti.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-ivory dark:text-ivory">5. I Vostri Diritti</h2>
                            <p className="mb-4 text-ivory/90 dark:text-ivory/90">
                                Avete il diritto di:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-ivory/80 dark:text-ivory/80">
                                <li>Accedere ai vostri dati personali</li>
                                <li>Correggere i dati inesatti</li>
                                <li>Richiedere la cancellazione dei dati</li>
                                <li>Opporvi al trattamento dei vostri dati</li>
                                <li>Richiedere la limitazione del trattamento</li>
                                <li>Richiedere la portabilità dei dati</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-ivory dark:text-ivory">6. Contatti</h2>
                            <p className="mb-4 text-ivory/90 dark:text-ivory/90">
                                Per qualsiasi domanda riguardante questa informativa sulla privacy o le nostre pratiche, vi preghiamo di
                                contattarci all'indirizzo:
                            </p>
                            <p className="font-medium text-ivory dark:text-ivory">privacy@clarus.it</p>
                        </section>

                        <div className="pt-8">
                            <Link
                                href="/"
                                className="text-ash hover:text-ivory dark:text-ash dark:hover:text-ivory transition-colors flex items-center gap-2"
                            >
                                <span>←</span> Torna alla home
                            </Link>
                        </div>
                    </div>
                </div>
            </GuestLayout>
            <Footer />
        </>
    )
} 