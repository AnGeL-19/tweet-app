
import { Button } from '../../ui/button'
import {  MessageCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { connectService } from '@/core/domain/services/index.service';
import { Link } from 'react-router-dom';
import { useToast } from '../../ui/use-toast';
import { type Connect, type StatusConect } from '@/core/domain/entities/connect.entity';
import { useState } from 'react';


interface Props {
    userToId: string;
    connect?: StatusConect
}

export const ButtonConnect = ({ userToId, connect}: Props) => {

  const { toast } = useToast()

  const [connectStatus, setConnectStatus] = useState(connect)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => connectService.connectUser(id), 
    onSuccess: ( response ) => {

      if (!connect) {
        queryClient.setQueryData(['recommend-connect', 'infinite'], ( data: any ) => {

          const { pages, pageParams } = data;

          const updateQuery = [...pages]

          const index = 0;
          const lastPage = updateQuery[index]
          updateQuery[index] = [ ...lastPage.filter( ( connect : Connect ) => !(connect.userFrom.id === userToId || connect.userTo.id === userToId)) ]
          
          return {
            pageParams,
            pages: updateQuery
          }
        
        })
        queryClient.invalidateQueries({
          queryKey: ['user-connects', 'infinite'],
          refetchType: 'active',
        });
      }else{
        setConnectStatus(response.connect)
      }
     

     
      toast({
          title: 'Succesful',
          description: response.message,
          className: !response.connect.isConnected ? 'bg-black text-white' : 'bg-yellow-300 text-black'
      })
      
        
    }
  })

  const handleAlertPending = () => {
    toast({
      title: 'Wait for user response',
      description: 'Your connection has been sent, please wait for a response.',
      className: 'bg-yellow-300 text-black'
  })
  }

  const handleSubmit = (userToId:string) => {

    if (connectStatus) {
      if (connectStatus!.isPending) {
        handleAlertPending() 
      } else if (!connectStatus.isConnected) {
        mutation.mutate(userToId)
      }
    }else{
      mutation.mutate(userToId)
    }
    
  }

  return (
    <Button 
        onClick={() => handleSubmit(userToId) }
        size='sm' className='w-fit'
    >
        {
          connectStatus
          ?
          connectStatus.isPending
            ? <><MessageCircle className='h-4 w-4 mr-2' /> Pending</>
            : 
            connectStatus.isConnected
            ? <Link to={`/chats/${connect!.connectId}/${userToId}`}><MessageCircle className='h-4 w-4' /></Link>
            : <><MessageCircle className='h-4 w-4 mr-2' /> Connect</>
          : <><MessageCircle className='h-4 w-4 mr-2' /> Connect</>
        }
    </Button>
  )
}
