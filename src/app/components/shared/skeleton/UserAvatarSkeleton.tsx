
import { Skeleton } from '../../ui/skeleton';



export const UserAvatarSkeleton = () => {
  return (
    <div
        className='flex gap-3 w-fit'
    >
        <Skeleton className='w-10 h-10 rounded-full bg-zinc-300' />
        <div className='flex flex-col gap-2'>
            <Skeleton className='w-20 h-5 bg-zinc-300' />
            <Skeleton className='w-10 h-3 bg-zinc-300' />
        </div>
    </div>
  )
}
