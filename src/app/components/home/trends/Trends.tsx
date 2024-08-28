
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { cn } from '@/app/lib/utils'

import { TrendList } from './TrendList'
import { Separator } from '../../ui/separator'
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/core/domain/services/index.service'
import { TrendListSkeleton } from './skeleton/TrendListSkeleton'

export const Trends = () => {


    const { data, isLoading } = useQuery({ queryKey: ['trends'], queryFn: () => userService.getTrends() })


  return (
    <section>
        <Card className={cn("w-[306px] bg-white p-5 rounded-lg shadow")} >
            <CardHeader className='p-0'>
                <CardTitle className='text-sm font-semibold'>Trends for you</CardTitle>
            </CardHeader>
            <Separator className='my-2' />
            <CardContent className='p-0'>
                {
                    isLoading
                    ? <TrendListSkeleton />
                    : <TrendList trends={data || []} />
                }
            </CardContent>
        </Card>
    </section>
  )
}
