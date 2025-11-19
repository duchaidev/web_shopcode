import HouseIcon from '@/components/icons/HouseIcon';
import { Avatar, Button, Collapse } from 'antd';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

const LableCollapse = () => {
    return <div className='flex justify-end flex-col'>
        <p className='text-end font-semibold text-lg'>
            Thành tiền: <span className='text-primary'> 2.000.000</span>
        </p>
        <div className='w-full flex justify-between items-center py-5'>
            <span className='italic text-gray-400'>Đánh giá sản phẩm để nhận điểm tích lũy</span>
            <div>
                <Button type='primary' onClick={(e) => {
                    e.stopPropagation();
                    console.log('Liên hệ với shop');
                }}>Liên hệ với shop</Button>
            </div>
        </div>
    </div>
}

const ContentCollapse = () => {
    return <div className='border-t grid grid-cols-10'>
        <div className="flex flex-col col-span-7 text-right">
            <span className="px-3 py-3 border-t border-r">
                Tổng tiền hàng
            </span>
            <span className="px-3 py-3 border-t border-r">
                Voucher từ Duc Hai
            </span>
            <span className="px-3 py-3 border-t border-r">
                Voucher từ Shop
            </span>
            <span className="px-3 py-2 border-t border-r text-[18px] font-bold text-blue7">
                Thành tiền
            </span>
            <span className="px-3 py-3 border-t border-r">
                Phương thức thanh toán
            </span>
        </div>
        <div className="flex flex-col col-span-3 text-right">
            <span className="px-3 py-3 border-t">
                200.000
            </span>
            <span className="px-3 py-3 border-t">
                0
            </span>
            <span className="px-3 py-3 border-t">
                0
            </span>
            <span className="px-3 py-2 font-bold border-t text-[18px] text-blue7">
                200.000
            </span>
            <span className="px-3 py-3 border-t">
                Banking
            </span>
        </div></div>
}

const ItemProductOrder = () => {
    return (
        <div className='pt-3 bg-[#fbfbfb] border border-[#f3f3f3] rounded-md'>
            <div className='flex justify-between border-b px-6 pb-3'>
                <div className='flex items-center gap-2'>
                    <img src="https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-8 h-8 rounded-full object-cover' />
                    <span className='font-semibold'>DucHaiSHop</span>
                    <button className='px-3 py-1 ml-2 hover:bg-gray-100 transition-all border rounded-md text-primary border-primary flex items-center gap-1 justify-center'><HouseIcon></HouseIcon><span>Xem Shop</span></button>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='uppercase text-primary'>Đơn hàng thành công</span>
                    <span className='text-primary'>|</span>
                    <Button type='primary'>Tải code</Button>
                </div>
            </div>
            <div className='flex justify-between items-center border-b px-6 py-5'>
                <div className='flex items-center gap-3'>
                    <img src="https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-20 h-20 object-cover rounded-md' />
                    <p className='flex flex-col'>
                        <span className='font-semibold text-lg'>Seppo - Corporate One Page HTML Template</span>
                        <span>Phân loại ở đây nè</span>
                    </p>
                </div>
                <span className='font-semibold text-lg text-primary'>2.000.000</span>
            </div>
            <div className=''>
                <Collapse
                    size="small"
                    bordered={false}
                    expandIconPosition={'end'}
                    collapsible='header'
                    style={{ backgroundColor: "#f4fff2" }}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 180} />}
                    items={[{
                        key: '1', label: <LableCollapse />, children: <ContentCollapse />
                    }]}
                />
            </div>
        </div>
    );
};

export default ItemProductOrder;