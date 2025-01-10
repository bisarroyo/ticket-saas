'use client'

// components/QRCodeGenerator.tsx
import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeGeneratorProps {
  ticketId: string // Prop para recibir el ID del ticket
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ ticketId }) => {
  const [inputValue, setInputValue] = useState(ticketId || '')

  return (
    <div className='flex flex-col items-center max-h-xl'>
      {inputValue && <QRCodeSVG value={ticketId} size={200} />}
    </div>
  )
}

export default QRCodeGenerator
