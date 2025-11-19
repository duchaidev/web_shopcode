import React, { useEffect, useState } from 'react'

const useInfiniteScrolling = (hasMore: boolean, ref?: any) => {
  const [pageIndex, setPageIndex] = useState(1)
  useEffect(() => {
    const handleScroll = () => {
      if (ref && ref.current) {
        const bottom = Math.ceil(ref.current.scrollHeight - ref.current.scrollTop) <= ref.current.clientHeight
        if (bottom && hasMore) {
          setPageIndex((prevPageIndex) => prevPageIndex + 1)
        }
      } else {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom && hasMore) {
          setPageIndex((prevPageIndex) => prevPageIndex + 1)
        }
      }
    }

    if (ref && ref.current) {
      ref.current.addEventListener('scroll', handleScroll)
      return () => ref.current.removeEventListener('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [hasMore, ref])
  return pageIndex
}

export default useInfiniteScrolling
