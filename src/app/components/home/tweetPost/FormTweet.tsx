import React, { ChangeEvent, useState } from 'react'
import { Textarea } from '../../ui/textarea'
import { Button } from '../../ui/button'
import { DropMenuAccesibility } from './DropMenuAccesibility'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { tweetSchema } from '@/app/validations/tweet.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { ImageSelected } from '../../shared/image/ImageSelected'
import { useMutation } from '@tanstack/react-query'
import { CreatePost } from '@/core/domain/entities/tweet.entity'
import { CustomError } from '@/core/domain/errors/custom.error'
import { useToast } from '../../ui/use-toast'
import { tweetSservice } from '@/core/domain/services/index.service'


export const FormTweet = () => {

    const { toast } = useToast()

    const mutation = useMutation({
        mutationFn: (data: CreatePost) => tweetSservice.createTweet(data), // aqui no agarra el login del metodo authRepository 
        onSuccess: ( response ) => {
          // Invalidate and refetch
          console.log('CREATED', response );
  
          if (response) {
            console.log('si entra');
            

            toast({
                title: "Post created success",
                description: 'Tweet see in your profile'
            })

            // authenticated(response)
          }
          
         
        },
        onError: (error: CustomError) => {
          console.log(error, 'SI HAY ERRORES', error.getDataValidation());
          
        }
      })

    const form = useForm<z.infer<typeof tweetSchema>>({
        resolver: zodResolver(tweetSchema),
        defaultValues: {
          tweet: '',
          image: null,
          accesibility: 'public'
        },
      })

      const [url, setUrl] = useState({
        img: '',
        name: ''
      })

      const removeImage = () => {
        
        setUrl(prev => ({
            ...prev,
            img: '',
            name: ''
        }))

        form.setValue('image', null)

      }

      const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {

            const file = event.target.files

            const url = URL.createObjectURL(file![0]);

            setUrl(prev => ({
                ...prev,
                img: url,
                name: file![0].name
            }))

            form.setValue('image', file![0])
      }
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof tweetSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        mutation.mutate({
            accesibility: values.accesibility === 'public' ? true : false,
            image: values.image,
            tweet: values.tweet
        })

        setUrl({
            img: '',
            name: ''
        })

        form.reset()
      }

    const onSelectAccesibility = (value : string) => {
        form.setValue('accesibility', value)
    }

  return (
    <div className='w-full '>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="tweet"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea 
                                {...field}
                                placeholder='What’s happening?'
                                className='max-h-20 border-none text-base font-medium text-gratSemiBold ' 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {
                    url.img
                    &&
                    <ImageSelected 
                        src={url.img} 
                        alt={url.name} 
                        removeImage={removeImage}
                    />
                }
                <div className='flex justify-between items-center'>
                    <div className='flex gap-1 items-center'>
                        <Label className='cursor-pointer hover:bg-gray p-2 rounded-2xl'>
                            <Image className='h-4 w-4 ' />
                            <Input type='file' 
                                name='image'
                                className='hidden' 
                                onChange={onChangeFile}
                                accept="image/jpeg, image/png, image/gif, image/webp"
                                />
                            {
                                form.formState.errors.image 
                                && 
                                <span className='text-red-500'>{ form.formState.errors.image.message}</span>
                            }
                         </Label>

                        <DropMenuAccesibility onSelect={onSelectAccesibility} />

                    </div>


                    <Button type='submit' 
                        size='sm' 
                        className='bg-bluePrimary'
                        disabled={ !form.watch('tweet') && !url.img }
                    >Tweet</Button>     
                </div>
            </form>
        </Form>
    </div>
  )
}
