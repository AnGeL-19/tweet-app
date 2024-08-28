import React, { useEffect, useRef } from 'react'
import { TabTweet } from '@/app/components/shared/tabs/TabTweet'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Search } from 'lucide-react'
import { useLocation, useNavigation, useParams, useRoutes } from 'react-router'
import { SearchTweet } from '@/app/components/explore/SearchTweet'


export const ExplorePage = () => {
  const tabs = useRef([
    {
      value: 'top',
      title: 'Top',
      selected: true
    },
    {
      value: 'lastest',
      title: 'Lastest',
      selected: false
    },
    {
      value: 'people',
      title: 'People',
      selected: false
    },
    {
      value: 'media',
      title: 'Media',
      selected: false
    }
  ])



  return (
    <div className='w-full px-4'>

      <TabTweet tabs={tabs.current} >
        <SearchTweet />
      </TabTweet>

    </div>
  )
}
