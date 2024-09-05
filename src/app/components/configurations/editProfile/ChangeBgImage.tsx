import React, { useContext, useRef, useState } from 'react'
import { Input } from '../../ui/input'
import { getUrlPublicId } from '@/app/lib/getPublicId';
import { useAppSelector } from '@/app/context/store/hook';
import { ContextAuth } from '@/app/context/auth/contextAuth';
import { useToast } from '../../ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { userService } from '@/core/domain/services/index.service';
import { AlertUpdate } from './AlertUpdate';
import { Skeleton } from '../../ui/skeleton';
import { Camera } from 'lucide-react';

interface Props {
    bgImg: string;
}

export const ChangeBgImage = ({bgImg}:Props) => {

    const user = useAppSelector(state => state.auth.user)
    const { updateUser } = useContext(ContextAuth)

    const [formData, setFormData] = useState({
        query: '',
        data: new FormData()
    })

    const [image, setImage] = useState(bgImg)

    const { toast } = useToast()
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const mutation = useMutation({
        mutationFn: ({query, data}:{query: string, data: FormData}) => userService.updateImage(query, data), 
        onSuccess: ( response ) => {
          if (response) {
            const { backGroundImage, ...rest } = user!
            updateUser({
                ...rest,
                backGroundImage: response.url
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
        }
    })
 
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files
        const imageFile = file![0];

        const url = URL.createObjectURL(imageFile);

        setImage(url)

        const public_id = getUrlPublicId(bgImg);
        const query = `upload/user/background/image/${public_id}`

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
        setImage(bgImg)
        setFormData({
            data: new FormData,
            query: ''
        })
    }

  return (
    <>
        <AlertUpdate 
            ref={btnRef} 
            title='Are you sure you want to change the background image?'
            text='your profile background will be changed with the new image'
            onAccept={handleUpdate} 
            onCancel={handleCancel}
        />
        <div className='w-full h-[200px] sm:h-[250px] rounded overflow-hidden relative'>

            {
                mutation.isPending
                ? (<Skeleton className='w-full h-full bg-zinc-300' />) 
                : (<img className='w-full h-full' src={image} alt="bg" />)
            }
           

            <label className='absolute top-0 right-0 p-2 z-10' htmlFor='bg-image'>
                <div className='bg-bluePrimary hover:bg-blueSave rounded cursor-pointer py-1 px-2 '>
                    <span className='hidden sm:flex text-gray text-sm font-medium'>Change photo</span>
                    <Camera className='flex sm:hidden w-5 h-5 text-white' />
                </div>
                
                <Input 
                    id='bg-image'
                    type='file' 
                    className='hidden'
                    onChange={handleChangeImage}
                    accept="image/jpeg, image/png, image/gif, image/webp"
                />
            </label>
        </div>
    
    </>
    
  )
}
