'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)
  console.log('state', state)
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
