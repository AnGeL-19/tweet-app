import React, { useEffect, useState } from 'react'

export const useScrollSticky = () => {

    const [positionTopDown, setPositionTopDown] = useState<boolean | null>(null) // true TOP - Down false
    const [scrollPosition, setScrollPosition] = useState(0);
  
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos === 0) {
        setPositionTopDown(null)
      } else if (currentScrollPos > scrollPosition) {
        console.log('Scrolling down');
        console.log(currentScrollPos, 'DOWN');
        
        setPositionTopDown(false)
      } else {
        console.log('Scrolling up');
        console.log(currentScrollPos, 'UP');
        setPositionTopDown(true)
      }
      setScrollPosition(currentScrollPos);
    };
  
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
