import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ivory dark:bg-prussian-darker py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Image
                src="/images/logo_clarus.jpg"
                alt="Clarus Logo"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <h3 className="text-xl font-bold text-gradient-custom">Clarus</h3>
            </div>
            <p className="text-secondary mt-2">Soluzioni di gestione per il tuo business</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/privacy" className="nav-link">Privacy</Link></li>
              <li><Link href="/terms" className="nav-link">Termini di Servizio</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-secondary text-sm">
          © {new Date().getFullYear()} Clarus. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}