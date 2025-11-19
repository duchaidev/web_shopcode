import { Button, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

const WithdrawComponent = () => {

    function inputOnlyNumber(event: any) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);

        // Chỉ cho phép nhập số (0-9)
        if (!/^[0-9]+$/.test(keyValue)) {
            event.preventDefault();
        }
    }

    const onFinish: any = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed: any = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [listBank, setListBank] = useState([]);
    const handleFetchBank = async () => {
        try {
            const res = await axios.get("https://api.vietqr.io/v2/banks");
            setListBank(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleFetchBank();
    }, []);

    return (
        <div className="flex flex-col gap-3 py-3 px-8">
            <h3 className="font-semibold text-black">TẠO YÊU CẦU RÚT TIỀN</h3>
            <Form
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='middle'
            >
                <div className='grid grid-cols-2 gap-5'>
                    <div className=''>

                        <Form.Item label="Ngân hàng rút tiền" rules={[{ required: true, message: 'Vui lòng chọn ngân hàng rút tiền!' }]}>
                            <Select placeholder="Chọn ngân hàng">
                                {listBank?.length > 0 && listBank.map((item: any) => (
                                    <Select.Option value={item?.code}>{item?.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Số tài khoản"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                        >
                            <Input placeholder='Nhập số tài khoản' />
                        </Form.Item>
                        <Form.Item
                            label="Chủ tài khoản"
                            name="username"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input placeholder='Nhập chủ tài khoản' />
                        </Form.Item>
                        <Form.Item
                            label="Số tiền cần rút"
                            name="username"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input placeholder='Nhập số tiền cần rút' onChange={(value: any) => { inputOnlyNumber(value) }} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <div className='flex gap-3'>

                                <Input placeholder='Nhập địa chỉ email' />
                                <Button type='primary'>Gửi mã</Button>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="Mã xác nhận"
                            name="username"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >

                            <Input placeholder='Nhập mã xác nhận được gửi về email' />
                        </Form.Item>
                        <Form.Item
                            label="Nhập mật khẩu"
                            name="username"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder='Nhập mật khẩu' />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item className='flex items-center justify-center mt-3'>
                    <Button type="primary" htmlType="submit">
                        Gửi yêu cầu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


export default WithdrawComponent;