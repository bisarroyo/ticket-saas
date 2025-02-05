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

export const forgotSchema = z.object({
  email: z.string().email({
    message: 'Debe ingresar una dirección de correo electrónico válida.'
  })
})

export const resetSchema = z.object({
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.'
  }),
  passwordConfirm: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.'
  })
})

export const updateSchema = z.object({
  full_name: z.string().min(3, {
    message: 'El nombre debe ser mayor a 3 caracteres.'
  }),
  email: z.string().email({
    message: 'Debe ingresar una dirección de correo electrónico válida.'
  })
})

export const createSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe ser mayor a 3 caracteres.'
  }),
  date_start: z.string(),
  date_end: z.string(),
  description: z.string(),
  status: z.string(),
  url: z.string(),
  capacity: z.number(),
  event_image: z.string(),
  aditional_info: z.array(z.string()),
  prices: z.array(
    z.object({
      location: z.string(),
      price: z.number()
    })
  )
})
