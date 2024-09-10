import { socket } from "@/adapters/http/socket"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/app/components/ui/popover"
import { toast } from "sonner"

import { UserFollow as IUserFollow, User } from "@/core/domain/entities/user.entity"
import { Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { UserAvatar } from "../shared/user/UserAvatar"
import { IUserAvatar } from "@/app/interfaces/post.interface"
import { formatNumber } from "@/app/lib/formatNumber"

  
interface DataNotification {
    user: User;
    message: string;
}

export const Notifications = () => {

    // const user = useAppSelector(state => state.auth.user)
    const [data, setData] = useState<DataNotification[]>([])
    

    socket.on(`notification`, (obj) => {
        console.log(obj); 
        setData(prev => [ obj ,...prev]) 
        toast("You have a new notification", {
            position: 'bottom-right',
            className: 'bg-blue-400',
        
        })
 
    });

  return (
    <Popover>
        <PopoverTrigger>
            <Bell className='w-5 h-5' />
        </PopoverTrigger>
        <PopoverContent>
            <span className="mb-3">Notifications</span>
            <div className="w-full max-h-[400px] overflow-y-auto">
                <div className="flex flex-col gap-2">
                    {
                        data.map(( value , index ) => (
                            <div key={`value.user.id${index}`} className="flex flex-col">
                                <UserAvatar user={value.user} info={formatNumber(value.user.numFollowers, 'follower')} />
                                <span className="text-sm text-darkLight font-medium">{value.message}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </PopoverContent>
    </Popover>
  )
}
