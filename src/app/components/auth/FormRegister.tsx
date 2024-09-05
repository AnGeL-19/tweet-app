
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Button } from '../ui/button'
import { registerSchema } from '@/app/validations/register.shema'
import { useContext } from 'react'
import { ContextAuth } from '@/app/context/auth/contextAuth'
import { useMutation } from '@tanstack/react-query'
import { UserRegister } from '@/core/domain/entities/user.entity'
import { useToast } from '../ui/use-toast'
import { LoaderCircle } from 'lucide-react'

export const FormRegister = () => {

  const { toast } = useToast()

  const { authRegister, authenticated } = useContext(ContextAuth)

    const mutation = useMutation({
      mutationFn: (data: UserRegister) => authRegister(data), // aqui no agarra el login del metodo authRepository 
      onSuccess: ( response ) => {
        // Invalidate and refetch

        if (response) {
          authenticated(response)

          toast({
            title: `Hi!! Welcome ${response.user?.name}`,
            description: 'Thank you for Join us'
          })
        }
        
       
      }
    })

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          name: "",
          email: "",
          password: ""
        },
      })
    
      function onSubmit(values: z.infer<typeof registerSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutation.mutate(values)

      }

  return (
    <div className='px-5 '>
          <h2 className='text-white text-4xl text-center'>Create an account</h2>
          <p className='text-darkLight text-center'>Join us and enjoy</p>

          {
            mutation.error
            &&
            <span className='text-redPrimary block text-center mt-2'>{ mutation.error.message }</span>
          }

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full  space-y-4 mt-5">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                    className='w-3/4 lg:w-1/2'
                  >
                    <FormLabel className='text-gray'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Test" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                    className='w-3/4 lg:w-1/2'
                  >
                    <FormLabel className='text-gray'>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="test@test.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem
                  className='w-3/4 lg:w-1/2' 
                  >
                    <FormLabel className='text-gray'>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" 
                      size='lg' 
                      className='w-3/4 lg:w-1/2 bg-white text-black hover:text-white'
                      disabled={mutation.isPending}
              >
                {
                  mutation.isPending
                  ? <LoaderCircle className='animate-spin w-5 h-5' />
                  : 'Submit'
                }
              </Button>
            </form>
          </Form>
        </div>
  )
}
