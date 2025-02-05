import { cn } from '@/lib/utils'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  label?: string
  icon?: React.ReactNode
  error?: string
}

const InputClient: React.FC<InputProps> = ({
  id,
  label,
  icon,
  error,
  className,
  ...props
}) => {
  return (
    <div className='flex flex-col justify-start items-start w-full'>
      <div className='flex flex-col w-full relative'>
        <label>
          {label}
          <input
            id={id}
            className={cn(
              'pl-4 pr-8 py-2 w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50 text-primary-foreground',
              error && 'border-danger focus:ring-danger',
              className
            )}
            {...props}
          />
        </label>
        {icon}
      </div>
      {error && (
        <p className='text-red-500 text-sm w-full'>
          {error && <span>{error}</span>}
        </p>
      )}
    </div>
  )
}

export default InputClient
