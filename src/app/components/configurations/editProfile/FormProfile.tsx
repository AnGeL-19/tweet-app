import { LoaderCircle } from 'lucide-react'
import React, { useContext } from 'react'

import { Button } from '../../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../../ui/form'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { useAppSelector } from '@/app/context/store/hook'
import { profileSchema } from '@/app/validations/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userService } from '@/core/domain/services/index.service'
import { UpdateUser } from '@/core/domain/entities/user.entity'
import { ContextAuth } from '@/app/context/auth/contextAuth'
import { CustomError } from '@/core/domain/errors/custom.error'
import { useToast } from '../../ui/use-toast'

export const FormProfile = () => {

  const { toast } = useToast()

  const { updateUser } = useContext(ContextAuth)
  const user = useAppSelector(state => state.auth.user )

  const mutation = useMutation({
    mutationFn: (data: UpdateUser) => userService.updateUser(data), 
    onSuccess: ( response ) => {
      // Invalidate and refetch

      if (response) {
        
        updateUser(response)

        toast({
          title: `User updated success`,
          description: 'the information was updated',
          className: 'bg-green-200'
        })
      }
      
     
    },
    onError: (error: CustomError) => {
      console.log(error, 'SI HAY ERRORES', error.getDataValidation());
      
    }
  })

  const form = useForm<z.infer<typeof profileSchema>>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: user?.name || "",
        password: "",
        bio: user?.bio || ""
      },
    })
  
    function onSubmit(values: z.infer<typeof profileSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      mutation.mutate(values)

    }

  return (
    <div className='mt-20'>

      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full  space-y-4 mt-5">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem
                  className='w-full sm:w-3/4'
                  >
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                      <Input placeholder="Test" {...field} />
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
                  className='w-full sm:w-3/4'
                  >
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                      <Input placeholder="*******" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                  <FormItem
                  className='w-full sm:w-3/4'
                  >
                  <FormLabel>Presentation</FormLabel>
                  <FormControl>
                      {/* <Input placeholder="*******" type='password'  /> */}
                      <Textarea {...field}  />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              
              <Button type="submit" 
                      size='lg' 
                      className='w-1/2 sm:w-1/4 bg-bluePrimary'
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
