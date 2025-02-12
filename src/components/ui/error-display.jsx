'use client'

import { Button } from '@/components/ui/button'
import { createPortal } from 'react-dom'
import { XCircle, AlertCircle, AlertTriangle, XIcon } from 'lucide-react'

export const ErrorDisplay = ({ error, onClose }) => {
  if (!error) return null;

  // Determina lo stile e l'icona in base al tipo di errore
  const getErrorConfig = () => {
    if (error.errors) { // Se abbiamo errori di validazione
      return {
        style: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
        textColor: 'text-orange-800 dark:text-orange-200',
        icon: AlertTriangle,
        title: 'Errore di Validazione'
      };
    }

    switch (error.type) {
      case 'auth_error':
        return {
          style: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
          textColor: 'text-amber-800 dark:text-amber-200',
          icon: AlertCircle,
          title: 'Errore di Autenticazione'
        };
      default:
        return {
          style: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
          textColor: 'text-red-800 dark:text-red-200',
          icon: XCircle,
          title: 'Errore'
        };
    }
  };

  const { style, textColor, icon: Icon, title } = getErrorConfig();
  const showTechnicalDetails = !error.type && process.env.NODE_ENV === 'development';

  const ErrorModal = (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className={`
        w-full max-w-2xl rounded-xl shadow-lg overflow-hidden
        border ${style} backdrop-blur-md
      `}>
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${style}`}>
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${textColor}`} />
            <h3 className={`text-lg font-semibold ${textColor}`}>
              {title}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={`hover:bg-black/5 ${textColor}`}
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <p className={`${textColor} text-base`}>
              {error.message}
            </p>
            {error.errors && (
              <ul className="list-disc list-inside space-y-1 text-sm">
                {Object.entries(error.errors).map(([field, messages]) => (
                  <li key={field} className={textColor}>
                    {Array.isArray(messages) ? messages.join(', ') : messages}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {showTechnicalDetails && (
            <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800 space-y-3">
              <div className="space-y-1">
                {error.exception && (
                  <div>
                    <h4 className={`text-sm font-medium ${textColor}`}>Tipo Eccezione:</h4>
                    <p className="font-mono text-xs text-red-600 dark:text-red-400 break-all">
                      {error.exception}
                    </p>
                  </div>
                )}
                {error.file && (
                  <div>
                    <h4 className={`text-sm font-medium ${textColor}`}>File:</h4>
                    <p className="font-mono text-xs text-red-600 dark:text-red-400 break-all">
                      {error.file}:{error.line}
                    </p>
                  </div>
                )}
              </div>
              {error.trace && (
                <div>
                  <h4 className={`text-sm font-medium ${textColor} mb-2`}>Stack Trace:</h4>
                  <div className="max-h-[40vh] overflow-y-auto">
                    <pre className="bg-white dark:bg-prussian/50 p-3 rounded-lg text-xs font-mono overflow-x-auto border border-red-100 dark:border-red-900">
                      {error.trace.map((t, i) => (
                        <div key={i} className="mb-1 text-red-600/90 dark:text-red-400/90 whitespace-pre-wrap break-all">
                          {t.file}:{t.line} - {t.function}
                          {t.class && ` (${t.class})`}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/5 dark:bg-white/5 flex justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className={`text-sm hover:${textColor}`}
          >
            Chiudi
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(ErrorModal, document.body);
}; 