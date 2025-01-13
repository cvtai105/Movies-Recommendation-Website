import React from 'react';
import Header from '../components/Header';

import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
