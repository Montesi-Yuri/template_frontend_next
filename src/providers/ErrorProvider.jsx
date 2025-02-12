'use client'

import { createContext, useContext } from 'react'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { ErrorDisplay } from '@/components/ui/error-display'

const ErrorContext = createContext(null)

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

export function ErrorProvider({ children }) {
  const { error, handleError, clearError } = useErrorHandler()

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {error && <ErrorDisplay error={error} onClose={clearError} />}
      {children}
    </ErrorContext.Provider>
  )
} 