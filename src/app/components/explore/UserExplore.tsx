
import { UserRecommended } from '../home/whoFollow/UserRecommended'
import { UserRecomment } from '@/core/domain/entities/user.entity'

interface Props{
    user: UserRecomment,
    children?: React.ReactNode
}

export const UserExplore = ({ user, children }: Props) => {
  return (
    <article className='w-full rounded bg-white shadow p-2'>
        <UserRecommended key={user.id} user={user} />

        {children}
    </article>
  )
}
