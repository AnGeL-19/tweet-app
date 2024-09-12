import { useEffect, useRef, useState } from 'react'
import { socket } from '@/adapters/http/socket';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/core/domain/services/index.service';
import { useParams } from 'react-router';
import { type Message as IMessage } from '@/core/domain/entities/chat.entity';
import { Message } from './Message';
import { MessageSkeleton } from './skeleton/MessageSkeleton';
import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll';


export const Chat = () => {

  const { connect_id } = useParams()

  const queryClient = useQueryClient()

  const scrollRef = useRef<HTMLDivElement>(null)

  const [isChating, setIsChating] = useState(false)

  const {isLoading, data ,refetch ,fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['messages', connect_id],
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async params => {
      const users = await chatService.getMessages(params.pageParam, connect_id || '' );
      return users;
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    
  });

  useEffect(() => {

    socket.on('receiveMessage', (obj : IMessage) => {

      queryClient.setQueryData(['messages', connect_id], (data : any) => {

        const { pages, pageParams } = data;

        const existMessage = pages.flat().some( ( message: IMessage )  => message.id === obj.id )

        const pagesNewMessage = [...pages.reverse()]

        if (!existMessage) {
          const index = pagesNewMessage.length - 1;
          const lastPage = pagesNewMessage[index]
          pagesNewMessage[index] = [ ...lastPage, obj ]
        }

        setIsChating(true)

        return {
          pageParams,
          pages: pagesNewMessage
        }

      })

    });
  
    return () => {
      socket.off('chat to')
    }
    
  }, [])

  useEffect(() => {
  
    if(scrollRef.current) {
      if (isChating || data?.pageParams.length === 1) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }else{
        scrollRef.current.scrollTop = scrollRef.current.scrollTop
      }
    } 


  }, [data?.pages, isChating])

  useEffect(() => {
    refetch()
  }, [connect_id])
  
  
  const { ref } = useInfiniteScroll({
    fn:  () => {
      fetchNextPage()
      setIsChating(false)
    },
    threshold: 1
  })



  return (
    <div className='w-full max-h-screen pt-3 overflow-y-auto'
      ref={scrollRef}
    >
        <div className='flex flex-col justify-end items-start gap-4 pr-1 mb-5 w-full'
          
        >
          
          {
            hasNextPage && <div ref={ref}></div>
          }

          {
            isFetching 
            && 
            <div className='w-full'>
              <MessageSkeleton key={'csk1'} />
              <MessageSkeleton key={'csk2'} />
            </div>
          }

          {
            isLoading
            ? 
            <div className='w-full'>
              <MessageSkeleton key={'csk1'} />
              <MessageSkeleton key={'csk2'} />
            </div>
            : [...data!.pages].reverse().flat().map( (message) => (
              <Message key={message.id} message={message} />
            ))
          }

        </div>
    </div>
  )
}
