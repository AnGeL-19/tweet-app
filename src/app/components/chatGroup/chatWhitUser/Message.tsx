import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

export const Message = () => {
  return (
    <div className='flex gap-3'>
        <Avatar>
            <AvatarImage src={'https://res.cloudinary.com/dajit1a8r/image/upload/v1725576539/xvl1ablex1svm5rahgur.jpg'}></AvatarImage>
            <AvatarFallback>Angel</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 bg-zinc-50 p-2 rounded-md shadow-sm'>
        <div className='flex gap-3 items-center'>
            <span className='text-lg font-medium text-darkPrimary capitalize'>Angel</span>
            <time className='text-xs font-semibold text-darkLight'>06/09/2024</time>
        </div>
        <div className='w-full'>
            <p className='text-base text-darkSemiBold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quasi itaque nostrum facilis incidunt modi fuga, eligendi temporibus reiciendis blanditiis? Expedita animi reiciendis beatae, tenetur blanditiis error qui dolore delectus!</p>
        </div>
        </div>
    </div>
  )
}
