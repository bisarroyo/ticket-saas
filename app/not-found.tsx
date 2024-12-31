import Link from 'next/link'
import { ArrowLeft, TriangleAlert } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center px-6 py-20 sm:py-28 lg:px-8 bg-background'>
      <div className='text-center'>
        <TriangleAlert />
        <p className='text-base font-semibold text-primary'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl'>
          Página no encontrada
        </h1>
        <p className='mt-6 text-base leading-7 text-muted-foreground max-w-md mx-auto'>
          Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
          que haya sido movida o eliminada.
        </p>

        <div className='mt-10 flex justify-center gap-4'>
          <Link
            href='/'
            className='group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200  '
          >
            <ArrowLeft
              className='h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200'
              strokeWidth={1.5}
            />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
