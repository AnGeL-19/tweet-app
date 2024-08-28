import React from 'react'
import { Button } from '../../ui/button'
import { CircleX } from 'lucide-react'

interface Props {
    src: string;
    alt: string;
    removeImage: () => void
}

export const ImageSelected = ({ src, alt,  removeImage }:Props) => {
  return (
    <div className='relative h-40 w-36 '>
        <img src={src} alt={alt} className='w-full h-full rounded-sm' />
        <Button type='button' className='absolute top-0 right-0 rounded-full h-4 w-4 p-0' onClick={removeImage}>
            <CircleX className='h-4 w-4' />
        </Button>
    </div>
  )
}
