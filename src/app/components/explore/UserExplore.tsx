
import { UserRecommended } from '../home/whoFollow/UserRecommended'
import { UserFollow, UserRecomment } from '@/core/domain/entities/user.entity'

interface Props{
    user: UserRecomment | UserFollow,
    children?: React.ReactNode
}

export const UserExplore = ({ user, children }: Props) => {
  return (
    <article className='w-full rounded bg-white shadow p-2'>
        <UserRecommended user={user}  />

        {children}
    </article>
  )
}
