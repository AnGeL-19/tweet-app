import { FormLogin } from '@/app/components/auth/FormLogin'
import { PresentationAuth } from '@/app/components/shared/auth/PresentationAuth'
import { Button } from '@/app/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'



export const LoginPage = () => {

 
  

  return (
    <main className='w-full h-full'>
      
      <PresentationAuth 
        backgoundImage='https://media.giphy.com/media/EddY9gk1YkWAnImfKm/giphy.gif?cid=790b7611cuas3csux52nkzokpwwixefwm7kntsszwrt827do&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        description='This application is for information only'
        headerComponent={() => (
          <div
            className='w-full flex justify-end'
          >
            <Link 
              className='text-grayLight text-sm'
              to={{
                pathname: '/auth/register'
              }}>
                Create an account
              <Button className='ml-2'>
                Register
              </Button>
            </Link>
          </div>
        )}
      >

        <FormLogin />
        
      </PresentationAuth>
   
    </main>
  )
}
