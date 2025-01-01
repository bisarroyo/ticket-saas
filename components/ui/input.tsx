import { cn } from '@/lib/utils'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  label: string
  icon?: React.ReactNode
  error?: { type: string; message: string }[]
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  icon,
  error,
  className,
  ...props
}) => {
  const checkType = (
    error: { type: string; message: string }[] | undefined,
    type: string
  ) => {
    return error?.some((err) => err.type === type)
  }
  return (
    <div className='flex flex-col justify-start items-start w-full'>
      <div className='flex flex-col w-full relative'>
        <label>
          {label}
          <input
            id={id}
            className={cn(
              'pl-4 pr-8 py-2 w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50',
              checkType(error, id) && 'border-danger focus:ring-danger',
              className
            )}
            {...props}
          />
        </label>
        {icon}
      </div>
      {error && (
        <p className='text-red-500 text-sm w-full'>
          {error?.map(
            (error) =>
              error.type === id && <span key={error.type}>{error.message}</span>
          )}
        </p>
      )}
    </div>
  )
}

export default Input
