
interface Props {
  numLikes: number;
  numComments: number;
  numRetweets: number;
  numSaved: number;
}

export const InteractionsPost = ({ numLikes, numComments, numRetweets, numSaved }:Props) => {

  return (
    <div className='flex justify-end gap-3'>
        <span className='text-xs font-medium text-darkLight'>{numLikes} Likes</span>
        <span className='text-xs font-medium text-darkLight'>{ numComments } Comments</span>
        <span className='text-xs font-medium text-darkLight'>{numRetweets} Retweets</span>
        <span className='text-xs font-medium text-darkLight'>{numSaved} Saved</span>
    </div>
  )
}
