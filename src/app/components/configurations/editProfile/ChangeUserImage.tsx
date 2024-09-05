
import { Camera } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import { Input } from '../../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { userService } from '@/core/domain/services/index.service';
import { getUrlPublicId } from '@/app/lib/getPublicId';
import { AlertUpdate } from './AlertUpdate';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../ui/use-toast';
import { CustomError } from '@/core/domain/errors/custom.error';
import { useAppSelector } from '@/app/context/store/hook';
import { ContextAuth } from '@/app/context/auth/contextAuth';
import { Skeleton } from '../../ui/skeleton';

interface Props {
    name: string;
    img: string;
}

export const ChangeUserImage = ({ name, img }: Props) => {

    const user = useAppSelector(state => state.auth.user)
    const { updateUser } = useContext(ContextAuth)

    const [formData, setFormData] = useState({
        query: '',
        data: new FormData()
    })

    const [image, setImage] = useState(img)

    const { toast } = useToast()
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const mutation = useMutation({
        mutationFn: ({query, data}:{query: string, data: FormData}) => userService.updateImage(query, data), 
        onSuccess: ( response ) => {
          if (response) {
            const { profileImage, ...rest } = user!
            updateUser({
                ...rest,
                profileImage: response.url
            })
  
            toast({
              title: `Image updated Success`,
              description: 'Now, people can see your new image :)',
              className: 'bg-green-200'
            })
          }else{
            toast({
                title: `Error updated image`,
                description: 'Failed to update the image :(',
                className: 'bg-red-200'
              })
          }
        },
        onError: (error: CustomError) => {
          console.log(error, 'SI HAY ERRORES', error.getDataValidation());
          
        }
    })
 
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files
        const imageFile = file![0];

        const url = URL.createObjectURL(imageFile);

        setImage(url)

        const public_id = getUrlPublicId(img);
        const query = `upload/user/profile/image/${public_id}`

        const data = new FormData()
        data.append('fileImage', imageFile, imageFile.name );

        setFormData({
            data,
            query
        })
        
        btnRef.current?.click()
      
    }

    const handleUpdate = () => {
        mutation.mutate({
            data: formData.data,
            query: formData.query
        })
    }

    const handleCancel = () => {
        setImage(img)
        setFormData({
            data: new FormData,
            query: ''
        })
    }

    return (
        <>
            <AlertUpdate 
                ref={btnRef} 
                title='Are you sure you want to change the image?'
                text='Your profile image will change'
                onAccept={handleUpdate} 
                onCancel={handleCancel}
            />
        
            <div className='relative group'>
                {
                    mutation.isPending
                    ? (
                        <Skeleton className='h-24 w-24 border-2 sm:h-32 sm:w-32 sm:border-4 border-white rounded-full shadow-md' />
                    ) 
                    : (
                        <Avatar className='h-24 w-24 border-2 sm:h-32 sm:w-32 sm:border-4 border-white shadow-md'>
                            <AvatarImage src={image}>
                            </AvatarImage>
                            <AvatarFallback>
                                {name}
                            </AvatarFallback>
                        </Avatar>
                    )
                }
                
                
                <div className='hidden group-hover:flex absolute z-10 top-0 h-24 w-24 border-2 sm:h-32 sm:w-32 rounded-full bg-black group-hover:transition-opacity opacity-50 '>
                    <label className='w-full h-full flex justify-center items-center relative cursor-pointer' htmlFor='user-image'>

                        <Camera className='absolute z-20 w-10 h-10 text-white' />

                        <Input
                            id='user-image'
                            type='file'
                            className='hidden'
                            onChange={handleChangeImage}
                            accept="image/jpeg, image/png, image/gif, image/webp"
                        />
                    </label>
                </div>
            </div>
        </>
    )
}
