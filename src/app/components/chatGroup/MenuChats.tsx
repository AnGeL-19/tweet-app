import { useRef } from 'react'
import { Separator } from '../ui/separator'
import { NavLink } from 'react-router-dom'
import {  MessageCircle, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

export const MenuChats = () => {

    const navCongig = useRef([
        {
            to: '/chats/angel',
            name: 'Angel M',
            prfileImage: 'https://res.cloudinary.com/dajit1a8r/image/upload/c_fill,w_80,h_80/v1725477462/user-icon_e4vzuq.webp'
        },
        {
            to: '/chats/kroenen',
            name: 'Kroenen',
            prfileImage: 'https://res.cloudinary.com/dajit1a8r/image/upload/v1725576539/xvl1ablex1svm5rahgur.jpg'
        },
        {
            to: '/chats/best',
            name: 'Best',
            prfileImage: 'https://res.cloudinary.com/dajit1a8r/image/upload/v1725497056/kagpzqmfsxogpi0hq4sv.png'
        }
    ])

    return (
        <div className='w-fit lg:w-full lg:max-w-[315px] sm:min-h-screen p-2 sm:p-4 bg-white rounded shadow'>

            <div className='flex flex-col'>
            
                <div className='flex flex-col'>
                    <h3 className='hidden lg:flex font-medium text-xl text-darkPrimary'>Chat Group</h3>
                    <div className='flex lg:hidden w-full justify-center items-center'>
                        <MessageCircle className='w-8 h-8' />
                    </div>
                    
                    <Separator className='w-full my-4 ' />
                </div>
                

                <aside>
                    <nav>
                        
                        <ul className='flex flex-col'>
                            {
                                navCongig.current.map((navigation) => (
                                    <li key={navigation.name}>
                                        <NavLink to={navigation.to}>
                                            {
                                                ({ isActive }) => (
                                                    <>
                                                        <div className={`flex gap-4 items-center p-2 hover:bg-zinc-200 rounded-md group ${isActive ? 'bg-zinc-100' : ''}`}>
                                                            <Avatar>
                                                                <AvatarImage src={navigation.prfileImage}></AvatarImage>
                                                                <AvatarFallback>{navigation.name}</AvatarFallback>
                                                            </Avatar>
                                                            <span className={`hidden lg:flex text-base font-medium text-darkPrimary`}>
                                                                {navigation.name}
                                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </NavLink>

                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </aside>
            </div>

        </div>
    )
}