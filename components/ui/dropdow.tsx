'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  children: React.ReactNode
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  children,
  className
}) => {
  return (
    <div
      className={cn(
        'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 border-b transition-colors duration-200',
        className
      )}
    >
      {icon}
      {children}
    </div>
  )
}

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  children: React.ReactNode
}

export const Dropdown: React.FC<DropdownProps> = ({
  text,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      {/* Botón del Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-md font-medium text-gray-700 shadow-sm hover:bg-gray-50'
      >
        <p>{text}</p>
        <ChevronDown />
      </button>

      {/* Dropdown con animaciones */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className={cn(
              'absolute right-0 z-10 mt-2 min-w-full origin-top-right rounded-md bg-white shadow-lg focus:outline-none overflow-hidden',
              className
            )}
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
