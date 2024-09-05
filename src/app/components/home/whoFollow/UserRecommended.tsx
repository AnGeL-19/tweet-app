
import { formatNumber } from '@/app/lib/formatNumber'
import { UserAvatar } from '../../shared/user/UserAvatar'
import { UserRecomment } from '@/core/domain/entities/user.entity'
import { ButtonFollow } from '../../shared/ButtonFollow'

interface Props {
  user: UserRecomment
}

export const UserRecommended = ({user}:Props) => {

  return (
    <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
            <UserAvatar 
              user={user}
              info={formatNumber(user.numFollowers, 'follower')} 
            />

            <ButtonFollow userId={user.id} />
        </div>
        { user.bio && <p className='text-darkLight text-sm font-medium'>{user.bio || ''}</p> } 
                   
    </div>
  )
}
