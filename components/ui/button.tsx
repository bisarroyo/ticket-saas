import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'text-md py-2 px-4 text-center rounded-md   focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xl hover:bg-primary',
        danger:
          'bg-danger text-danger-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface InputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string
  textLoading?: string
  isPending?: boolean
  type?: 'submit' | 'reset' | 'button'
}

const Button: React.FC<InputProps> = ({
  text,
  textLoading,
  isPending,
  type,
  className,
  variant,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      disabled={isPending}
      type={type}
      {...props}
    >
      {isPending ? textLoading : text}
    </button>
  )
}

export default Button
