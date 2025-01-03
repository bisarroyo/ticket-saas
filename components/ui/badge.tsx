import { cn } from '@/lib/utils'

type Props = {
  title: string
  text: string
  bg: string
  icon: React.ReactNode
}

export default function Badge({ title, text, bg, icon }: Props) {
  return (
    <div
      className={cn(
        'flex flex-wrap flex-col items-center justify-center p-2 rounded-xl border ${bg}',
        bg && bg
      )}
    >
      <div className='flex items-center gap-2'>
        {icon}
        <p className='text-md text-slate-800'>{title}</p>
      </div>
      <p>{text}</p>
    </div>
  )
}
