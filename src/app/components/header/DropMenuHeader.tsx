import { useContext } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"


import {
    ChevronDown,
    CircleUserRound,
    UsersRound,
    Settings,
    LogOut
  } from "lucide-react"

import { Link } from 'react-router-dom'
import { ContextAuth } from '@/app/context/auth/contextAuth'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../ui/use-toast'
import { useAppSelector } from '@/app/context/store/hook'
  
export const DropMenuHeader = () => {

    const { toast } = useToast()

    const user = useAppSelector( state => state.auth.user )
    
    const { authLogout, deauthenticate } = useContext(ContextAuth)

    const mutation = useMutation({
      mutationFn: authLogout, // aqui no agarra el login del metodo authRepository 
      onSuccess: ( response ) => {
        // Invalidate and refetch
  
        if (response) {
          deauthenticate(response)
          toast({
            title: `BYE!!`,
            description: 'Have a good day!'
          })
        }
        
       
      }
    })

  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <ChevronDown className='h-4 w-4' />
    </DropdownMenuTrigger>
    <DropdownMenuContent className='p-4  rounded-md'>

        <DropdownMenuItem className='cursor-pointer px-3 py-1 rounded'>
            <Link to={`/profile/${user?.id}`} className='flex items-center gap-1'>
                <CircleUserRound className='h-5 w-5' />
                <DropdownMenuLabel className='font-normal text-sm'>
                    My Account
                </DropdownMenuLabel>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer flex gap-1 px-3 py-1 rounded'>
            <Link to={`/chats/`} className='flex items-center gap-1'>
              <UsersRound className='h-5 w-5' />
              <DropdownMenuLabel className='font-normal text-sm'>
                  Group Chat
              </DropdownMenuLabel>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer flex gap-1 px-3 py-1 rounded'>
          <Link to={`/account/edit/`} className='flex items-center gap-1'>
            <Settings className='h-5 w-5' />
            <DropdownMenuLabel className='font-normal text-sm'>
                Settings
            </DropdownMenuLabel>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => mutation.mutate() } className='cursor-pointer px-3 py-1 rounded hover:bg-red-300'>
            <LogOut className='h-5 w-5 text-redPrimary' />
            <DropdownMenuLabel className='font-normal text-sm text-redPrimary'>  
                    Logout 
            </DropdownMenuLabel>
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>

  )
}
