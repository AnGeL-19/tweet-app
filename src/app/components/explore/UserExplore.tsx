import React from 'react'
import { UserRecommended } from '../home/whoFollow/UserRecommended'
import { UserRecomment } from '@/core/domain/entities/user.entity'

interface Props{
    user: UserRecomment
}

export const UserExplore = ({ user }: Props) => {
  return (
    <article className='w-full rounded bg-white shadow p-2'>

        <UserRecommended key={user.id} user={user} />
    </article>
  )
}
