
import { Skeleton } from '../../ui/skeleton'

export const BannerBgImageSkeleton = () => {
  return (
    <div className='absolute top-16 left-0 w-full h-72 md:h-80 bg-cover'>
       <Skeleton className="h-full w-full bg-zinc-300" />
    </div>
  )
}
