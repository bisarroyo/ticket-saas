import { useState, useActionState } from 'react'

export default function useForm<T>(
  callback: () => Promise<{
    error: string
    inputs: { email: string; password: string }
  }>,
  initialState: T
) {
  const [inputs, setInputs] = useState<T>(initialState)

  const [state, formAction, isPending] = useActionState(callback, null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  return {
    state,
    formAction,
    isPending,
    handleInputChange,
    inputs
  }
}
