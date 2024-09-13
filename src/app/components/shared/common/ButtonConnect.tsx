import { useState } from 'react'
import { Button } from '../../ui/button'
import {  MessageCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query';
import { connectService } from '@/core/domain/services/index.service';
import { Link } from 'react-router-dom';
import { useToast } from '../../ui/use-toast';


interface Props {
    userToId: string;
    isConnected?: boolean;
}

export const ButtonConnect = ({ userToId, isConnected }: Props) => {

    const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (id: string) => connectService.connectUser(id), // aqui no agarra el login del metodo authRepository 
    onSuccess: ( response ) => {
      // Invalidate and refetc

        console.log(response);
        if (response.connected) {
            toast({
                title: 'Succesful',
                description: response.message,
                className: 'bg-black text-white'
            })
        }
        
    }
  })


  return (
    <Button 
        onClick={() => mutation.mutate(userToId)}
        size='sm' className='w-fit'
    >
        {
            !isConnected
            ? <><MessageCircle className='h-4 w-4 mr-2' /> Connect</>
            : <Link to={`/chats/${userToId}`}><MessageCircle className='h-4 w-4' /></Link>
        }
    </Button>
  )
}
