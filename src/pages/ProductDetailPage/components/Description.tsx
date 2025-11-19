import React, { useState } from 'react'

const Description = ({ description }: { description: any }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const truncatedDescription = description?.split(' ').slice(0, 90).join(' ')

  return (
    <div className=' flex flex-col gap-3'>
      <span className='font-semibold text-2xl text-gray-700 tracking-wide'>About the Product</span>
      <span
        className='text-[15px]'
        dangerouslySetInnerHTML={{
          __html: description?.split(' ')?.length < 90 || isExpanded ? description : `${truncatedDescription}...`
        }}
      ></span>
      {description?.split(' ')?.length > 90 && (
        <div
          className={`text-primary underline cursor-pointer ${
            isExpanded ? '' : 'bg-white'
          }  bg-opacity-80 pt-8 -translate-y-9`}
          onClick={toggleExpand}
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </div>
      )}
    </div>
  )
}

export default Description
