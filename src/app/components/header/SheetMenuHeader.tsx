import React, { useContext } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,

  } from "@/app/components/ui/sheet"
import { ChevronDown, CircleUserRound, LogOut, Settings, UsersRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { logout } from '@/app/features/auth/authSlice'
import { ContextAuth } from '@/app/context/auth/contextAuth'
import { useMutation } from '@tanstack/react-query'
import { CustomError } from '@/core/domain/errors/custom.error'
import { useAppSelector } from '@/app/context/store/hook'
import { useToast } from '../ui/use-toast'
  

export const SheetMenuHeader = () => {

  const { toast } = useToast()

  const { authLogout, deauthenticate } = useContext(ContextAuth)
  const user = useAppSelector( state => state.auth.user )

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
      
     
    },
    onError: (error: CustomError) => {
      console.log(error, 'SI HAY ERRORES', error.getDataValidation());
    }
  })

  return (
    <Sheet>
      <SheetTrigger>
        <ChevronDown className='h-4 w-4' />
      </SheetTrigger>
      <SheetContent className='max-w-[300px]'>
        <SheetHeader className='flex flex-col items-center'>
          <Avatar className='w-20 h-20'>
            <AvatarImage  src={user?.profileImage} />
            <AvatarFallback>
                {user?.name}
            </AvatarFallback>
          </Avatar>
          <SheetTitle className='capitalize'>{user?.name}</SheetTitle>
        </SheetHeader>
        <div className='w-full h-full flex flex-col gap-1 py-5'>
          <Link to={`/profile/${user?.id}`} className='p-2 hover:bg-zinc-100 text-center flex gap-2 items-center rounded'>
            <CircleUserRound className='h-5 w-5' />
            Profile
          </Link>
          <Link to='/group' className='p-2 hover:bg-zinc-100 text-center flex gap-2 items-center rounded'>
            <UsersRound className='h-5 w-5' />
            Group Chat
          </Link>
          <Link to='/account/edit/' className='p-2 hover:bg-zinc-100 text-center flex gap-2 items-center rounded'>
            <Settings className='h-5 w-5' />
            Settings
          </Link>
          <Separator className='my-1' />
          <Button onClick={() => mutation.mutate() } className='p-2 bg-transparent hover:bg-zinc-100 text-redPrimary text-center flex gap-2 items-center rounded'>
            <LogOut className='h-5 w-5 text-redPrimary mr-2' />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
