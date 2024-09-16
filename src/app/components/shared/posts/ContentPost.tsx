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
        <div className='w-auto max-h-[375px] rounded-md overflow-hidden mb-4'>
          <img 
            loading='lazy'
            src={img}
            className='w-full h-full object-contain max-h-[375px]'
            alt='post-i'
          />
        </div>
      } 
    </>
  )
}
