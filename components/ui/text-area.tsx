import { cn } from '@/lib/utils'

interface InputProps extends React.HTMLProps<HTMLTextAreaElement> {
  id: string
  label?: string
  error?: string
}

const TextArea: React.FC<InputProps> = ({
  id,
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className='flex flex-col justify-start items-start w-full'>
      <div className='flex flex-col w-full relative'>
        <label>
          {label}
          <textarea
            id={id}
            className={cn(
              'pl-4 pr-8 py-2 w-full h-auto border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50 text-foreground resize-none',
              error && 'border-danger focus:ring-danger',
              className
            )}
            rows={5}
            {...props}
          />
        </label>
      </div>
      {error && (
        <p className='text-red-500 text-sm w-full'>
          {error && <span>{error}</span>}
        </p>
      )}
    </div>
  )
}

export default TextArea
