
import { Card, CardContent, CardHeader } from '@/app/components/ui/card'
import { UserAvatarSkeleton } from '../../skeleton/UserAvatarSkeleton'
import { cn } from '@/app/lib/utils'
import { Skeleton } from '@/app/components/ui/skeleton'

export const PostSkeleton = () => {
  return (
    <article>
        <Card className={cn("w-full bg-white p-5 rounded-lg shadow")} >
            <CardHeader className='p-0'>
                <UserAvatarSkeleton />
            </CardHeader>
            <CardContent className='p-0'>

            <Skeleton className='w-full h-5 bg-zinc-300 my-5' />

            <div className='w-full flex gap-5'>
                <Skeleton className='w-full h-4 bg-zinc-300' />
                <Skeleton className='w-full h-4 bg-zinc-300' />
                <Skeleton className='w-full h-4 bg-zinc-300' />
                <Skeleton className='w-full h-4 bg-zinc-300' />
            </div>
            
            </CardContent>
        </Card>
    </article>
  )
}
