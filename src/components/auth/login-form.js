"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useError } from '@/providers/ErrorProvider'
import axios from '@/lib/axios'

export default function LoginForm() {
  const router = useRouter()
  const { handleError } = useError()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prima otteniamo il CSRF token
      await axios.get('/sanctum/csrf-cookie')
      
      // Poi facciamo la richiesta di login
      const response = await axios.post('/api/login', formData)

      // Se arriviamo qui, il login è avvenuto con successo
      if (response.data?.user) {
        router.push('/dashboard')
      } else {
        handleError({ 
          message: 'Risposta non valida dal server',
          type: 'server_error'
        })
      }
      
    } catch (err) {
      const errorData = err.response?.data;
      
      // Non reindirizzare in caso di errori
      if (errorData?.type === 'auth_error' || errorData?.type === 'validation_error') {
        handleError({
          message: errorData.message,
          type: errorData.type
        });
      } else {
        // Per errori server mostriamo i dettagli tecnici
        handleError(err.response?.data || {
          message: 'Si è verificato un errore durante il login',
          type: 'server_error'
        });
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-prussian dark:text-ivory">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-prussian dark:text-ivory">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          disabled={loading}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-indigo focus:ring-indigo border-ash dark:border-prussian-light rounded bg-ivory dark:bg-prussian"
            disabled={loading}
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-prussian dark:text-ivory">
            Rimani connesso
          </label>
        </div>

        <a href="#" className="text-sm text-indigo hover:text-indigo-light dark:text-ash dark:hover:text-ivory transition-colors">
          Password dimenticata?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Accesso in corso...' : 'Accedi'}
      </button>
    </form>
  )
}