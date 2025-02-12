'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useError } from '@/providers/ErrorProvider'
import axios from '@/lib/axios'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { routes } from '@/config/routes'

// Mappatura degli ID numerici ai nomi dei moduli
const MODULE_MAP = {
  1: 'customers',
  2: 'invoices',
  3: 'users',
  4: 'roles',
  5: 'modules',
};

export default function Dashboard() {
  const router = useRouter()
  const { handleError } = useError()
  const [userData, setUserData] = useState(null)
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        const userResponse = await axios.get('/api/user')
        setUserData(userResponse.data.user)

        const modulesResponse = await axios.get('/api/modules/active')
        setModules(modulesResponse.data)

        setLoading(false)
      } catch (err) {
        handleError(err)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router, handleError])

  const hasUnreadNotifications = userData?.notifications?.some(notification => !notification.read)

  if (loading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner 
          message="Caricamento della dashboard..." 
          fullScreen={true}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 relative z-[1]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Sezione Benvenuto e Notifiche */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card Benvenuto */}
          <div className={`card ${!hasUnreadNotifications ? 'md:col-span-2' : ''}`}>
            <h2 className="text-2xl font-semibold text-prussian dark:text-ivory mb-2">
              Benvenuto, {userData?.name}! 👋
            </h2>
            <p className="text-secondary">
              Seleziona uno dei moduli disponibili per iniziare a lavorare
            </p>
          </div>

          {/* Card Notifiche - mostrata solo se ci sono notifiche non lette */}
          {hasUnreadNotifications && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <Icons.Bell className="h-5 w-5 text-indigo dark:text-ash" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                </div>
                <h2 className="text-xl font-semibold text-prussian dark:text-ivory">
                  Notifiche
                </h2>
              </div>
              <ul className="space-y-3">
                {userData?.notifications
                  .filter(notification => !notification.read)
                  .map((notification) => (
                    <li 
                      key={notification.id}
                      className={`p-3 rounded-lg ${
                        notification.type === 'warning' 
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p>{notification.message}</p>
                        <button 
                          className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Segna come letto
                        </button>
                      </div>
                      <div className="mt-1 text-xs opacity-60">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sezione Moduli */}
        <section className="relative z-[2]">
          <h2 className="text-2xl font-bold text-ivory mb-6 relative z-[2]">
            Moduli Disponibili
          </h2>
          <div className="flex flex-wrap gap-6">
            {modules.map((module) => {
              const Icon = Icons[module.icon] || Icons.FileText;
              const moduleKey = MODULE_MAP[module.id];
              
              return (
                <Button
                  key={module.id}
                  variant="outline"
                  className="relative bg-white/90 dark:bg-prussian-darker/90 backdrop-blur-sm
                    basis-full md:basis-[calc(50%-12px)] xl:basis-[calc(33.333%-16px)]
                    min-h-[180px] p-4 sm:p-6
                    border border-ash/20 dark:border-prussian/50
                    rounded-xl shadow-lg
                    flex flex-col items-center justify-center gap-3
                    hover:scale-105 hover:bg-white dark:hover:bg-prussian-darker
                    transition-all duration-200
                    group
                    overflow-hidden"
                  onClick={() => {
                    const moduleRoute = routes[moduleKey]?.index;
                    
                    if (moduleRoute) {
                      router.push(moduleRoute);
                    } else {
                      handleError({
                        message: `Errore nella navigazione: percorso non trovato per il modulo "${module.display_name}"`,
                      });
                    }
                  }}
                >
                  <Icon 
                    className="h-8 w-8 sm:h-10 sm:w-10 text-indigo dark:text-ash 
                      group-hover:text-indigo-light dark:group-hover:text-ivory 
                      transition-colors
                      flex-shrink-0" 
                  />
                  <div className="text-center w-full">
                    <h3 className="text-base sm:text-lg font-semibold text-prussian dark:text-ivory mb-2
                      group-hover:text-indigo dark:group-hover:text-ivory"
                    >
                      {module.display_name}
                    </h3>
                    <p className="text-xs sm:text-sm text-prussian/70 dark:text-ivory/70
                      group-hover:text-prussian dark:group-hover:text-ivory/90
                      line-clamp-2 px-2"
                    >
                      {module.description}
                    </p>
                  </div>
                </Button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
} 