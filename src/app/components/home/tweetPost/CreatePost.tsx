
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"
import { cn } from '@/app/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { FormTweet } from './FormTweet'
import { useAppSelector } from "@/app/context/store/hook"
  
export const CreatePost = () => {

  // tweet/
  // upload/image`

  const user = useAppSelector( state => state.auth.user )

  return (
    <Card className={cn("w-full mb-6 bg-white p-5 rounded-lg shadow")} >
        <CardHeader className='p-0'>
            <CardTitle className='text-sm font-semibold'>Tweet something</CardTitle>
        </CardHeader>
        <Separator className='my-2' />
        <CardContent className='p-0'>

            <div className='flex gap-3'>
                <Avatar>
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className='text-black'>{user?.name}</AvatarFallback>
                </Avatar>

                <FormTweet />
                    
            </div>

        </CardContent>
    </Card>

  )
}
