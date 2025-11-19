import { Button, message } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
    const navigate = useNavigate();
    const handleCopyToClipboard = (textToCopy: any) => {
        // Sử dụng API clipboard để sao chép nội dung vào clipboard
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                message.success(`Đã sao chép vào clipboard`);
            })
            .catch((error) => {
                message.error(`Lỗi khi sao chép vào clipboard`);
            });
    };
    return (
        <div className="flex flex-col py-6 px-8">
            <div className="flex w-[50%]">
                <div className="flex flex-col gap-2 w-[45%]">
                    <p className="uppercase text-[15px] text-black">
                        Thành viên đăng kí mới
                    </p>
                    <span className="text-[18px] font-medium">0 thành viên</span>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="uppercase text-[15px] text-black">
                        Hoa hồng đã nhận
                    </p>
                    <span className="text-[18px] font-medium">0</span>
                </div>
            </div>
            <div className="flex">
                <div className="w-[50%] flex flex-col gap-5">
                    <span className="mt-7 text-[15px] font-bold text-black">
                        THÔNG TIN CHI TIẾT
                    </span>
                    <div className="flex items-center mt-4">
                        <label htmlFor="" className="w-[45%] font-medium">
                            Email:{" "}
                        </label>
                        <span>leduchai2k3@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="" className="w-[45%] font-medium">
                            Mức hoa hồng:{" "}
                        </label>
                        <span>10% - 20%</span>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="" className="w-[45%] font-medium">
                            Số dư hoa hồng khả dụng:{" "}
                        </label>
                        <span>0</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                        <label htmlFor="" className="">
                            Mã giới thiệu của bạn:{" "}
                        </label>
                        <div className="flex items-center gap-3 w-[60%]">

                            <Search
                                readOnly
                                value={"admin"}
                                enterButton="COPY"
                                onSearch={(value) => {
                                    handleCopyToClipboard(value);
                                }}
                                size="middle"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="">
                            Link giới thiệu của bạn:{" "}
                        </label>
                        <div className="flex items-center gap-3 w-[60%]">
                            <Search
                                readOnly
                                value={"http://localhost:5173/profile/affiliate/1"}
                                enterButton="COPY"
                                onSearch={(value) => {
                                    handleCopyToClipboard(value);
                                }}
                                size="middle"
                            />
                        </div>
                        <span className="text-xs text-red-500">
                            Bạn chỉ cần copy link hoặc mã giới thiệu để đi giới thiệu!
                        </span>
                    </div>

                </div>
                <div className="w-[50%] flex flex-col gap-6">
                    <span className="mt-7 text-[15px] font-bold text-black">
                        LƯU Ý
                    </span>
                    <p className="p-5 bg-[#b2efe4] rounded-lg text-black text-[14px] leading-6">
                        GIỚI THIỆU NGƯỜI DÙNG ĐĂNG KÝ TÀI KHOẢN, VÀ MUA HÀNG BẠN SẼ NHẬN
                        ĐƯỢC 20% TIỀN HOA HỒNG VỚI ĐƠN HÀNG ĐẦU VÀ 10% TỪ GIAO DỊCH TIẾP
                        THEO CỦA KHÁCH HÀNG ĐÓ, NẾU TIỀN HOA HỒNG TỔNG CỘNG ĐƯỢC
                        50.000VNĐ BẠN SẼ ĐƯỢC RÚT SỐ TIỀN ĐÓ RA HOẶC SẢN PHẨM ĐỂ SỰ DỤNG
                        TÙY VÀO NHU CẦU CỦA BẠN!
                    </p>

                    <p className="p-5 bg-[#b2efe4] text-black rounded-lg text-[14px] leading-6 flex flex-col">
                        <span className="text-red-400 font-semibold">Mẹo nhỏ</span>
                        BẠN CÓ THỂ KIẾM NHIỀU % HOA HỒNG HƠN NẾU BẠN GIỚI THIỆU NHIỀU
                        NGƯỜI DÙNG
                        <span
                            className="underline cursor-pointer text-blue-500"
                            onClick={() => {
                                navigate(`/profile/affiliate/4`);
                            }}
                        >
                            Chi tiết các mốc
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Overview;