import { ITrend } from '@/app/interfaces/trend.interface'
import { formatNumber } from '@/app/lib/formatNumber'
import { Link } from 'react-router-dom'

interface Props {
  trend: ITrend
}


export const Trend = ({trend}:Props) => {

  return (
    <div className='hover:bg-zinc-50 rounded p-2'>
      <Link to={`/explore?search=${trend.name.replace('#','')}`}
        className='flex flex-col gap-1 '
      >
        <span className='text-base font-semibold text-darkPrimary font-sans hover:underline'>{trend.name}</span>
        <span className='text-sm font-medium text-darkLight'>{formatNumber(trend.numTweets, 'tweet')}</span>
      </Link>
    </div>
    
  )
}
