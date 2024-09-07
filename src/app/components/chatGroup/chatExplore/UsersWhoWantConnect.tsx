import React, { useRef } from 'react'
import { UserExploreSkeleton } from '../../explore/skeleton/UserExploreSkeleton'
import { UserRecomment } from '@/core/domain/entities/user.entity'
import { UserExplore } from '../../explore/UserExplore'
import { Button } from '../../ui/button'
import { MessageCircle, UserSearch } from 'lucide-react'
import { DataEmpty } from '../../shared/common/DataEmpty'

export const UsersWhoWantConnect = () => {

    const users = useRef<UserRecomment[]>([
        {
          id: '001',
          name: 'Pepe',
          backGroundImage: '',
          bio: 'NADA ES BUENO <3',
          numFollowers: 124123,
          profileImage: 'https://res.cloudinary.com/dajit1a8r/image/upload/v1725576539/xvl1ablex1svm5rahgur.jpg',
          isFollowing: true
        },
        {
          id: '002',
          name: 'Chema',
          backGroundImage: '',
          bio: 'Love You <3',
          numFollowers: 4123,
          profileImage: 'https://res.cloudinary.com/dajit1a8r/image/upload/v1725576539/xvl1ablex1svm5rahgur.jpg',
          isFollowing: true
        }
      ])

  return (
    <section>
        <h3 className='text-base font-medium text-darkLight'>People who want to connect with you</h3>
        {/* NOTIFICACIONES DE GENTE QUE QUIERE CONECTAR CONTIGO */}
        <div className='w-full grid grid-cols-auto-fit-users gap-4 mt-3'>

        {
          false
          ? <>
            <UserExploreSkeleton />
            <UserExploreSkeleton />
          </>
          : 
          ( users.current.length !== 0 )
          ? 
          <>
            {users.current.map( (user) => (
              <UserExplore key={user.id} user={user}>

                <div className='pt-2'>
                  <span className='inline-block text-sm text-darkLight font-bold mb-2'>This user wants to connect with you</span>
                  <Button size='sm'>
                    <MessageCircle className='w-5 h-5 mr-2' />
                    Connect 
                  </Button>
                </div>

              </UserExplore>
            ) )}
            <div></div>
          </>
          : <DataEmpty text='No users' iconRender={<UserSearch className='w-4 h-4' />}  />
        }
        </div>

      </section>
  )
}
