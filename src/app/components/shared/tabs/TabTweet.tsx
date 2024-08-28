import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { PostsList } from '@/app/components/shared/posts/PostsList'
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface ITab {
    value: string;
    title: string;
    selected: boolean;
    componentRender: () => JSX.Element
}

interface Props {
    children?: React.ReactNode,
    tabs: ITab[]
}

export const TabTweet = ({ tabs, children }:Props) => {

    const [selectedTab, setSelected] = useState<ITab[]>(tabs)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      searchParams.set('filter', selectedTab.find( f => f.selected)?.value||'')
      setSearchParams(searchParams)
    }, [selectedTab])
    

    const handleSelect = useCallback(
      (value: string) => {
        setSelected(prev => prev.map( t => {
          if (t.value === value) {
            return {
              ...t,
              selected: true
            }
          }else{
            return {
              ...t,
              selected: false
            }
          }
        }))
      },
      [selectedTab],
    )
    
  

  return (
    <Tabs defaultValue={selectedTab.find( f => f.selected)?.value} className="w-full flex flex-col lg:flex-row  gap-6">

        <div className='w-full lg:w-[306px]'>
          <TabsList className="w-full lg:w-[306px] h-fit pb-0 pt-5 lg:py-5 px-0 bg-white flex flex-row items-center lg:flex-col lg:items-start gap-4 shadow">

            {
              selectedTab.map((tab) => (  
                <TabsTrigger 
                  key={tab.value}
                  onClick={() => handleSelect(tab.value)}
                  value={tab.value} 
                  className='w-full hover:bg-zinc-50 rounded-none p-0 gap-4 flex-col-reverse lg:flex-row items-center'
                >
                  <span className={`w-full h-1 lg:w-1 lg:h-8 rounded-r ${tab.selected && 'bg-bluePrimary'}`}></span>
                  <span className='font-semibold '>{tab.title}</span>
                </TabsTrigger>
              ))
            }

          </TabsList>
        </div>
        
        <div className="flex flex-col gap-5 flex-grow">
            {
                children
            }

            {
              selectedTab.map( ( tab ) => (
                  <TabsContent key={`${tab.value}-c`} value={tab.value} className='w-full m-0'>
                      {tab.componentRender()}
                  </TabsContent>
              ))
            }
        </div>

      </Tabs>
  )
}
