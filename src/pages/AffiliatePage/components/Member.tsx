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
        title: '#',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên đăng nhập',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Thời gian tham gia',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Số lần mua hàng',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Số tiền nhận được',
        dataIndex: 'address',
        key: 'address',
    },


];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
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
const Member = () => {
    return (
        <div className='py-4 px-6'>
            <span className=" text-[15px] font-bold text-gray2">
                DANH SÁCH BẠN BÈ ĐƯỢC BẠN GIỚI THIỆU
            </span>
            <div className='mt-5'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Member;