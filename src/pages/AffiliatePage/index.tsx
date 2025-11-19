import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Overview from './components/Overview';
import Member from './components/Member';
import History from './components/History';
import GrantAffilate from './components/GrantAffilate';

const AffiliatePage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const onChange = (key: string) => {
        navigate(`/profile/affiliate/${key}`);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span className='font-semibold text-[16px]'>Tổng quan</span>,
            children: <Overview />,
        },
        {
            key: '2',
            label: <span className='font-semibold text-[16px]'>Thành viên</span>,
            children: <Member />,
        },
        {
            key: '3',
            label: <span className='font-semibold text-[16px]'>Lịch sử</span>,
            children: <History />,
        },
        {
            key: '4',
            label: <span className='font-semibold text-[16px]'>Cấp hoa hồng</span>,
            children: <GrantAffilate />,
        },
    ];
    return (
        <div className='bgMenuProfile rounded-xl'>
            <Tabs activeKey={`${id ? id : "1"}`} items={items} onChange={onChange} />
        </div>
    );
};

export default AffiliatePage;