import { useState } from 'react'
import { Button } from '../ui/button'
import { UserMinus, UserPlus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query';
import { userService } from '@/core/domain/services/index.service';

interface Props {
    userId: string;
    isFolling?: boolean;
}

export const ButtonFollow = ({ userId, isFolling }: Props) => {

    const [isFollow, setIsFollow] = useState(isFolling)

    const [hover, setHover] = useState(false)

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
    <Button 
        onClick={() => mutation.mutate(userId)}
        onMouseLeave={ () => setHover(false) }
        onMouseEnter={ () => setHover(true) }
        className='text-sm bg-bluePrimary' 
        size='sm'
    >
        {
            !isFollow
            ? <><UserPlus className='h-4 w-4 mr-2' /> Follow</>
            : hover
            ? <><UserMinus className='h-4 w-4 mr-2' /> Unfollow</>
            : <>Following</>
        }
    </Button>
  )
}
