import { useEffect, useRef } from 'react'
import { BannerBgImage } from '@/app/components/profile/BannerBgImage'
import { BannerProfile } from '@/app/components/profile/BannerProfile'
import { TabTweet } from '@/app/components/shared/tabs/TabTweet'
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/core/domain/services/index.service'
import { useParams } from 'react-router'
import { BannerBgImageSkeleton } from '@/app/components/profile/skeleton/BannerBgImageSkeleton'
import { BannerProfileSkeleton } from '@/app/components/profile/skeleton/BannerProfileSkeleton'
import { TabPostList } from '@/app/components/profile/tab/TabPostList'


export const ProfilePage = () => {

  // const user = useAppSelector( state => state.auth.user )
  const { id } = useParams()

  const { data, isLoading, refetch, isRefetching } = useQuery({ 
    queryKey: ['user', id], queryFn: () => userService.getUserById(id || ''),
    // staleTime: 1000 * 60 * 60, // 60 minutes 
  })

  useEffect(() => {
    refetch()
  }, [id])
  

  const tabs = useRef([
    {
      value: 'tweets',
      title: 'Tweets',
      selected: true,
      componentRender: () => <TabPostList />
    },
    {
      value: 'tweetsReplies',
      title: 'Tweets & replies',
      selected: false,
      componentRender: () => <TabPostList />
    },
    {
      value: 'media',
      title: 'Media',
      selected: false,
      componentRender: () => <TabPostList />
    },
    {
      value: 'likes',
      title: 'Likes',
      selected: false,
      componentRender: () => <TabPostList />
    }
  ])

  return (
    <div className='w-full px-4'>
      
      {
        isLoading || isRefetching
        ?
        <>
         <BannerBgImageSkeleton />
         <div className='mt-80'>
          </div>
          <BannerProfileSkeleton />
        </>
        :
        <>
          <BannerBgImage user={data!}/>
          <div className='mt-80'>
          </div>
          <BannerProfile user={data!} />
        </>

      }
      

      <TabTweet tabs={tabs.current}  />

    </div>
  )
}
