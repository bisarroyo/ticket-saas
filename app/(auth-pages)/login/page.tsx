'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/authActions'

export default function LoginPage() {
  const [error, formAction, isPending] = useActionState(login, {
    error: ''
  })
  console.log('state', error)
  return (
    <form action={formAction}>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button type='submit'>{isPending ? 'Loading...' : 'Login'}</button>
    </form>
  )
}
