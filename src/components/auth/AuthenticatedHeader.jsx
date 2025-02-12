'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { UserCircle, LogOut, Settings, Menu, X } from 'lucide-react'

export default function AuthenticatedHeader() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', message: '' })

  const handleFeatureClick = (feature) => {
    setDialogContent({
      title: `${feature} non disponibile`,
      message: `La funzionalità "${feature}" è attualmente in fase di sviluppo e sarà disponibile a breve.`
    })
    setShowDialog(true)
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Errore durante il logout')
      }

      // Se il logout ha successo, reindirizza alla pagina di login
      router.push('/auth/login')
      
    } catch (error) {
      console.error('Errore durante il logout:', error)
      // Qui potresti mostrare un messaggio di errore all'utente
    } finally {
      setIsLoggingOut(false)
      setIsMenuOpen(false)
    }
  }

  const navigationItems = [
    /* {
      icon: <UserCircle size={20} />,
      label: 'Profilo',
      onClick: () => handleFeatureClick('Profilo')
    },
    {
      icon: <Settings size={20} />,
      label: 'Impostazioni',
      onClick: () => handleFeatureClick('Impostazioni')
    } */
  ]

  return (
    <>
      <header className="bg-ivory dark:bg-prussian-darker rounded-b-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className='w-10'></div>

            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient-custom">
                Clarus
              </span>
            </Link>

            {/* Menu button for mobile/tablet */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-4">
              <nav>
                <ul className="flex items-center gap-4">
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 text-prussian dark:text-ivory hover:text-indigo dark:hover:text-ash"
                        onClick={item.onClick}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Button>
                    </li>
                  ))}
                  <li>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-2 text-prussian dark:text-ivory hover:text-indigo dark:hover:text-ash"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut size={20} />
                      <span>{isLoggingOut ? 'Uscita...' : 'Logout'}</span>
                    </Button>
                  </li>
                  {/* <li>
                    <ThemeToggle />
                  </li> */}
                </ul>
              </nav>
            </div>

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
                    {navigationItems.map((item, index) => (
                      <li key={index}>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2 text-prussian dark:text-ivory hover:text-indigo dark:hover:text-ash w-full justify-start"
                          onClick={item.onClick}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Button>
                      </li>
                    ))}
                    <li>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 text-prussian dark:text-ivory hover:text-indigo dark:hover:text-ash w-full justify-start"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        <LogOut size={20} />
                        <span>{isLoggingOut ? 'Uscita...' : 'Logout'}</span>
                      </Button>
                    </li>
                   
                    {/* <li>
                      <ThemeToggle />
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </header>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="rounded-xl border-none">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>
              {dialogContent.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              className="w-full bg-indigo hover:bg-indigo-light text-ivory" 
              onClick={() => setShowDialog(false)}
            >
              Ho capito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 