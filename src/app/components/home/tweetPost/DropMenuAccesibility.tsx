import { useRef, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/app/components/ui/dropdown-menu"
  
import {
    Earth,
    Users
} from "lucide-react"

interface Props {
    onSelect: (value: string) => void
}

enum ACCESS {
    public = 'public',
    private = 'follower'
}

export const DropMenuAccesibility = ({ onSelect }: Props) => {

    const [selected, setSelected] = useState({
        text: 'Everyone can reply',
        Icon: <Earth className='h-4 w-4' />
    })

    const accesibilities = useRef(ACCESS)

    const onSelectOption = (value: string) => {

        if (value === ACCESS.public) {
            setSelected({
                text: 'Everyone can reply',
                Icon: <Earth className='h-4 w-4' />   
            }) 
        }else if(value === ACCESS.private){
            setSelected({
                text: 'People you follow',
            Icon: <Users className='h-4 w-4' />  
            })  
        }
        
        onSelect(value)
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='flex gap-2 items-center hover:bg-gray p-2 rounded-2xl'>
            {
                selected.Icon
            }
            <DropdownMenuLabel className='p-0'>{selected.text}</DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-4 rounded-md'>
            <DropdownMenuLabel className='text-sm font-semibold p-0'>Who can reply?</DropdownMenuLabel>
            <DropdownMenuLabel className='text-sm font-sans font-normal text-gratSemiBold px-0'>Choose who can reply to this Tweet.</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer flex gap-1 px-3 py-1 rounded'
                onClick={() => onSelectOption(accesibilities.current.public)}
            >
                <Earth className='h-5 w-5' />
                <DropdownMenuLabel className='font-normal text-sm'>
                    Everyone
                </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer flex gap-1 px-3 py-1 rounded'
                onClick={() => onSelectOption(accesibilities.current.private)}
            >
                <Users className='h-5 w-5' />
                <DropdownMenuLabel className='font-normal text-sm'>
                    People you follow
                </DropdownMenuLabel>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
