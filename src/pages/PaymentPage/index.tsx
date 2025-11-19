import { Space, Table, TableProps, Tabs, TabsProps, Tag } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./PaymentStyle.scss"
import DepositComponent from './components/DepositComponent';
import WithdrawComponent from './components/WithdrawComponent';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const onChange = (key: string) => {
        navigate(`/profile/deposit-withdrawal/${key}`);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span className='font-semibold text-[16px]'>Nạp tiền qua ngân hàng - ATM - Ví điện tử</span>,
            children: <DepositComponent />,
        },
        {
            key: '2',
            label: <span className='font-semibold text-[16px]'>Rút tiền</span>,
            children: <WithdrawComponent />,
        },

    ];

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '#',
            dataIndex: 'age',
            key: 'age',
            render: (text) => <a>{text}</a>,
            align: 'center',
        },
        {
            title: 'Mã giao dịch',
            dataIndex: 'age',
            key: 'age',
            align: 'center',
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'age',
            key: 'age',
            align: 'center',
        },
        {
            title: 'Ngân hàng',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
        },
        {
            title: 'Số tiền',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Nội dung',
            dataIndex: 'address',
            key: 'address',

        },
        {
            title: 'Thời gian',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'address',
            key: 'address',
        },

    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div>
            <div className='rounded-xl bgMenuProfile'>
                <Tabs defaultActiveKey={`${id ? id : "1"}`} items={items} onChange={onChange} />
            </div>
            <div className='rounded-xl bgMenuProfile mt-4 py-4 px-8'>
                <p className='font-semibold uppercase pb-5'>Lịch sử giao dịch</p>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default PaymentPage;