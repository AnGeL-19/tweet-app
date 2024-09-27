// import { socket } from '@/adapters/http/socket'
import { Header } from '@/app/components/header/Header'
import { Footer } from '@/app/components/shared/common/Footer'
import { LoadingPage } from '@/app/components/shared/common/LoadingPage'
import { useAppSelector } from '@/app/context/store/hook'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

 const MainLayout = () => {

  const navigate = useNavigate()

  const logged = useAppSelector(state => state.auth.logged)

  useEffect(() => {
    if (!logged) {
      // socket.disconnect()
      navigate("/auth/login", {
        replace: true
      });
    }else{
      // socket.connect()
    }
  }, [logged])

  if (!logged) {
    return (
      <LoadingPage />
    )
  }

  return (
    <div className='relative'>

        <Header />
  
        <main className='max-w-container min-h-screen mx-auto my-6'>

          <Outlet />

        </main>

        <Footer />
    </div>
    
  )
}

export default MainLayout;