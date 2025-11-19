import HeaderAdmin from '@/components/organisms/HeaderAdmin';
import { Button, Layout, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuComponent from './MenuComponent';

const AdminLayout = () => {

    return (
        <div>
            <Layout className='overflow-hidden w-full bg-[#f0f2f5] min-h-screen'>
                <Header className='bg-white p-0 leading-5 h-[60px] border-b w-full fixed top-0 left-0 right-0'>
                    <HeaderAdmin />
                </Header>
                <div className='flex mt-[60px]'>
                    <MenuComponent />
                    <Content className=' bg-[#f0f2f5] ml-[246px] mt-[12px]'>
                        <div className='h-full'>
                            <Outlet />
                        </div>
                    </Content>
                </div>

            </Layout >
        </div >
    );
};

export default AdminLayout;