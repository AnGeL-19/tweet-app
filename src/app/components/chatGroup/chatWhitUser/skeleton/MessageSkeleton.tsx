import { Skeleton } from '@/app/components/ui/skeleton'


export const MessageSkeleton = () => {
  return (
    <div className='flex gap-3 w-full'>
        <Skeleton className='w-10 h-10 rounded-full bg-zinc-300'  />
        <div className='flex flex-col gap-1 bg-zinc-50 p-2 rounded-md shadow-sm'>
        <div className='flex gap-3 items-center'>
            <Skeleton className='w-16 h-7 bg-zinc-300'  />
            <Skeleton className='w-10 h-4 bg-zinc-300'  />
        </div>
        <div className='w-full'>
            <Skeleton className='w-full h-6 bg-zinc-300'  />
            <Skeleton className='w-1/2 h-6 bg-zinc-300'  />
        </div>
        </div>
    </div>
  )
}
