import { HastagText } from "../common/HastagText";

interface Props{
  description: string;
  img: string;
}

export const ContentPost = ({ description, img }:Props) => {


  return (
    <>
      <HastagText text={description} />
      {
        img
        &&
        <div className='w-auto h-auto max-h-[375px] rounded-md overflow-hidden mb-4'>
          <img 
            loading='lazy'
            src={img}
            className='object-contain'
            alt='post-i'
          />
        </div>
      } 
    </>
  )
}
