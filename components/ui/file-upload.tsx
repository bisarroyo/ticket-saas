'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'

interface FileUploadProps {
  id: string
  value?: string
  onChange?: (acceptedFile: File) => void
  error?: string
}

const FileUpload = ({ id, value, onChange, error }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setPreview(null)

      setPreview(URL.createObjectURL(file))
      onChange?.(file)
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  })

  useEffect(() => {
    if (value) setPreview(value)
  }, [value])

  return (
    <div className='w-full flex flex-col gap-2'>
      <label htmlFor={id} className='text-md font-semibold'>
        Imagen del evento
      </label>
      <div
        {...getRootProps()}
        className={twMerge(
          'flex items-center justify-center w-full rounded-2xl transition h-40 text-sm cursor-pointer bg-slate-100',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-neutral-300 dark:border-neutral-600',
          preview && 'border-green-500 bg-green-50'
        )}>
        <input id={id} {...getInputProps()} />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt='Preview'
            className='h-full object-contain rounded-xl'
          />
        )}
        {preview === null && (
          <p className='text-neutral-500 dark:text-neutral-400 text-center'>
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>
        )}
      </div>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  )
}

export default FileUpload
