
import { User } from '@/core/domain/entities/user.entity';

interface Props {
  user: User
}

export const BannerBgImage = ({ user }: Props) => {
  return (
    <div className='absolute top-16 left-0 w-full h-72 md:h-80  bg-cover'>
      <img 
        className='w-full h-full object-cover'
        src={user.backGroundImage}
        alt={user.name}
      />
    </div>
  )
}
