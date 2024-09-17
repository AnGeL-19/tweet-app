
import { UserAvatar } from '../shared/user/UserAvatar'
import { type UserFollow as IUserFollow } from '@/core/domain/entities/user.entity'
import { useAppSelector } from '@/app/context/store/hook';
import { formatNumber } from '@/app/lib/formatNumber';
import { ButtonFollow } from '../shared/common/ButtonFollow';

interface Props {
    user: IUserFollow;
}

export const UserFollow = ({user}:Props) => {

  const userAuth = useAppSelector( state => state.auth.user )

  return (
    <div className='flex flex-col gap-3 pb-4 mr-4'>
        <div className='flex justify-between'>
            <UserAvatar user={user} info={formatNumber(user.numFollowers,'follower')} />
            {
              userAuth?.id !== user.id
              &&
              <ButtonFollow userId={user.id} isFolling={user.isFollowing} />
            }
            
        </div>
        <p className='text-sm text-darkLight font-medium'>{user.bio}</p>
    </div>
  )
}
