import { useCallback, useEffect, useState } from 'react'

export const useScrollSticky = () => {

    const [positionTopDown, setPositionTopDown] = useState<boolean | null>(null) // true TOP - Down false
    const [scrollPosition, setScrollPosition] = useState(0);
  
    const handleScroll = useCallback(() => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos === 0) {
        setPositionTopDown(null)
      } else if (currentScrollPos > scrollPosition) {
        setPositionTopDown(false)
      } else {
        setPositionTopDown(true)
      }
      setScrollPosition(currentScrollPos);
    },[scrollPosition]);
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrollPosition]);

  return {
    positionTopDown
  }
}
