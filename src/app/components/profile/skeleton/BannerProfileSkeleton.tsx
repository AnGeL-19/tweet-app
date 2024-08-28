
import { Skeleton } from '../../ui/skeleton'

export const BannerProfileSkeleton = () => {


  return (
    <section className='relative z-10 -mt-20 p-5 bg-white rounded-lg mb-6 shadow'>
        <div className='flex gap-5 flex-col items-center md:flex-row md:items-start'>
            <div className='relative -mt-32 md:-mt-20 mb-0 md:mb-10'>

                <Skeleton className="h-40 w-40 border-4 rounded-full shadow-sm bg-zinc-300" />
             
            </div>
            <div className='w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-5'>

                <div className='flex flex-col items-center md:items-start gap-5'>

                    <div className='flex flex-col md:flex-row gap-3 items-center'>
                        
                        <Skeleton className="h-6 w-20 bg-zinc-300" /> 
                        
                        <div className='flex gap-3 items-center'>
                            <Skeleton className="h-4 w-16 bg-zinc-300" />
                            <Skeleton className="h-4 w-16 bg-zinc-300" />
                        </div>
                    </div>
                     
                    <div className='space-y-2 w-full'>
                        <Skeleton className="h-4 w-full bg-zinc-300" /> 
                        <Skeleton className="h-4 w-1/2 bg-zinc-300" />
                    </div>

                </div>

                <Skeleton className="h-10 w-20 rounded bg-zinc-300" />

            </div>
        </div>
    </section>
  )
}
