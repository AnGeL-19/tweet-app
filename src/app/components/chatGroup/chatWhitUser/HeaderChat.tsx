import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

export const HeaderChat = () => {
  return (
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
  )
}
