import { Link } from 'react-router-dom'
import { FormRegister } from '@/app/components/auth/FormRegister'
import { PresentationAuth } from '@/app/components/shared/auth/PresentationAuth'
import { Button } from '@/app/components/ui/button'


export const RegisterPage = () => {
  return (
    <main className='w-full h-full'>
      
    <PresentationAuth 
      backgoundImage='https://media.giphy.com/media/mtan0h9gkHgzCCp1z8/giphy.gif?cid=790b7611cay8y5rg488d2f3g7xfmtokw32jjg5clel4bcplo&ep=v1_gifs_search&rid=giphy.gif&ct=g'
      description='This application is not real, for information purposes only'
      headerComponent={() => (
        <div
          className='w-full flex justify-end'
        >
          <Link 
            className='text-grayLight text-sm'
            to={{
              pathname: '/auth/login'
            }}>
              I have account
            <Button className='ml-2'>
              Login
            </Button>
          </Link>
        </div>
      )}
    >

      <FormRegister />
      
    </PresentationAuth>
 
  </main>
  )
}
