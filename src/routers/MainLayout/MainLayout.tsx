import Footer from '@/components/molecules/Footer'
import HeaderLayout from '@/components/organisms/HeaderLayout'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className=''>
      <Layout className='overflow-hidden w-full bg-white'>
        <Header className='bg-white p-0 leading-5 px-[5%] h-auto text-center'>
          <HeaderLayout />
        </Header>
        <Content className='min-h-[80vh] pb-20 px-[5%] bg-white'>
          <Outlet />
        </Content>
        <div>
          <Footer></Footer>
        </div>
      </Layout>
    </div>
  )
}

export default MainLayout
