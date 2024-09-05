
import { UserAvatar } from '../shared/user/UserAvatar'
import { Button } from '../ui/button'
import { UserMinus, UserPlus } from 'lucide-react'
import { type UserFollow as IUserFollow } from '@/core/domain/entities/user.entity'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userService } from '@/core/domain/services/index.service';
import { useAppSelector } from '@/app/context/store/hook';
import { formatNumber } from '@/app/lib/formatNumber';

interface Props {
    user: IUserFollow;
}

export const UserFollow = ({user}:Props) => {

  const userAuth = useAppSelector( state => state.auth.user )

  const [isFollow, setIsFollow] = useState(user.isFollowing)

  const mutation = useMutation({
    mutationFn: (id: string) => userService.setFollowUnfollow(id), // aqui no agarra el login del metodo authRepository 
    onSuccess: ( response ) => {
      // Invalidate and refetch

      if (response?.ok) {
        
        setIsFollow(response.isFollow)
        // authenticated(response)
      }else{
        setIsFollow(false)
      }
      
     
    }
  })

  return (
    <div className='flex flex-col gap-3 pb-4 mr-4'>
        <div className='flex justify-between'>
            <UserAvatar user={user} info={formatNumber(user.numFollowers,'follower')} />
            {
              userAuth?.id !== user.id
              &&
              <Button
                onClick={() => mutation.mutate(user.id)} 
                size='sm' 
                className='w-fit text-xs font-medium bg-bluePrimary'>
                  {
                    !isFollow
                    ? <><UserPlus className='h-4 w-4 mr-2' /> Follow</>
                    : <><UserMinus className='h-4 w-4 mr-2' /> Unfollow</>
                  }
              </Button>
            }
            
        </div>
        <p className='text-sm text-darkLight font-medium'>{user.bio}</p>
    </div>
  )
}
