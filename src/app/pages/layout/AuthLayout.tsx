
import { LoadingPage } from '@/app/components/shared/LoadingPage'
import { useAppSelector } from '@/app/context/store/hook'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const getAuth = () => {
  try {
    
  } catch (error) {
    
  }
}

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