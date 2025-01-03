import { Provider } from '@supabase/supabase-js'
import { createClient } from './client'

export default async function socialAuth(provider: Provider) {
  const supabase = createClient()
  const origin = window.location.origin
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/`
    }
  })

  if (error) {
    return { error: error.message }
  }
  return { success: true }
}
