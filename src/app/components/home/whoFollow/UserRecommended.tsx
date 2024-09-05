
import { UserMinus, UserPlus } from 'lucide-react'
import { Button } from '../../ui/button'
import { formatNumber } from '@/app/lib/formatNumber'
import { UserAvatar } from '../../shared/user/UserAvatar'
import { UserRecomment } from '@/core/domain/entities/user.entity'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { userService } from '@/core/domain/services/index.service'

interface Props {
  user: UserRecomment
}

export const UserRecommended = ({user}:Props) => {


  const [isFollow, setIsFollow] = useState(false)

  const mutation = useMutation({
    mutationFn: (id: string) => userService.setFollowUnfollow(id), // aqui no agarra el login del metodo authRepository 
    onSuccess: ( response ) => {
      // Invalidate and refetc

      if (response?.ok) {
        
        setIsFollow(response.isFollow)
        // authenticated(response)
      }else{
        setIsFollow(false)
      }
     
    }
  })

  return (
    <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
            <UserAvatar 
              user={user}
              info={formatNumber(user.numFollowers, 'follower')} 
            />
            <Button 
              onClick={() => mutation.mutate(user.id)}
              className='text-sm bg-bluePrimary' 
              size='sm'
            >
                {
                  !isFollow
                  ? <><UserPlus className='h-4 w-4 mr-2' /> Follow</>
                  : <><UserMinus className='h-4 w-4 mr-2' /> Unfollow</>
                }
            </Button>
        </div>
        <p className='text-darkLight text-sm font-medium'>{user.bio || ''}</p>
        
        {/* {
          user.backGroundImage
          &&
          <img 
            className='max-h-20 rounded-md bg-contain'
            src={user.backGroundImage} 
            alt={user.name} 
          /> 
        } */}
                       
    </div>
  )
}
