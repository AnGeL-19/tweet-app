

import { UserAvatarSkeleton } from '@/app/components/shared/skeleton/UserAvatarSkeleton'
import { Skeleton } from '@/app/components/ui/skeleton'


export const UserRecommendedSkeleton = () => {

 

  return (
    <div className='flex flex-col gap-3'>

        <div className='flex items-center justify-between'>
            <UserAvatarSkeleton />

            <Skeleton className="h-10 w-20 rounded bg-zinc-300" />
        </div>

        <Skeleton className="h-5 w-full rounded bg-zinc-300" />

        {/* <Skeleton className="h-20 w-full rounded-md bg-zinc-300" /> */}
            
    </div>
  )
}
