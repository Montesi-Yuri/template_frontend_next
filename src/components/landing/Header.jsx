'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X, LayoutGrid, Mail } from 'lucide-react'

export default function Header({ hideNavigation = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 bg-ivory dark:bg-prussian-darker py-2  z-[90] shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo_clarus.jpg"
            alt="Clarus Logo"
            width={40}
            height={40}
            priority
            className="rounded-full object-cover"
          />
          <span className="text-2xl font-bold text-gradient-custom">
            Clarus
          </span>
        </Link>

        {/* Mostra la navigazione solo se hideNavigation è false */}
        {!hideNavigation && (
          <>
            {/* Menu button for mobile/tablet */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-4 items-center">
                <li>
                  <a 
                    href="#features" 
                    onClick={(e) => scrollToSection(e, 'features')} 
                    className="nav-link flex items-center gap-2"
                  >
                    <LayoutGrid size={18} />
                    Funzionalità
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => scrollToSection(e, 'contact')} 
                    className="nav-link flex items-center gap-2"
                  >
                    <Mail size={18} />
                    Contatti
                  </a>
                </li>
                <li>
                  <Button asChild variant="secondary">
                    <Link href="/auth/login">Accedi</Link>
                  </Button>
                </li>
                {/* <li>
                  <ThemeToggle />
                </li> */}
              </ul>
            </nav>

            {/* Mobile/Tablet offcanvas menu */}
            <div className={`
              fixed inset-0 z-[999] transition-opacity lg:hidden
              ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}>
              <div 
                className={`
                  fixed right-0 top-0 h-full 
                  bg-ivory dark:bg-prussian-darker
                  shadow-[-4px_0_10px_rgba(0,0,0,0.1)]
                  transition-transform transform duration-300 ease-in-out
                  md:w-auto md:min-w-[300px]
                  ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                  w-full
                  z-[999]
                `}
              >
                <div className="p-4">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
                  >
                    <X size={24} />
                  </button>
                  
                  <ul className="flex flex-col space-y-4 mt-12">
                    <li>
                      <a 
                        href="#features" 
                        onClick={(e) => scrollToSection(e, 'features')} 
                        className="nav-link flex items-center gap-2 py-2"
                      >
                        <LayoutGrid size={18} />
                        Funzionalità
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#contact" 
                        onClick={(e) => scrollToSection(e, 'contact')} 
                        className="nav-link flex items-center gap-2 py-2"
                      >
                        <Mail size={18} />
                        Contatti
                      </a>
                    </li>
                    <li>
                      <Button asChild variant="secondary" className="w-full">
                        <Link href="/auth/login">Accedi</Link>
                      </Button>
                    </li>
                    {/* <li className="flex justify-center">
                      <ThemeToggle />
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mostra sempre il theme toggle anche quando la navigazione è nascosta */}
        {hideNavigation && (
          <div className="flex items-center">
            {/* <ThemeToggle /> */}
          </div>
        )}
      </div>
    </header>
  )
}