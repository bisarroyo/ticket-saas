import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Button from './ui/button'

export const Modal = ({
  isOpen,
  onClose,
  hasCloseBtn,
  children
}: {
  isOpen: boolean
  onClose: () => void
  hasCloseBtn: boolean
  children: React.ReactNode
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleClose])

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
  }, [isOpen, handleClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='fixed inset-0 z-50 flex items-center justify-center'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-gray-900'
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='relative z-10 flex items-center justify-center bg-white p-5 rounded-lg min-w-[300px] max-w-[600px] min-h-[300px] max-h-[600px] overflow-y-auto'
            ref={dropdownRef}
          >
            {hasCloseBtn && (
              <button
                onClick={handleClose}
                className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100'
              >
                &times;
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const App = ({
  children,
  buttonText
}: {
  children: React.ReactNode
  buttonText: string
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <div className='App'>
      <Button onClick={() => setModalOpen(true)} text={buttonText} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        hasCloseBtn={true}
      >
        {children}
      </Modal>
    </div>
  )
}

export default App
