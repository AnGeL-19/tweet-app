import { formatNumber } from '@/app/lib/formatNumber'

import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

import { type IUserAvatar } from '@/app/interfaces/post.interface';

interface Props{
    user: IUserAvatar;
    info: string;
}

export const UserAvatar = ({ user: { id, name, profileImage }, info }:Props) => {
  return (
    <Link
        className='flex gap-3 w-fit'
        to={`/profile/${id}`}
    >
        <Avatar>
            <AvatarImage  src={profileImage} />
            <AvatarFallback className='text-black'>{name}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
            <span className='text-base text-darkPrimary font-medium hover:underline'>{name}</span>
            <span className='text-xs text-darkLight'>{info}</span>
        </div>
    </Link>
  )
}
