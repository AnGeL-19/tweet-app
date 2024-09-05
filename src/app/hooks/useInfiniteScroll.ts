
import { useEffect, useRef } from 'react'

interface Options {
    fn: () => void,
    threshold?: number;
}

export const useInfiniteScroll = ({ fn, threshold = 1 }:Options) => {

    const observerTarjet = useRef(null)

    useEffect(() => {
      
        const observer = new IntersectionObserver( 
            entries => {
                if (entries[0].isIntersecting) {
                    fn()
                }
            },
            {
                threshold
            }
        )

        if (observerTarjet.current) {
            observer.observe(observerTarjet.current)
        }
    
      return () => {
        if (observerTarjet.current) {
            observer.unobserve(observerTarjet.current)
        }
      }
    }, [observerTarjet])
    

  return {
    ref: observerTarjet
  }
}
