import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const ChatWhitUser = () => {
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='flex gap-3 items-center mb-2'>
          <Link to={'/chats'}>
            <Button className='rounded-full bg-transparent p-0'>
              <ArrowLeftCircle className='w-10 h-10 text-zinc-300' />
            </Button>
          </Link>
          <div className={`w-full flex gap-4 items-center p-2`}>
            <Avatar>
                <AvatarImage src={'https://res.cloudinary.com/dajit1a8r/image/upload/v1725576539/xvl1ablex1svm5rahgur.jpg'}></AvatarImage>
                <AvatarFallback>Angel</AvatarFallback>
            </Avatar>
            <span className={`text-xl font-medium text-darkPrimary`}>
                Angel
            </span>
          </div>
        </div>
      <div className='w-full h-full flex flex-grow flex-col'>
        <div className='w-full h-full pt-3 flex flex-col items-start justify-end'>

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

        </div>
        <div className='w-full h-20 bg-slate-600'>

        </div>
      </div>
    </div>
  )
}
