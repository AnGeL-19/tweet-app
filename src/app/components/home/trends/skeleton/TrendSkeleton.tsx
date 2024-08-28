import { Skeleton } from '@/app/components/ui/skeleton'

export const TrendSkeleton = () => {

  return (
    <div className='rounded p-2'>
      <div className='flex flex-col gap-1'>
        <Skeleton className="h-6 w-20 bg-zinc-300" /> 
        <Skeleton className="h-5 w-16 bg-zinc-300" />
      </div>
    </div>
  )
}
