import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  error?: boolean
}

const InputPassword: React.FC<InputProps> = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const showPasswordField = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='flex flex-col w-full mb-4 relative'>
      <label>
        {label}
        <input
          type={showPassword ? 'text' : 'password'}
          min='8'
          className='bg-transparent pl-4 pr-8 py-2  w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50'
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
