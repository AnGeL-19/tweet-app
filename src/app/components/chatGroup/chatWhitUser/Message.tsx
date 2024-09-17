
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { type Message as IMessage } from '@/core/domain/entities/chat.entity'

interface Props {
  message: IMessage
}

export const Message = ({ message }:Props) => {
  return (
    <div className='flex gap-3'>
        <Avatar>
            <AvatarImage src={message.user.profileImage}></AvatarImage>
            <AvatarFallback>{message.user.name}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 bg-zinc-50 p-2 rounded-md shadow-sm'>
        <div className='flex gap-3 items-center'>
            <span className='text-lg font-medium text-darkPrimary capitalize'>{message.user.name}</span>
            <time className='text-xs font-semibold text-darkLight'>{new Date(message.date).toDateString()}</time>
        </div>
        <div className='w-full'>
            <p className='text-base text-darkSemiBold'>
              { message.message }
            </p>
        </div>
        </div>
    </div>
  )
}
