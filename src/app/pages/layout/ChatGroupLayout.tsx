
import { MenuChats } from '@/app/components/chatGroup/MenuChats';
import { Outlet } from 'react-router'

const ChatGroupLayout = () => {
  return (
    <div className='w-full px-0 sm:px-4 min-h-screen'>
        <div className='w-full flex gap-4 lg:gap-6 h-full'>

            <MenuChats />

            <div className='w-full p-4 bg-white rounded shadow'>
                <Outlet />
            </div>

        </div>
    </div>

  )
}

export default ChatGroupLayout;