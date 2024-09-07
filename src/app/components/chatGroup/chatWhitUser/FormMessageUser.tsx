import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { messageSchema } from '@/app/validations/message.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { LoaderCircle, Send } from 'lucide-react'
import { z } from 'zod'
import io from 'socket.io-client'
import { socket } from '@/adapters/http/socket'

export const FormMessageUser = () => {

    const mutation = useMutation({
        // mutationFn: (data: Login) => authLogin(data), // aqui no agarra el login del metodo authRepository 
        onSuccess: ( response ) => {
          // Invalidate and refetch
    
          
         
        }
      })
    
      const form = useForm<z.infer<typeof messageSchema>>({
          resolver: zodResolver(messageSchema),
          defaultValues: {
            message: ""
          },
        })
      
        function onSubmit(values: z.infer<typeof messageSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.


          socket.emit('chat message', 'jala');
          // console.log(values);
          
          // mutation.mutateAsync()
    
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
                    disabled={mutation.isPending || !form.watch('message')}
            >
            {
                mutation.isPending
                ? <LoaderCircle className='animate-spin w-5 h-5' />
                : <Send className='w-5 h-5' />
            }
            </Button>
        </form>
        </Form>
    </div>
  )
}
