import { urlImage } from '@/repository/ImageUrl'
import React, { FC, useRef } from 'react'

const ImageAutoScroll: FC<{
  height: number
  width?: string
  image: string
}> = ({ height, width = '100%', image }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const scrollSpeed = 2 // Pixels per frame, you can adjust this value
  const returnSpeed = 6 // Pixels per frame, you can adjust this value

  const handleMouseOver = () => {
    if (imageRef.current) {
      const imageHeight = imageRef.current.scrollHeight - height // Cuộn đến cuối ảnh trừ đi chiều cao của container
      const step = () => {
        if (imageRef.current) {
          const currentTransform = imageRef.current.style.transform.match(/-?\d+\.?\d*/)
          const currentY = currentTransform ? parseFloat(currentTransform[0]) : 0

          if (currentY > -imageHeight) {
            imageRef.current.style.transform = `translateY(${currentY - scrollSpeed}px)`
            animationFrameRef.current = requestAnimationFrame(step)
          } else {
            cancelAnimationFrame(animationFrameRef.current!)
          }
        }
      }
      step()
    }
  }

  const handleMouseOut = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (imageRef.current) {
      const step = () => {
        if (imageRef.current) {
          const currentTransform = imageRef.current.style.transform.match(/-?\d+\.?\d*/)
          const currentY = currentTransform ? parseFloat(currentTransform[0]) : 0

          if (currentY < 0) {
            imageRef.current.style.transform = `translateY(${currentY + returnSpeed}px)`
            animationFrameRef.current = requestAnimationFrame(step)
          } else {
            cancelAnimationFrame(animationFrameRef.current!)
          }
        }
      }
      step()
    }
  }

  return (
    <div
      className={`w-[${width}] h-[${height}px] overflow-hidden relative`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img
        ref={imageRef}
        alt='Long Image'
        src={`${urlImage()}${image}`}
        className='w-full transition-transform ease-linear rounded-md'
      />
    </div>
  )
}

export default ImageAutoScroll
