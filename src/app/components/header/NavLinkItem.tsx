
import { NavLink } from 'react-router-dom'

interface Props {
    to: string;
    name: string;
    icon: JSX.Element
}

export const NavLinkItem = ({to, name, icon}:Props) => {

  return (
    <NavLink to={{
        pathname: to
      }}
        className='flex flex-col gap-4 justify-between items-center'
      >
        {
            ({isActive}) => (
                <>
                    <div className='flex md:hidden'>
                      {icon}
                    </div>
                    <span className={`${isActive ? ' text-bluePrimary': 'text-darkLight'} hidden md:flex font-semibold text-sm`}>{name}</span>
                    <span className={`border-2 rounded-t ${isActive ? 'border-bluePrimary':'border-transparent'} w-14 md:w-20` } /> 
                </>
            )
        }
      </NavLink>
  )
}
