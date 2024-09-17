import { useState } from 'react'
import {
    Dialog,
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
import { DataEmpty } from '../shared/common/DataEmpty';
import { UserAvatarSkeleton } from '../shared/skeleton/UserAvatarSkeleton';

interface Props {
    renderTextButton: () => JSX.Element;
    query: string;
    user: IUserAvatar;
}

const DialogUserFollow = ({ user, renderTextButton, query = 'followers' }:Props) => {

      const [enabledFetch, setEnabledFetch] = useState(false)
      const { data, isLoading, isFetching } = useQuery({ 
         queryKey: [`user-${query}`], 
         queryFn: () => userService.getUsersFollow(query,user.id || ''),
         enabled: enabledFetch
       })

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
               ? <div className='w-full pb-4'><UserAvatarSkeleton /></div>
               :               
               data && data?.length !== 0 
               ? data.map( (user, index) => (
                  <div key={user.id}>
                      <UserFollow user={user} />
                      { data.length-1 !== index  && <Separator className='mb-2'/> } 
                  </div>
                  ))
               : (
                <div className='w-full pr-4 pb-4'>
                  <DataEmpty text={`No ${query}`} />
                </div>

                
              )
              
            }
          </div>
          
        </DialogContent>
    </Dialog>
  )
}

export default DialogUserFollow;