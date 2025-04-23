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
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre demasiado largo'),

  date_start: z.string().min(1, 'La fecha de inicio es obligatoria'),

  date_end: z.string().min(1, 'La fecha de finalización es obligatoria'),

  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),

  url: z
    .string()
    .min(1, 'La URL del evento es obligatoria')
    // validación de URL personalizada
    .regex(
      /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,})+([\/\w .-]*)*\/?$/,
      'La URL personalizada no es válida'
    ),

  capacity: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .min(1, 'Debe haber al menos un espacio disponible'),

  // event_image: z.string().url('Debe ser una URL válida de imagen'),

  aditional_info: z.array(z.string()).optional(),

  prices: z
    .array(
      z.object({
        location: z.string().min(1, 'Ubicación requerida'),
        price: z
          .number({ invalid_type_error: 'Debe ser un número' })
          .min(0, 'El precio debe ser mayor o igual a 0')
      })
    )
    .min(1, 'Debe agregar al menos un precio'),

  status: z.string().optional()
})
