
import { LoadingPage } from '@/app/components/shared/common/LoadingPage'
import { useAppSelector } from '@/app/context/store/hook'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'


const AuthLayout = () => {

  const navigate = useNavigate()

  const logged = useAppSelector(state => state.auth.logged)

  useEffect(() => {
    if (logged) {
      navigate("/",{
        replace: true
      });
    }
  }, [logged])

  if (logged) {
    return (
      <LoadingPage />
    )
  }

  return ( 
    <div className='container px-4 min-h-screen flex justify-center items-center'>

        <Outlet />

    </div>
  )
}

export default AuthLayout;