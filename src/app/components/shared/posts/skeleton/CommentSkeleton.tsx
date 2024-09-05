import { Skeleton } from '@/app/components/ui/skeleton'


export const CommentSkeleton = () => {
  return (
    <div className='flex gap-4'>
        <Skeleton className='w-10 h-10 rounded-full bg-zinc-300' />

        <div className='flex flex-col'>
            <div className='p-4 bg-gray rounded-lg mb-2'>
                <div className='flex gap-3 items-center mb-2'>
                    <Skeleton className='w-20 h-5 bg-zinc-300' />
                    <Skeleton className='w-14 h-4 bg-zinc-300' />
                </div>
                <Skeleton className='w-full h-6 bg-zinc-300' />

            </div>
            <div className='flex gap-2 items-center'>
                <Skeleton className='w-10 h-4 bg-zinc-300' />
                <Skeleton className='w-10 h-4 bg-zinc-300' />
            </div>
        </div>
    </div>
  )
}
