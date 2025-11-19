import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='max-h-screen min-h-screen flex items-center justify-center'>
            <div className='p-3 border rounded-lg shadow-lg border-[#fcfcfc]'>
            <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;