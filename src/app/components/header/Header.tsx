import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { NavLinkItem } from './NavLinkItem'
import { AvatarHeader } from './AvatarHeader'
import { Bookmark, Compass, Home } from 'lucide-react'
import { SheetMenuHeader } from './SheetMenuHeader'



  
export const Header = () => {

    const routes = useRef([
        {
            to: '/',
            name: 'Home',
            icon: <Home className='h-5 w-5 text-bluePrimary' />
        },
        {
            to: '/explore',
            name: 'Explore',
            icon: <Compass className='h-5 w-5 text-bluePrimary' />
        },
        {
            to: '/bookmarks',
            name: 'Bookmarks',
            icon: <Bookmark className='h-5 w-5 text-bluePrimary' />
        }
    ])

  return (
    <div className='sticky z-50 top-0 left-0 w-full'>
        <header className='w-full h-16 px-5 bg-white'> 

        <nav className='max-w-screen h-full mx-auto flex justify-between items-center'>
            <NavLink to={'/'}>
                <img className='hidden md:flex w-32 h-8' src="/src/assets/static/tweeter.svg" alt="Tweeter" />
                <img className='flex md:hidden h-8 w-11' src="/src/assets/static/tweeter-small.svg" alt="Tweeter Only" />
            </NavLink>
            
            <div className='flex gap-3 md:gap-5 self-end'>

                {
                routes.current.map(({to, name, icon}) => (<NavLinkItem key={name} to={to} name={name} icon={icon} />))
                }

            </div>  

            <AvatarHeader />
          
            </nav>
        </header>
    </div>
    
  )
}
