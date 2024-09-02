import React from 'react'

interface Props{
  description: string;
  img: string;
}

export const ContentPost = ({ description, img }:Props) => {
  return (
    <>
    <p className='text-darkPrimary text-base my-5'>
      {description}
    </p>
    {
      img
      &&
      <div className='w-full max-h-[375px] rounded-md overflow-hidden mb-4'>
        <img 
        src={img}
        className='w-full h-full object-contain'
        alt='post-i'
        />
      </div>
    }
    
    </>
  )
}
