import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ItemQR from './ItemQR';
import axios from 'axios';

const DepositComponent = () => {
    const [imageQR, setImageQR] = useState<any>();

    useEffect(() => {
        const getImageQR = async () => {
            const response = await axios.get(`https://vietqr.co/api/generate/vcb/9343335657/VIETQR.CO/10.000/DUCHAIDEV?style=2&logo=1&isMask=0&bg=61`, {
                responseType: 'blob' // Sử dụng responseType là 'blob' để nhận dữ liệu ở dạng Blob
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImageQR(imageUrl);
        };
        getImageQR();
    }, []);

    console.log(imageQR);
    return (
        <div className='py-3 px-8'>
            <div className="flex flex-col gap-3 border-b border-blue1">
                <p className="flex items-center gap-3">
                    <svg
                        width="24"
                        height="23"
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.4041 1.422C13.3591 -0.474 10.6341 -0.474 9.58908 1.422L0.346075 18.17C-0.664925 20.003 0.660074 22.248 2.75407 22.248H21.2361C23.3291 22.248 24.6561 20.003 23.6441 18.17L14.4041 1.42V1.422ZM12.9961 17.25C12.9961 17.5152 12.8907 17.7696 12.7032 17.9571C12.5156 18.1446 12.2613 18.25 11.9961 18.25C11.7309 18.25 11.4765 18.1446 11.289 17.9571C11.1014 17.7696 10.9961 17.5152 10.9961 17.25C10.9961 16.9848 11.1014 16.7304 11.289 16.5429C11.4765 16.3554 11.7309 16.25 11.9961 16.25C12.2613 16.25 12.5156 16.3554 12.7032 16.5429C12.8907 16.7304 12.9961 16.9848 12.9961 17.25ZM11.2461 14V7.5C11.2461 7.30109 11.3251 7.11032 11.4657 6.96967C11.6064 6.82902 11.7972 6.75 11.9961 6.75C12.195 6.75 12.3858 6.82902 12.5264 6.96967C12.6671 7.11032 12.7461 7.30109 12.7461 7.5V14C12.7461 14.1989 12.6671 14.3897 12.5264 14.5303C12.3858 14.671 12.195 14.75 11.9961 14.75C11.7972 14.75 11.6064 14.671 11.4657 14.5303C11.3251 14.3897 11.2461 14.1989 11.2461 14Z"
                            fill="black"
                        />
                    </svg>
                    <span className="font-semibold text-[18px]">Lưu ý</span>
                </p>
                <span className="font-medium text-red-400">
                    * Bank auto cộng tiền liền hoặc sau vài phút(không quá 15p) chưa cộng
                    LH Zalo để được hỗ trợ!
                </span>
                <span className="font-medium text-red-400">
                    * Nạp sai nội dung sẽ bị trừ 10% tiền nạp.
                </span>
                <span className="font-medium text-primary">
                    *Ưu tiên nạp Ngân Hàng Auto cộng tiền nhanh.
                </span>
                <span className="font-medium">
                    - Cố tình nạp dưới mức nạp sẽ không hỗ trợ(Sẽ hỗ trợ cộng dồn cho lần
                    nạp tiếp theo).
                </span>
                <p className="font-medium">
                    <span>* Hướng dẫn nạp tiền: </span>
                    <NavLink to="/" className="text-primary">
                        Tại đây
                    </NavLink>
                </p>
            </div>
            {/*--------------------------------------Chuyển khoản--------------------------------------*/}
            <div className="grid grid-cols-2 gap-5 py-5">
                <ItemQR accountBank='0343335657' content='DucHaiDev' imageBank='/Logo_MB.png' accountNameBank='Le Duc Hai' nameBank='MB Bank' imageQR={imageQR}></ItemQR>
                <ItemQR accountBank='0343335657' content='DucHaiDev' imageBank='/Logo_MB.png' accountNameBank='Le Duc Hai' nameBank='MB Bank' imageQR={imageQR}></ItemQR>
            </div>
        </div>
    );
};

export default DepositComponent;