
import React, { useRef } from 'react'
import { Footer } from '../Footer'


interface Props {
    children: React.ReactNode;
    backgoundImage: string;
    description?: string;
    headerComponent?: () => JSX.Element;
}

export const PresentationAuth = ({backgoundImage, description, headerComponent, children}: Props) => {

    const bgImg = useRef(backgoundImage ?? 'https://media.giphy.com/media/mtan0h9gkHgzCCp1z8/giphy.gif?cid=790b7611cay8y5rg488d2f3g7xfmtokw32jjg5clel4bcplo&ep=v1_gifs_search&rid=giphy.gif&ct=g')

  return (
    <div className='flex h-[80vh] w-full bg-[#09090B] rounded-sm overflow-hidden shadow-sm'>

        <section className='hidden w-1/2  w-min-[400px] relative sm:flex'>
          <div className='absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-t from-black via-transparent to-black opacity-50'></div>

          <div className='relative z-20 flex flex-col justify-between h-full p-5'>
            <img 
                className='h-7 w-fit'
                src="/src/assets/static/tweeter-white.svg" 
                alt="tweeter-small" 
            />
            <p className='text-gray'>{description}</p>
          </div>
          <img
            src={bgImg.current} 
            alt='join us' 
            className='w-full h-full absolute top-0 left-0 bg-cover'
           />
          
        </section>

        <section className='w-full  h-full flex flex-col justify-between sm:w-1/2 '>
            {
                headerComponent 
                &&
                <header className='p-2'>
                    {headerComponent()}
                </header>
            }
            
            <div className='px-2'>
                {
                    children
                }
            </div>
            
            <Footer color='text-white' />
          
        </section>

    </div>
  )
}
