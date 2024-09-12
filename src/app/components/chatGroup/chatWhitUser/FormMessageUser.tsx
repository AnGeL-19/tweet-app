
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form'
import { useForm } from 'react-hook-form'
import { messageSchema } from '@/app/validations/message.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Send } from 'lucide-react'
import { z } from 'zod'
import { socket } from '@/adapters/http/socket'
import { useAppSelector } from '@/app/context/store/hook'
import { useParams } from 'react-router'

export const FormMessageUser = () => {

    const { connect_id, user_id } = useParams()


      const user = useAppSelector(state => state.auth.user)
    
      const form = useForm<z.infer<typeof messageSchema>>({
          resolver: zodResolver(messageSchema),
          defaultValues: {
            message: ""
          },
        })
      
        function onSubmit(values: z.infer<typeof messageSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.

          const chatUser = {
            id: user?.id,
            name: user?.name,
            profileImage: user?.profileImage
          }

          socket.emit('sendMessage', {
              connectId: connect_id,
              user: chatUser,
              message: values.message,
              userTo: user_id
          } );
          // console.log(values);
          
          // mutation.mutateAsync()
          form.reset()

        }


  return (
    <div className='w-ful'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex relative">
            <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
                <FormItem
                className='w-full'
                >
            
                <FormControl>
                    <Input placeholder="Write something" className='h-11 py-5 pr-14' {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <Button type="submit" 
                    size='sm' 
                    className=' bg-white text-black hover:text-white absolute top-1 right-1'
                    disabled={!form.watch('message')}
            >
            {
                // mutation.isPending
                // ? <LoaderCircle className='animate-spin w-5 h-5' />
                // : 
                <Send className='w-5 h-5' />
            }
            </Button>
        </form>
        </Form>
    </div>
  )
}
