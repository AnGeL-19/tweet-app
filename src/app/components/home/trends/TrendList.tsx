
import { Trend } from './Trend'
import { Trend as ITrend } from '@/core/domain/entities/trend.entity'
import { DataEmpty } from '../../shared/DataEmpty'



interface Props {
  trends: ITrend[] | []
}

export const TrendList = ({ trends }:Props) => {
  return (
    <div className='pt-3 pb-1'>
      {
        trends.length !== 0
        ? trends.map((trend) => (<Trend key={trend.id} trend={trend} />))
        : (
          <DataEmpty text='No trends' />
        )
      }
      
    </div>
  )
}
