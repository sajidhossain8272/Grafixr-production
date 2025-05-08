import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsApp = () => {
  return (
    <div className='fixed bottom-4 right-4 z-50'>
    <a 
      href='https://api.whatsapp.com/send/?phone=%2B8801329530468&text&type=phone_number&app_absent=0'
      className='group fixed bottom-4 right-4 z-50'
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='bg-green-500 text-white rounded-full z-50 p-4 cursor-pointer transform transition-transform hover:scale-110 glow-green'>
        <FaWhatsapp className='w-8 h-8' />
      </div>
      <div className='absolute bottom-[60px] left-1/3 z-50 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
        +8801329530468
      </div>
    </a>
  </div>  )
}

export default WhatsApp