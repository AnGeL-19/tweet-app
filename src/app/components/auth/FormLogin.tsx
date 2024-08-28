
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { loginSchema } from '@/app/validations/login.shema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'

import { CustomError } from '@/core/domain/errors/custom.error'

import { useContext } from 'react'
import { ContextAuth } from '@/app/context/auth/contextAuth'
import { Login } from '@/core/domain/entities/auth.entity'
import { useToast } from '../ui/use-toast'



export const FormLogin = () => {

    const { authLogin, authenticated } = useContext(ContextAuth)
    const { toast } = useToast()

    const mutation = useMutation({
      mutationFn: (data: Login) => authLogin(data), // aqui no agarra el login del metodo authRepository 
      onSuccess: ( response ) => {
        // Invalidate and refetch
        console.log('amonos', response );

        if (response) {
          authenticated(response)

          toast({
            title: `Hi!! Welcome ${response.user?.name}`,
            description: 'Thank you for using this Application'
          })

        }
        
       
      },
      onError: (error: CustomError) => {
        console.log(error, 'SI HAY ERRORES', error.getDataValidation());
        
      }
    })

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })
    
      function onSubmit(values: z.infer<typeof loginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        mutation.mutateAsync(values)

      }

  return (
    <div className='px-5 '>
          <h2 className='text-white text-4xl text-center'>Login</h2>
          <p className='text-darkLight text-center'>Insert your email and password</p>

          {
            mutation.error?.getDataValidation()
            &&
            <span className='text-redPrimary block text-center mt-2'>{ mutation.error?.getDataValidation()?.msg }</span>
          }

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full  space-y-4 mt-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                    className='w-3/4 lg:w-1/2'
                  >
                    <FormLabel className='text-gray'>Username</FormLabel>
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
