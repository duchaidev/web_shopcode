import ItemTrendingCategory from './components/ItemTrendingCategory'
import Popular from './components/Popular'
import SkeletonItemTrendingCategory from './components/SkeletonItemTrendingCategory'
import { useAppSelector } from '@/stores'

const HomePage = () => {
  const { listAllCategory } = useAppSelector((state) => state.category)

  return (
    <div className='py-5 flex flex-col px-[5%]'>
      <div className='flex items-center justify-center'>
        <div className=' flex-col gap-8 text-center w-[800px] mt-14'>
          <h1 className='text-[44px] font-bold leading-[50px]'>
            Chào mừng bạn đến với <span className='text-primary'>ShopWeb</span>
          </h1>
          <p className='mt-6 text-base'>
            Hãy cùng khám phá hàng ngàn trang web đẹp mắt và chất lượng từ trang web của chúng tôi
          </p>
        </div>
      </div>
      <div className='flex mt-20 flex-col '>
        <h2 className='text-[22px] font-bold'>Browse Trending Categories</h2>
        <div className='grid w-full grid-cols-6 gap-6 mt-7'>
          {listAllCategory?.length > 0
            ? [...listAllCategory] // Tạo bản sao của mảng
                .sort((a: any, b: any) => b.is_popular - a.is_popular) // Sắp xếp các mục có is_popular = 1 lên đầu
                .slice(0, 6) // Lấy tối đa 6 mục
                .map((item) => (
                  <ItemTrendingCategory
                    key={item.id}
                    to={`/category/${item.slug}`}
                    imgSrc={item.image}
                    title={item.name}
                  />
                ))
            : Array.from({ length: 6 }).map((_, index) => <SkeletonItemTrendingCategory key={index} />)}
        </div>
      </div>
      <Popular />
      <Popular />
      <Popular />
    </div>
  )
}

export default HomePage
