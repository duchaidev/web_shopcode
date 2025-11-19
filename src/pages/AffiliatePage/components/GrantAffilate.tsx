import { Table, TableProps, Tag } from 'antd';
import React from 'react';
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Mức',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: 'Số tiền kiếm từ giới thiệu',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: '% hoa hồng',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: 'Số tiền kiếm được hiện tại',
        dataIndex: 'tags',
        key: 'tags',
        align: 'center',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: '1',
        age: 32,
        address: '	0đ - 1.000.000đ',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: '2',
        age: 42,
        address: '1.000.001đ - 3.000.000đ',
        tags: ['loser'],
    },
    {
        key: '3',
        name: '3',
        age: 32,
        address: '	> 3.000.001đ',
        tags: ['cool', 'teacher'],
    },
];
const GrantAffilate = () => {
    return (
        <div className='py-4 px-6'>
            <span className=" text-[15px] uppercase font-bold text-gray2">
                CÁC CẤP HOA HỒNG
            </span>
            <div className='mt-5'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default GrantAffilate;