import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email({
    message: 'Debe ingresar una dirección de correo electrónico válida.'
  }),
  fullname: z.string().min(3, {
    message: 'El nombre debe ser mayor a 3 caracteres.'
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.'
  }),
  passwordConfirm: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.'
  })
})

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Debe ingresar una dirección de correo electrónico válida.'
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.'
  })
})
