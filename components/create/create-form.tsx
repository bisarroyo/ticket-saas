'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// validation
import { createSchema } from '@/utils/validations/validations'
import InputClient from '@/components/ui/input-client'
import Button from '@/components/ui/button'

import { Pen } from 'lucide-react'
import DateRange from '../ui/date-range'

interface FormInputs {
  name: string
  date_start: string
  date_end: string
  description: string
  status: string
  url: string
  capacity: number
  event_image: string
  aditional_info: string[]
  prices: {
    location: string
    price: number
  }[]
}

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
      date_start: '',
      date_end: '',
      description: '',
      url: '',
      capacity: 0,
      event_image: '',
      aditional_info: [],
      prices: []
    },
    mode: 'onTouched'
  })

  const onSubmit: SubmitHandler<FormInputs> = (e) => {
    console.log(e)
  }

  return (
    <section>
      <div className='flex flex-col items-center justify-center min-h-fit w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-start justify-center w-full gap-4'
        >
          <InputClient
            id='name'
            type='text'
            placeholder='Nombre del evento'
            {...register('name')}
            required
            error={errors?.name?.message}
            icon={
              <Pen
                strokeWidth={1.5}
                size='20'
                color='var(--muted-foreground)'
                className='absolute bottom-3 end-2'
              />
            }
          />
          <InputClient
            id='description'
            type='text'
            placeholder='Descripción'
            {...register('description')}
            required
            error={errors?.description?.message}
            icon={
              <Pen
                strokeWidth={1.5}
                size='20'
                color='var(--muted-foreground)'
                className='absolute bottom-3 end-2'
              />
            }
          />
          <DateRange />

          <Button
            text='Actualizar perfil'
            textLoading='Actualizando...'
            isPending={true}
            type='submit'
          />
        </form>
      </div>
    </section>
  )
}

export default CreateForm
