import React from 'react'
import './Sidebar.css'
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import Navbar from '../../navbar/Navbar';
import Index from '../index/Index';
import { Col, Row, Stack } from 'react-bootstrap';
import { FiGrid,FiChevronRight,FiImage,FiTrendingUp,FiPlayCircle,FiBriefcase,FiMail,FiUsers, FiUser } from "react-icons/fi";
import { SiGoogleads } from "react-icons/si" 
import { MdPostAdd, MdStyle} from "react-icons/md"
import { GrCertificate,GrGamepad} from "react-icons/gr"
import { ImPaste,ImNotification } from "react-icons/im"
import {HiOutlineCreditCard, HiOutlineHashtag} from "react-icons/hi"
import { TiTags,TiTabsOutline } from "react-icons/ti";
import { IoLogoJavascript, IoMdNotificationsOutline,IoPricetagOutline} from "react-icons/io"
import { BsController } from 'react-icons/bs'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {CookiesProvider} from 'react-cookie';
import { Outlet, Link } from "react-router-dom";
 


const SidebarDesign = () => {
    const location = useLocation();
    const GetCurrentRoute = () => {
        return location.pathname;
    }
    const activeItem='activeItem';
    const passiveItem='passiveItem';
    const [userToken,setCookie] =useCookies(['userToken','userType']);
    let history=useNavigate();

    // if(userToken.userToken==null){
    //     document.location.href='/login';
    // }
    return (
       <CookiesProvider className="app">
           
            <Sidebar
                className='sideBarContainer'
                breakPoint="768"
                background="#FFFFFF"
                toggleIconColor="#7C057B"
                content={[

                    
                        <SidebarItem
                            hoverHighlight="#FFFFFF"
                            activeHightlight="#FFFFFF"
                            >
                            
                            <Stack direction='horizontal' className='toolbar' gap={2}>
                                <img src='images/logo.svg'/>
                                <Stack className='toolbarTitle'>
                                    <p>TmMuse</p>
                                    <p>Admin panel</p>
                                </Stack>
                            </Stack>
                            <div className='line'></div>
                            <NavLink to="/" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={(GetCurrentRoute()=='/' || GetCurrentRoute()=='/analyticsPage')?activeItem:passiveItem} gap={3}>
                                    <FiTrendingUp/><label>Dashboard</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/profile" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/profile'?activeItem:passiveItem} gap={3}>
                                    <FiImage/><label>Profile</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/category" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/category'?activeItem:passiveItem} gap={3}>
                                    <FiGrid/><label>Category</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>


                            <NavLink to="/banner" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/banner'?activeItem:passiveItem} gap={3}>
                                    <FiBriefcase/><label>Banner</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/ads" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/ads'?activeItem:passiveItem} gap={3}>
                                    <SiGoogleads/><label>Ads</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/inbox" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/inbox'?activeItem:passiveItem} gap={3}>
                                    <FiMail/><label>Inbox</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/post" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/post'?activeItem:passiveItem} gap={3}>
                                    <ImPaste/><label>Post</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/sertificate" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/sertificate'?activeItem:passiveItem} gap={3}>
                                    <AiOutlineSafetyCertificate/><label>Certificate</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/promoCode" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/promoCode'?activeItem:passiveItem} gap={3}>
                                    <TiTags/><label>Promo Code</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/users" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/users'?activeItem:passiveItem} gap={3}>
                                    <FiUsers/><label>Users</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/push" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/push'?activeItem:passiveItem} gap={3}>
                                    <IoMdNotificationsOutline/><label>Push</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/pop" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/pop'?activeItem:passiveItem} gap={3}>
                                    <TiTabsOutline/><label>Pop-up</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/constants" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/constants'?activeItem:passiveItem} gap={3}>
                                    <ImNotification/><label>Constants</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>

                            <NavLink to="/interests" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/interests'?activeItem:passiveItem} gap={3}>
                                    <BsController/><label>Interests</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>
                            <NavLink to="/tmMuseCard" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/tmMuseCard'?activeItem:passiveItem} gap={3}>
                                    <HiOutlineCreditCard/><label>TmMuse Card</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>
                            <NavLink to="/cinema" style={{ textDecoration: 'none' }} >
                                <Stack direction='horizontal' className={GetCurrentRoute()=='/cinema'?activeItem:passiveItem} gap={3}>
                                    <HiOutlineCreditCard/><label>Cinema</label><FiChevronRight className='ms-auto'/>
                                </Stack>
                            </NavLink>
                          

                          

                        </SidebarItem>

                        
                        

            
            ]}
            >
                <Navbar/>
                <Outlet />
            </Sidebar>
            </CookiesProvider>
       
    )
}

export default SidebarDesign
