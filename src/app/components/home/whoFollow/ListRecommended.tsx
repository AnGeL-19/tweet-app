
import { UserRecommended } from './UserRecommended'
import { Separator } from '../../ui/separator'
import { UserRecomment } from '@/core/domain/entities/user.entity'
import { UserSearch } from 'lucide-react'
import { DataEmpty } from '../../shared/common/DataEmpty'

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
          <DataEmpty text='No users' iconRender={<UserSearch className='w-4 h-4' />} positionIcon='left' />
        )
      }
    </div>
)
}
