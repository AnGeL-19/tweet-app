import { useAppSelector } from '@/app/context/store/hook'
import { ChangeBgImage } from './ChangeBgImage'
import { ChangeUserImage } from './ChangeUserImage'

export const BannerEditProfile = () => {

    const user = useAppSelector(state => state.auth.user )

  return (
    <div className='w-full relative'>

        <ChangeBgImage bgImg={user?.backGroundImage || ''} />

        <div className='w-full absolute -bottom-16 left-0'>
            <div className='w-full flex flex-col justify-center items-center'>
                
                <ChangeUserImage name={user?.name || ''} img={user?.profileImage || ''} />

                <div className='flex flex-col items-center'>
                    <span className='text-xl font-sans font-medium'>{user?.name}</span>
                    <span className='text-sm font-light'>{user?.email}</span>
                </div>

            </div>
        </div>
    </div>
  )
}
