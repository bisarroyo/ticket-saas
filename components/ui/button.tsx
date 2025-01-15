interface InputProps extends React.HTMLProps<HTMLButtonElement> {
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
  ...props
}) => {
  return (
    <button
      className=' text-md py-2 px-4 text-center bg-primary rounded-md text-white mt-4 hover:bg-primary-foreground focus:ring-4 focus:outline-none focus:ring-primary-foreground/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={isPending}
      type={type}
      {...props}
    >
      {isPending ? textLoading : text}
    </button>
  )
}

export default Button
