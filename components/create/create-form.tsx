'use client'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// validation
import { createSchema } from '@/utils/validations/validations'

// components
import InputClient from '@/components/ui/input-client'
import Button from '@/components/ui/button'
import DateRange from '@/components/ui/date-range'
import TextArea from '@/components/ui/text-area'
import FileUpload from '@/components/ui/file-upload'
import PriceInputGroup from '@/components/ui/price-input-group'
import TagInput from '@/components/ui/tag-input'

// supabase
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

type FormInputs = z.infer<typeof createSchema>

const CreateForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    // watch,
    formState: { errors, isSubmitting }
  } = useForm<FormInputs>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
      date_start: '',
      date_end: '',
      description: '',
      url: '',
      capacity: 0,
      // event_image: '',
      aditional_info: [],
      prices: [{ location: '', price: 0 }]
    },
    mode: 'onTouched'
  })

  const { fields, append, remove } = useFieldArray({
    name: 'prices',
    control
  })

  const supabase = createClient()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let imageUrl = null
    console.log('data', data)

    try {
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${fileName}`
        const { error: uploadError } = await supabase.storage
          .from('ticket/events')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          })
        if (uploadError) {
          console.error(uploadError)
          return
        }
        const {
          data: { publicUrl }
        } = supabase.storage.from('ticket/events').getPublicUrl(filePath)
        if (publicUrl) {
          imageUrl = publicUrl
        }
      }

      const {
        data: { user }
      } = await supabase.auth.getUser()
      const { data: insertedEvent, error } = await supabase
        .from('events')
        .insert([
          {
            aditional_info: data.aditional_info ?? [],
            capacity: data.capacity,
            description: data.description ?? null,
            is_active: true,
            is_online: false,
            name: data.name,
            prices: data.prices ?? [],
            date: data.date_start,
            starts_at: data.date_start,
            ends_at: data.date_end,
            status: data.status ?? 'draft',
            url: data.url ?? null,
            user_manager: user?.id ?? '',
            event_image: imageUrl ?? '',
            venue_id: 'default-venue-id' // Cambia esto por el ID del venue que desees
          }
        ])
        .select()
      if (error) {
        console.error('Error al guardar evento:', error)
      } else {
        console.log('Evento creado con éxito')
        if (insertedEvent && insertedEvent.length > 0) {
          const eventId = insertedEvent[0].id

          const { error: locationError } = await supabase
            .from('locations')
            .insert([
              {
                address: 'Estadio Nacional',
                name: 'San Jose',
                // address: data.address ?? null,
                // name: data.location_name ?? null,
                event_id: eventId
              }
            ])

          if (locationError) {
            console.error('Error al guardar la ubicación:', locationError)
          } else {
            console.log('Ubicación guardada con éxito')
          }
        }
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <section className='max-w-2xl mx-auto px-4 py-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 w-full'>
        <FileUpload
          id='event_image'
          onChange={(imgFile) => {
            setImageFile(imgFile)
          }}
          // error={errors?.event_image?.message}
        />

        <InputClient
          id='name'
          type='text'
          placeholder='Nombre del evento'
          {...register('name')}
          error={errors?.name?.message}
        />

        <TextArea
          id='description'
          placeholder='Descripción'
          {...register('description')}
          error={errors?.description?.message}
        />

        <DateRange
          startName='date_start'
          endName='date_end'
          setValue={setValue}
          errors={errors}
        />

        <InputClient
          id='url'
          type='text'
          placeholder='URL personalizada del evento'
          {...register('url')}
          error={errors?.url?.message}
        />

        <InputClient
          id='capacity'
          type='number'
          placeholder='Capacidad'
          {...register('capacity', { valueAsNumber: true })}
          error={errors?.capacity?.message}
        />

        <TagInput
          label='Información adicional'
          name='aditional_info'
          control={control}
        />

        <div className='space-y-2'>
          <p className='font-semibold'>Precios por ubicación:</p>
          {fields.map((field, index) => (
            <PriceInputGroup
              key={field.id}
              index={index}
              register={register}
              remove={remove}
              errors={errors}
            />
          ))}
          <button
            type='button'
            className='text-sm cursor-pointer text-blue-600'
            onClick={() => append({ location: '', price: 0 })}>
            + Agregar otro precio
          </button>
        </div>

        <Button
          text='Crear evento'
          textLoading='Creando...'
          isPending={isSubmitting}
          type='submit'
        />
      </form>
    </section>
  )
}

export default CreateForm
