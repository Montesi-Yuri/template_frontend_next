import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('Richiesta di login ricevuta:', body)
    
    // Qui dovresti implementare la tua logica di autenticazione
    // Per ora, facciamo un mock della risposta
    if (body.email && body.password) {
      console.log('Credenziali valide, login in corso...')
      
      // Login simulato con successo
      return NextResponse.json({ 
        success: true,
        message: 'Login effettuato con successo',
        user: {
          email: body.email
        }
      })
    }

    console.log('Credenziali non valide')
    return NextResponse.json(
      { message: 'Credenziali non valide' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Errore del server:', error)
    return NextResponse.json(
      { message: 'Errore del server' },
      { status: 500 }
    )
  }
} 