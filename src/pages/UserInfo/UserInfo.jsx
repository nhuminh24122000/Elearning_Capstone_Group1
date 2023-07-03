import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyCourse from '../../components/MyCourse/MyCourse';
import MyInfo from '../../components/MyInfo/MyInfo';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN } from '../../constant';
import { setUserProfile } from '../../redux/reducers/userReducer';
import { getLocal, saveLocal } from '../../utils';
import SignIn from '../SignIn/SignIn';
import './UserInfo.scss';





function UserInfo() {
    const dispatch = useDispatch();

    const handleProfile = async () => {
        try {
            const resp = await axios({
                method: 'post',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung',
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            dispatch(setUserProfile(resp.data))
            saveLocal('userProfile', resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleProfile();
    }, [])

    return (
        <>
            {getLocal(ACCESS_TOKEN) ? (
                <>
                    <div className="profile_title ">
                        <h1>Trang Cá Nhân</h1>
                    </div>

                    <Tabs className='container'>
                        <TabList >
                            <Tab>THÔNG TIN CÁ NHÂN</Tab>
                            <Tab>KHÓA HỌC CỦA TÔI</Tab>
                        </TabList>

                        <TabPanel>
                            <MyInfo />
                        </TabPanel>

                        <TabPanel className='container' >
                            <MyCourse handleProfile={handleProfile} />
                        </TabPanel>
                    </Tabs>
                </>

            ) : <SignIn />}
        </>
    )

}

export default UserInfo