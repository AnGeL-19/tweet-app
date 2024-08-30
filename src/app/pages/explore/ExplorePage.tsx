import React, { useEffect, useRef } from 'react'
import { TabTweet } from '@/app/components/shared/tabs/TabTweet'

import { SearchTweet } from '@/app/components/explore/SearchTweet'
import { TabPostListExplore } from '@/app/components/explore/tab/TabPostListExplore'


export const ExplorePage = () => {


  const tabs = useRef([
    {
      value: 'top',
      title: 'Top',
      selected: true,
      componentRender: () => <TabPostListExplore />
    },
    {
      value: 'lastest',
      title: 'Lastest',
      selected: false,
      componentRender: () => <TabPostListExplore />
    },
    {
      value: 'people',
      title: 'People',
      selected: false,
      componentRender: () => <span>Comming soon People</span>
    },
    {
      value: 'media',
      title: 'Media',
      selected: false,
      componentRender: () => <span>Comming soon Media</span>
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
