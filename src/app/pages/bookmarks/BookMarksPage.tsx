
import { TabPostListBookMarks } from '@/app/components/bookmarks/tab/TabPostListBookMarks'
import { TabTweet } from '@/app/components/shared/tabs/TabTweet'
import React, { useRef,  } from 'react'


export const BookMarksPage = () => {

  // tweets/saved
  // tweets/liked
  const tabs = useRef([
    {
      value: 'tweets',
      title: 'Tweets',
      selected: true,
      componentRender: () => <TabPostListBookMarks />
    },
    {
      value: 'tweetsReplies',
      title: 'Tweets & replies',
      selected: false,
      componentRender: () => <TabPostListBookMarks />
    },
    {
      value: 'media',
      title: 'Media',
      selected: false,
      componentRender: () => <span>Coming soon</span>
    },
    {
      value: 'likes',
      title: 'Likes',
      selected: false,
      componentRender: () => <TabPostListBookMarks />
    }
  ])

  return (
    <div className='w-full px-4'>

      <TabTweet tabs={tabs.current} />

    </div>
  )
}
