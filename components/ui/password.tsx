import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  label: string
  error?: { type: string; message: string }[]
}

const InputPassword: React.FC<InputProps> = ({
  id,
  label,
  error,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const showPasswordField = () => {
    setShowPassword(!showPassword)
  }

  const checkType = (
    error: { type: string; message: string }[] | undefined,
    type: string
  ) => {
    return error?.some((err) => err.type === type)
  }
  return (
    <div className='flex flex-col w-full mb-4 relative'>
      <label>
        {label}
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'bg-transparent pl-4 pr-8 py-2  w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50',
            checkType(error, id) && 'border-danger',
            className
          )}
          {...props}
        />
      </label>
      <div
        onClick={showPasswordField}
        className='absolute bottom-0 end-0 cursor-pointer h-[42px] px-2 flex items-center justify-center'
      >
        {showPassword ? (
          <Eye strokeWidth={1.5} size='20' color='var(--muted-foreground)' />
        ) : (
          <EyeOff strokeWidth={1.5} size='20' color='var(--muted-foreground)' />
        )}
      </div>
    </div>
  )
}

export default InputPassword
