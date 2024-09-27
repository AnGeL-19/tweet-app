import { Suspense, lazy } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@/core/domain/entities/user.entity'
import { useAppSelector } from '@/app/context/store/hook'
import { ButtonFollow } from '../shared/common/ButtonFollow'
// import { ButtonConnect } from '../shared/common/ButtonConnect'

const DialogUserFollow = lazy(() => import('./DialogUserFollow'))

interface Props {
    user: User
}

export const BannerProfile = ({ user }:Props) => {

    const userAuth = useAppSelector(state => state.auth.user)


  return (
    <section className='relative z-10 -mt-20 p-5 bg-white rounded-lg mb-6 shadow'>
        <div className='flex gap-5 flex-col items-center md:flex-row md:items-start'>
            <div className='relative -mt-32 md:-mt-20 mb-0 md:mb-10'>
                
                <Avatar className='h-40 w-40 border-4 border-white shadow-sm object-contain'>
                    <AvatarImage src={user.profileImage}>
                    </AvatarImage>
                    <AvatarFallback>
                        {user.name}
                    </AvatarFallback>
                </Avatar>
             
            </div>
            <div className='w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-5'>

                <div className='flex flex-col items-center md:items-start gap-5'>

                    <div className='flex flex-col md:flex-row gap-3 items-center'>
                        
                        <span className='text-2xl font-semibold text-darkPrimary capitalize'>{user.name}</span>
                        
                        <div className='flex gap-3 items-center'>

                            <Suspense fallback={<span>Cargando...</span>}>
                                <DialogUserFollow 
                                query='following' 
                                user={user}
                                renderTextButton={() => (
                                    <span className='text-darkLight hover:underline cursor-pointer'>
                                    <span className='text-darkPrimary font-semibold mr-1'>{user.numFollowing}</span> 
                                    Following
                                    </span>
                                )} />
                            </Suspense>
                            
                            <Suspense fallback={<span>Cargando...</span>}>
                                <DialogUserFollow 
                                user={user}
                                query='followers' 
                                renderTextButton={() => (
                                    <span className='text-darkLight hover:underline cursor-pointer'>
                                    <span className='text-darkPrimary font-semibold mr-1'>{user.numFollowers}</span>
                                    Followers
                                    </span>
                                )} />
                            </Suspense>
                            

                        </div>
                    </div>

                    <p className='text-lg text-darkLight'>{user.bio || ':( Write something you like'}</p>

                </div>

            
                {
                    userAuth?.id !== user.id
                    && 
                    <div className='flex gap-2 items-center'>
                        {/* <ButtonConnect 
                            userToId={user.id} 
                            connect={user.connect}
                        /> */}
                        <ButtonFollow userId={user.id} isFolling={user.isFollowing} />
                    </div>
                    
                }
                


            </div>
        </div>
    </section>
  )
}
