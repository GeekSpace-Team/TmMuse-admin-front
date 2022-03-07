import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,Navigate
} from "react-router-dom";
import Login from './components/loginPage/LoginPage';
import SidebarDesign from './components/sidebar/Sidebar/SidebarDesign';
import Dashboard from './components/sidebar/dashboard/Dashboard';
import AnalyticsPage from './components/sidebar/dashboard/analyticsPage/AnalyticsPage';
import Profile from './components/sidebar/profile/Profile';
import Banner from './components/sidebar/banner/Banner';
import Category from './components/sidebar/category/Category';
import Ads from './components/sidebar/ads/Ads';
import Inbox from './components/sidebar/inbox/Inbox';
import Post from './components/sidebar/post/Post';
import Sertificate from './components/sidebar/sertificate/Sertificate';
import PromoCode from './components/sidebar/promoCode/PromoCode';
import Users from './components/sidebar/users/Users';
import Push from './components/sidebar/push/Push';
import Pop from './components/sidebar/pop/Pop';
import Constants from './components/sidebar/constants/Constants';
import Interests from './components/sidebar/interests/Interests';
import TmMuseCard from './components/sidebar/tmMuseCard/TmMuseCard';
import { isLogin } from "./utils/isLogin";
import history from "./utils/history";
ReactDOM.render(
  <BrowserRouter history={history}>
  <Routes>
    <Route exact path="/login" element={<Login/>}/>
    <Route path='/' element={isLogin()?<SidebarDesign/>:<Navigate to="/login" replace />}>
      <Route index element={<Dashboard/>}/>
      <Route path="analyticsPage" element={<AnalyticsPage/>}/>
      <Route path="profile" element={isLogin()?<Profile/>:<Navigate to="/login" replace />} />
      <Route path="banner" element={<Banner/>} />
      <Route path="category" element={isLogin()?<Category/>:<Navigate to="/login" replace />} />
      <Route path="ads" element={<Ads/>} />
      <Route path="inbox" element={<Inbox/>} />
      <Route path="post" element={<Post/>} />
      <Route path="sertificate" element={<Sertificate/>} />
      <Route path="promoCode" element={<PromoCode/>} />
      <Route path="users" element={<Users/>} />
      <Route path="push" element={<Push/>} />
      <Route path="pop" element={<Pop/>  } />
      <Route path="constants" element={<Constants/>} />
      <Route path="interests" element={<Interests/>} />
      <Route path="tmMuseCard" element={<TmMuseCard/>} />
    </Route>
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
