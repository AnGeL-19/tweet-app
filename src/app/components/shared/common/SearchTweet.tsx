import { Search } from 'lucide-react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export const SearchTweet = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: ''
    }
  })

  useEffect(() => {
    setValue('search', searchParams.get('search') || '')
  }, [searchParams.get('search')])
  

  const onSubmit = (values: any) => {
    if (values.search.length === 0) {
      searchParams.delete('search')
    }else{
      searchParams.set('search', values.search)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className='w-full relative'>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Search className='w-4 h-4 text-darkLight absolute top-5 left-3' />
          <Input {...register('search')} placeholder='Search' 
          className='w-full h-14 text-darkLight font-medium pl-10 pr-24' />
          <Button type='submit' className='text-white bg-bluePrimary absolute top-2 right-2'>
            Search
          </Button>
      </form>
        
    </div>
  )
}
