import { IUser } from '@/app/interfaces/user.interface'
import React from 'react'
import { UserRecommended } from './UserRecommended'
import { Separator } from '../../ui/separator'
import { UserRecomment } from '@/core/domain/entities/user.entity'
import { UserSearch, UserX } from 'lucide-react'

interface Props {
  users: UserRecomment[]
}

export const ListRecommended = ({users}:Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {
        users.length !== 0
        ? users.map((user, index) => (
          <div key={user.id}>
            <UserRecommended  user={user} />
            { (index < users.length-1) && <Separator className='mt-4 mb-2' /> } 
          </div>
        ))
        : (
          <div className='bg-zinc-100 p-1 rounded flex justify-center items-center'>
            <span className='font-normal mr-2'>No users</span>
            <UserSearch className='w-4 h-4' />
          </div>
        )
      }
    </div>
)
}
