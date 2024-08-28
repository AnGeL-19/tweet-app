
import { TabTweet } from '@/app/components/shared/tabs/TabTweet'
import React, { useEffect, useRef, useState } from 'react'


export const BookMarksPage = () => {

  // tweets/saved
  // tweets/liked

  const tabs = useRef([
    {
      value: 'tweets',
      title: 'Tweets',
      selected: true
    },
    {
      value: 'tweets&replies',
      title: 'Tweets & replies',
      selected: false
    },
    {
      value: 'media',
      title: 'Media',
      selected: false
    },
    {
      value: 'likes',
      title: 'Likes',
      selected: false
    }
  ])

  
  return (
    <div className='w-full px-4'>

      <TabTweet tabs={tabs.current} />

    </div>
  )
}
