import React, { useRef } from 'react'
import { Separator } from '../ui/separator'
import { NavLink } from 'react-router-dom'
import { Bell, Lock, LucideProps, Palette, Settings, UserCircle } from 'lucide-react'

export const MenuConfiguration = () => {

    const navCongig = useRef([
        {
            to: '/account/edit',
            name: 'Edit Profile',
            iconRender: (props: LucideProps) => <UserCircle {...props} />
        },
        {
            to: '/account/notifications',
            name: 'Notifications',
            iconRender: (props: LucideProps) => <Bell {...props}  />
        },
        {
            to: '/account/privacity',
            name: 'Privacity',
            iconRender: (props: LucideProps) => <Lock {...props} />
        },
        {
            to: '/account/themes',
            name: 'Themes',
            iconRender: (props: LucideProps) => <Palette {...props} />
        }
    ])

    return (
        <div className='w-fit lg:w-full lg:max-w-[315px] sm:min-h-screen p-2 sm:p-4 bg-white rounded shadow'>

            <div className='flex flex-col'>
            
                <div className='flex flex-col'>
                    <h3 className='hidden lg:flex font-medium text-xl text-darkPrimary'>Settings</h3>
                    <div className='flex lg:hidden w-full justify-center items-center'>
                        <Settings className='w-8 h-8' />
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
                                                        <div className={`flex gap-4 items-center p-4 hover:bg-zinc-200 rounded-md group ${isActive ? 'bg-zinc-100' : ''}`}>
                                                            {navigation.iconRender({
                                                                className: `w-5 h-5 text-darkPrimary`
                                                            })
                                                            }
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
