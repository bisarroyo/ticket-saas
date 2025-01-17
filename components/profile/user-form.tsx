'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// icons
import { Mail, Pen } from 'lucide-react'

// ui
import InputUserForm from './user-input'
import Button from '@/components/ui/button'

// validation
import { updateSchema } from '@/utils/validations/validations'
import type { User } from '@supabase/supabase-js'

interface FormInputs {
  full_name: string
  email: string
}

const UserForm: React.FC<{
  user: User | undefined
  loading: boolean
  updateUser: (full_name: string, email: string) => void
}> = ({ user, loading, updateUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      full_name: user?.user_metadata.full_name || '',
      email: user?.email || ''
    },
    mode: 'onTouched'
  })

  const onSubmit: SubmitHandler<FormInputs> = (e) => {
    updateUser(e.full_name, e.email)
  }

  return (
    <section>
      <div className='flex flex-col items-center justify-center min-h-fit w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-start justify-center w-full gap-4'
        >
          <InputUserForm
            label='Nombre:'
            id='email'
            type='text'
            placeholder='nombre@email.com'
            {...register('full_name')}
            required
            error={errors?.full_name?.message}
            icon={
              <Pen
                strokeWidth={1.5}
                size='20'
                color='var(--muted-foreground)'
                className='absolute bottom-3 end-2'
              />
            }
          />
          <InputUserForm
            label='Email:'
            id='email'
            type='email'
            placeholder='nombre@email.com'
            {...register('email')}
            required
            error={errors?.email?.message}
            icon={
              <Mail
                strokeWidth={1.5}
                size='20'
                color='var(--muted-foreground)'
                className='absolute bottom-3 end-2'
              />
            }
          />

          <Button
            text='Actualizar perfil'
            textLoading='Actualizando...'
            isPending={loading}
            type='submit'
          />
        </form>
      </div>
    </section>
  )
}

export default UserForm
