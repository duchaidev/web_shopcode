import { Spin } from 'antd';
import React, { FC } from 'react';

const ItemQR: FC<{
    imageQR: string,
    imageBank: string,
    accountNameBank: string,
    accountBank: string,
    nameBank: string,
    content: string
}> = ({
    imageQR,
    content,
    nameBank,
    accountBank,
    accountNameBank,
    imageBank
}) => {
        return (
            <div className="border border-blue1">
                <div className="grid grid-cols-7 border-b border-blue1">
                    <span className="col-span-3 p-4 font-medium text-center border-r border-blue1">
                        Chuyển khoản bằng mã QR
                    </span>
                    <span className="col-span-4 p-4 font-medium text-center">
                        Chuyển khoản thủ công
                    </span>
                </div>
                <div className="grid grid-cols-7">
                    {/*--------------------------------------Chuyển khoản QR--------------------------------------*/}
                    <div className="flex flex-col items-center justify-center col-span-3 gap-4 p-2 border-r border-blue1">
                        <span className="text-[14px] text-gray2 text-center leading-4">
                            Mở App Ngân Hàng quét mã QRCode và nhập số tiền cần chuyển
                        </span>
                        <div className="w-[80%] aspect-square">
                            <img
                                src={imageQR}
                                alt="imageQR"
                                className="object-cover w-full h-full aspect-square"
                            />
                        </div>
                    </div>
                    {/*--------------------------------------Chuyển khoản thủ công--------------------------------------*/}
                    <div className="flex flex-col items-center col-span-4 gap-2">
                        <div>
                            <img src={imageBank} alt="" className="py-2" />
                        </div>
                        <div className="w-full ">
                            <div className="grid w-full grid-cols-7 px-2 py-3 border-b border-blue1">
                                <span className="col-span-3 font-medium">
                                    Chủ Tài khoản:
                                </span>
                                <span className="col-span-4">{accountNameBank}</span>
                            </div>
                            <div className="grid w-full grid-cols-7 px-2 py-3 border-b border-blue1">
                                <span className="col-span-3 font-medium">Số tài khoản:</span>
                                <span className="relative col-span-4 max-w-max">
                                    <span>{accountBank}</span>
                                    <button className="absolute p-1 cursor-pointer -right-5 -top-2">
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className=""
                                        >
                                            <path
                                                d="M9.58333 0H2.91667C2.80616 0 2.70018 0.0438988 2.62204 0.122039C2.5439 0.200179 2.5 0.30616 2.5 0.416667V2.5H0.416667C0.30616 2.5 0.200179 2.5439 0.122039 2.62204C0.0438988 2.70018 0 2.80616 0 2.91667V9.58333C0 9.69384 0.0438988 9.79982 0.122039 9.87796C0.200179 9.9561 0.30616 10 0.416667 10H7.08333C7.19384 10 7.29982 9.9561 7.37796 9.87796C7.4561 9.79982 7.5 9.69384 7.5 9.58333V7.5H9.58333C9.69384 7.5 9.79982 7.4561 9.87796 7.37796C9.9561 7.29982 10 7.19384 10 7.08333V0.416667C10 0.30616 9.9561 0.200179 9.87796 0.122039C9.79982 0.0438988 9.69384 0 9.58333 0ZM6.66667 9.16667H0.833333V3.33333H6.66667V9.16667ZM9.16667 6.66667H7.5V2.91667C7.5 2.80616 7.4561 2.70018 7.37796 2.62204C7.29982 2.5439 7.19384 2.5 7.08333 2.5H3.33333V0.833333H9.16667V6.66667Z"
                                                fill="#9C9C9C"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <div className="grid w-full grid-cols-7 px-2 py-3 border-b border-blue1">
                                <span className="col-span-3 font-medium ">Ngân hàng/Ví:</span>
                                <span className="col-span-4">{nameBank}</span>
                            </div>
                            {/* <div className="grid w-full grid-cols-7 px-2 py-3 border-b border-blue1">
                            <span className="col-span-3 font-medium ">
                                Nạp tối thiểu:
                            </span>
                            <span className="col-span-4">5,000 VNĐ</span>
                        </div> */}
                            <div className="grid w-full grid-cols-7 px-2 py-3 border-b border-blue1">
                                <span className="col-span-3 font-medium ">Nội dung:</span>
                                <span className="relative col-span-4 max-w-max">
                                    <span>{content}</span>
                                    <button className="absolute p-1 cursor-pointer -right-5 -top-2">
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className=""
                                        >
                                            <path
                                                d="M9.58333 0H2.91667C2.80616 0 2.70018 0.0438988 2.62204 0.122039C2.5439 0.200179 2.5 0.30616 2.5 0.416667V2.5H0.416667C0.30616 2.5 0.200179 2.5439 0.122039 2.62204C0.0438988 2.70018 0 2.80616 0 2.91667V9.58333C0 9.69384 0.0438988 9.79982 0.122039 9.87796C0.200179 9.9561 0.30616 10 0.416667 10H7.08333C7.19384 10 7.29982 9.9561 7.37796 9.87796C7.4561 9.79982 7.5 9.69384 7.5 9.58333V7.5H9.58333C9.69384 7.5 9.79982 7.4561 9.87796 7.37796C9.9561 7.29982 10 7.19384 10 7.08333V0.416667C10 0.30616 9.9561 0.200179 9.87796 0.122039C9.79982 0.0438988 9.69384 0 9.58333 0ZM6.66667 9.16667H0.833333V3.33333H6.66667V9.16667ZM9.16667 6.66667H7.5V2.91667C7.5 2.80616 7.4561 2.70018 7.37796 2.62204C7.29982 2.5439 7.19384 2.5 7.08333 2.5H3.33333V0.833333H9.16667V6.66667Z"
                                                fill="#9C9C9C"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <div className="py-4 text-center text-[13px] italic">
                                <p className='flex items-center gap-3 justify-center'> <Spin size="small" />Xử lí giao dịch tự động trong vài giây</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default ItemQR;