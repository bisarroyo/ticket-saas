'use client'

import { useActionState } from 'react'
import { signup } from '@/app/actions'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signup, null)

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
