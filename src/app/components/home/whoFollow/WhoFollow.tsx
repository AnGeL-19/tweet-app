import { cn } from '@/app/lib/utils'

import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card'
import { Separator } from '../../ui/separator'
import { ListRecommended } from './ListRecommended'
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/core/domain/services/index.service'
import { ListRecommendedSkeleton } from './skeleton/ListRecommendedSkeleton'


export const WhoFollow = () => {


    const { data, isLoading } = useQuery({ queryKey: ['whoFollow'], queryFn: () => userService.getUsersRecomented() })


  return (
    <aside>
        <Card className={cn("w-[306px] bg-white p-5 rounded-lg shadow")} >
            <CardHeader className='p-0'>
                <CardTitle className='text-sm font-semibold'>Who to follow</CardTitle>
            </CardHeader>
            <Separator className='my-2' />
            <CardContent className='p-0 pt-3 pb-1'>
                {
                    isLoading
                    ? <ListRecommendedSkeleton />
                    : <ListRecommended users={data || []} />
                }
            </CardContent>
        </Card>
    </aside>
  )
}
