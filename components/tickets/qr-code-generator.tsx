'use client'

// components/QRCodeGenerator.tsx

import { QRCodeSVG } from 'qrcode.react'

interface QRCodeGeneratorProps {
  ticketId: string // Prop para recibir el ID del ticket
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ ticketId }) => {
  return (
    <div className='flex flex-col items-center max-h-xl'>
      <QRCodeSVG value={ticketId} size={200} />
    </div>
  )
}

export default QRCodeGenerator
