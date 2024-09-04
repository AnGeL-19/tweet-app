import { BannerEditProfile } from '@/app/components/configurations/editProfile/BannerEditProfile'
import { FormProfile } from '@/app/components/configurations/editProfile/FormProfile'


export const EditProfilePage = () => {

    

  return (
    <div>
        <h2 className='text-lg font-medium mb-2'>Edit Profile</h2>

        <BannerEditProfile />

        <FormProfile />

    </div>
  )
}
