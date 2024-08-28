import { Repeat2 } from 'lucide-react'


interface Props {
  name?: string
}

export const InfoRetweet = ({name}:Props) => {
  return (
    <div className='flex gap-3 items-center mb-2'>
        <Repeat2 className='h-4 w-4 text-darkLight' />
        <span className='text-sm text-darkLight font-sans'>{name} Retweeted</span>
    </div>
  )
}
