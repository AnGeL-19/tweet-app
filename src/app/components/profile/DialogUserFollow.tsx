import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/components/ui/dialog"
import { type IUserAvatar } from '@/app/interfaces/post.interface';
import { Separator } from '../ui/separator';
import { UserFollow } from './UserFollow';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/core/domain/services/index.service';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';

interface Props {
    renderTextButton: () => JSX.Element;
    query: string;
    user: IUserAvatar;
}

const DialogUserFollow = ({ user, renderTextButton, query = 'followers' }:Props) => {

      const [enabledFetch, setEnabledFetch] = useState(false)
      const { data, isLoading, refetch, isFetching } = useQuery({ 
         queryKey: [`user-${query}`], 
         queryFn: () => userService.getUsersFollow(query,user.id || ''),
         enabled: enabledFetch
       })

   console.log(data, enabledFetch);

   // useEffect(() => {
   //    refetch()
   //  }, [user.id])


  return (
    <Dialog>
        <DialogTrigger asChild onClick={ () => setEnabledFetch(true)}>
            {renderTextButton()}
         </DialogTrigger>
        <DialogContent className='max-w-[588px] overflow-hidden pl-5 pr-0 pb-0'
            onClick={ () => setEnabledFetch(false)}
        >
          <DialogHeader>
            <DialogTitle className='text-xs font-semibold text-darkPrimary'>{user.name} is {query}</DialogTitle>
            <Separator className='mb-4'/>
          </DialogHeader>
          <DialogDescription>
          </DialogDescription>
          <div className='max-h-[650px] flex flex-grow flex-col gap-3 m-0 overflow-auto '>
            
            {
               isLoading || isFetching
               ?<span>Loading...</span>
               :               
               data && data?.length !== 0 
               ? data.map( (user, index) => (
                  <div key={user.id}>
                      <UserFollow user={user} />
                      { data.length-1 !== index  && <Separator className='mb-2'/> } 
                  </div>
                  ))
               : (
               <div className='pb-4 text-center'>
                  <span className='font-medium'>No {query}</span>
               </div>)
              
            }
          </div>
          
        </DialogContent>
    </Dialog>
  )
}

export default DialogUserFollow;