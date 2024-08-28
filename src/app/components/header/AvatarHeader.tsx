import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { DropMenuHeader } from './DropMenuHeader'
import { SheetMenuHeader } from './SheetMenuHeader'
import { useAppSelector } from '@/app/context/store/hook'



export const AvatarHeader = () => {

    const user = useAppSelector( state => state.auth.user )

    return (
        <div className='flex gap-4 items-center'>
            <Avatar>
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback className='text-black'>{user?.name}</AvatarFallback>
            </Avatar>
            <span className='hidden md:flex text-base font-semibold text-darkSemiBold capitalize'>{user?.name}</span>
            
            <div className='flex md:hidden'>
                <SheetMenuHeader />
            </div>
            <div className='hidden md:flex'>
                <DropMenuHeader />
            </div>
        </div>
    )
}
