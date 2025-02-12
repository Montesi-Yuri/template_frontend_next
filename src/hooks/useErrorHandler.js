import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const useErrorHandler = () => {
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleError = useCallback((err) => {
    setError(err.response?.data || err)
    
    if (err.response?.status === 401) {
      router.push('/auth/login')
    }
  }, [router])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    handleError,
    clearError
  }
} 