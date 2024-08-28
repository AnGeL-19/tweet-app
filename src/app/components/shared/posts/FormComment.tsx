import React, { ChangeEvent, useContext, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { commentSchema } from '@/app/validations/comment.schema'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Image } from 'lucide-react'
import { ImageSelected } from '../image/ImageSelected'
import { ContextPost } from '@/app/context/post/contextPost'
import { IComment } from '@/app/interfaces/post.interface'


 
export const FormComment = () => {

    const { createComment, id } = useContext(ContextPost)

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
        console.log(values)
        const newComment: IComment = {
            id: crypto.randomUUID(),
            comment: values.comment,
            date: new Date().toDateString(),
            imgComment: url.img ,
            numLikes: 0,
            liked: false,
            user: {
              id: 'u41232',
              name: 'Angel Muñoz',
              profileImage: 'https://github.com/shadcn.png'
            }
          }

        createComment(newComment)

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
                <AvatarImage  src={'https://github.com/shadcn.png'} />
                <AvatarFallback className='text-black'>Angel M</AvatarFallback>
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
    </div>
    
  )
}

