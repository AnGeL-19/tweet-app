import React, { ChangeEvent, useContext, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { commentSchema } from '@/app/validations/comment.schema'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Image, LoaderCircle } from 'lucide-react'
import { ImageSelected } from '../image/ImageSelected'
import { ContextPost } from '@/app/context/post/contextPost'
import { tweetSservice } from '@/core/domain/services/index.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomError } from '@/core/domain/errors/custom.error'


 
export const FormComment = () => {

    const queryClient = useQueryClient();
    const { id, user, handleShowComments, showComments } = useContext(ContextPost)

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
          comment: "",
          image: null
        },
    })

    const [url, setUrl] = useState({
        img: '',
        name: ''
    })

    const mutationCreateComment = useMutation({
        mutationFn: ({id, data}: {id: string, data: FormData }) => tweetSservice.createComment(id,data),
        onSuccess: ( response ) => {
          // Invalidate and refetch

          if (response) {

            if (!showComments) {
                handleShowComments()
            } 

            queryClient.setQueryData(['comments', id], (data : any) => {

                const { pages, ...rest } = data;

                pages[0] = [response, ...pages[0]]

                return {
                    ...rest,
                    pages
                }

            })
            // queryClient.invalidateQueries(['projects'])
            // createComment(response)
          }
         
    
        },
        onError: (error: CustomError) => {
          console.log(error, 'SI HAY ERRORES', error.getDataValidation());
    
        }
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
    function onSubmit(values: z.infer<typeof commentSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        let data = new FormData();
        data.append('comment', values.comment);
        if (values.image) {
          data.append('fileImage', values.image, values.image.name );
        }

        mutationCreateComment.mutateAsync({
            id,
            data
        })

        setUrl({
            img: '',
            name: ''
        })

        form.reset()
    }

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
            <Avatar>
                <AvatarImage  src={user?.profileImage} />
                <AvatarFallback className='text-black'>{user?.name}</AvatarFallback>
            </Avatar>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem
                                className='w-full relative'
                            >
                                <FormControl
                                    className='w-full'
                                >
                                    <Input 
                                        placeholder="Tweet your reply"
                                        {...field}
                                        className='w-full pr-10 font-medium text-darkLight bg-zinc-100 focus:bg-white border-gratSemiBold focus-visible:ring-0 focus-visible:ring-transparent' 
                                    />    
                                </FormControl>
                                <div className='absolute top-1 right-3'>
                                    <Label htmlFor={id} className='cursor-pointer hover:bg-gray'>
                                        <Image className='h-4 w-4 text-gratSemiBold hover:text-darkSemiBold' />
                                    </Label>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Input 
                        id={id}
                        type='file' 
                        name='image'
                        className='hidden' 
                        onChange={onChangeFile}
                        accept="image/jpeg, image/png, image/gif, image/webp"
                    />
                
                </form>
            </Form>  
        </div>
        {
            url.img
            &&
            <ImageSelected 
                src={url.img} 
                alt={url.name} 
                removeImage={removeImage}
            />
        }
        {
            mutationCreateComment.isPending
            &&
            <div className='w-full flex justify-center'>
                <LoaderCircle className='w-4 h-5 animate-spin'  />
            </div>
        }
    </div>
    
  )
}

