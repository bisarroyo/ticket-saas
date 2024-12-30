interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  icon?: React.ReactNode
  error?: boolean
}

const Input: React.FC<InputProps> = ({ label, icon, ...props }) => {
  return (
    <div className='flex flex-col w-full mb-4 relative'>
      <label>
        {label}
        <input
          className='bg-transparent pl-4 pr-8 py-2 w-full border rounded-md focus:ring-1 focus-visible:outline-none focus:outline-none focus:ring-primary-foreground/50 '
          {...props}
        />
      </label>
      {icon}
    </div>
  )
}

export default Input
