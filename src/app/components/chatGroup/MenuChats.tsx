
import { Separator } from '../ui/separator'
import { NavLink } from 'react-router-dom'
import {  MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useInfiniteQuery } from '@tanstack/react-query'
import { connectService } from '@/core/domain/services/index.service'
import { Skeleton } from '../ui/skeleton'
import { DataEmpty } from '../shared/common/DataEmpty'

export const MenuChats = () => {

    const {isLoading, data } = useInfiniteQuery({
        queryKey: ['user-connects', 'infinite'],
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60,  // Los datos son frescos por 60 minutos (60 minutos sin refetch)
        // cacheTime: 1000 * 60 * 30, // Mantén los datos en caché por 30 minutos
        refetchOnWindowFocus: false,  // No refetch cuando vuelves a la ventana
        refetchOnReconnect: false,    // No refetch al reconectar a internet
        refetchOnMount: false,
        queryFn: async params => {
          const users = await connectService.getConnections(params.pageParam);
          return users;
        },
        getNextPageParam: (lastPage, _, lastPageParam) => {
          if (lastPage.length === 0) {
            return undefined
          }
          return lastPageParam + 1
        },
        
    });

    return (
        <div className='w-fit lg:w-full lg:max-w-[315px] sm:min-h-screen p-2 sm:p-4 bg-white rounded shadow'>

            <div className='flex flex-col'>
            
                <div className='flex flex-col'>
                    <h3 className='hidden lg:flex font-medium text-xl text-darkPrimary'>Chats</h3>
                    <div className='flex lg:hidden w-full justify-center items-center'>
                        <MessageCircle className='w-8 h-8' />
                    </div>
                    
                    <Separator className='w-full my-4 ' />
                </div>
                

                <aside>
                    <nav>
                        
                        <ul className='flex flex-col'>
                            {
                                isLoading
                                ? <div className='flex gap-3 items-center'>
                                    <Skeleton  className='w-10 h-10 rounded-full bg-zinc-300' />
                                    <Skeleton  className='w-20 h-5 bg-zinc-300' />
                                </div>
                                : 
                                data?.pages.flat().length !== 0
                                ?
                                data?.pages.flat().map((user) => (
                                    <li key={user.id}>
                                        <NavLink to={`/chats/${user.connectId}/${user.id}`}>
                                            {
                                                ({ isActive }) => (
                                                    <>
                                                        <div className={`flex gap-4 items-center p-2 hover:bg-zinc-200 rounded-md group ${isActive ? 'bg-zinc-100' : ''}`}>
                                                            <Avatar>
                                                                <AvatarImage src={user.profileImage}></AvatarImage>
                                                                <AvatarFallback>{user.name}</AvatarFallback>
                                                            </Avatar>
                                                            <span className={`hidden lg:flex text-base font-medium text-darkPrimary`}>
                                                                {user.name}
                                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </NavLink>

                                    </li>
                                ))
                                : <DataEmpty text='No users'  />
                            }
                        </ul>
                    </nav>
                </aside>
            </div>

        </div>
    )
}