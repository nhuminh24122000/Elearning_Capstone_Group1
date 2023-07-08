import { Skeleton } from 'antd'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Admin/Header/Header'
import Footer from '../../components/Admin/Footer/Footer'

function HomeAdminTemplate() {
    return (
        <>
            <Header />
            <div>
                <Suspense fallback={<Skeleton />}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </>
    )
}

export default HomeAdminTemplate