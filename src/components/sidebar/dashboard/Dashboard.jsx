import React, { useEffect, useState } from 'react'
import './dashboard.css' 
import {HiOutlineArrowNarrowUp, HiUser} from 'react-icons/hi'
import { Row, Col, ProgressBar } from 'react-bootstrap';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { axiosInstanse } from '../../utils/axiosInstanse';



const BorderLinearProgress = styled(LinearProgress)(({ theme,id }) => ({
    height: 3,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:id=="first"?['rgba(192, 50, 33, 0.2)']:(id=="second"?['rgba(6, 139, 146, 0.2)']:(id=="third"?['rgba(23, 144, 75, 0.2)']: (id=="fourth"?['rgba(52, 78, 209, 0.2)']:(id=="fifth"?['rgba(0, 98, 255, 0.2)']:['rgba(252, 90, 90, 0.2)'])))),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:id=="first"?['#C03221']:(id=="second"?['#068B92']:(id=="third"?['#17904B']:(id=="fourth"?['#344ED1']:(id=="fifth"?['#0062FF']:((['#FC5A5A'])))))),
    },
  }));


 

const Dashboard = () => {
    const[dashboardList,setDashboardList]=useState([]);
    const[page,setPage]=useState(1);
    const[userCount,setUserCount]=useState(0);
    const [ profilesCount, setProfilesCount ] = useState(0);
    const [ postsCount, setPostsCount ] = useState(0);
    const [ card_usersCount, setCard_usersCount ] = useState(0);
    const [ viewToday, setViewToday ] = useState();
    const [ viewYesterday, setViewYesterday ] = useState();
    const [ adsToday, setAdsToday ] = useState();
    const [ adsYesterday, setAdsYesterday ] = useState(0);
    const [ visitorsToday, setVisitorsToday ] = useState();
    const [ visitorsYesterday, setVisitorsYesterday ] = useState(0);
    const [ postToday, setPostToday ] = useState();
    const [ postYesterday, setPostYesterday ] = useState();
    const [ sliderToday, setSliderToday ] = useState();
    const [ sliderYesterday, setSliderYesterday ] = useState();
    const [ popToday, setPopToday ] = useState();
    const [ popYesterday, setPopYesterday ] = useState();
    const [ popSum, setPopSum ] = useState(0);
    const [ profileSum, setProfileSum ] = useState(0);
    const [ adsSum, setAdsSum ] = useState(0);
    const [ visitorsSum, setVisitorsSum ] = useState(0);
    const [ postSum, setPostSum ] = useState(0);
    const [ sliderSum, setSliderSum ] = useState(0);


    useEffect(()=>{
        let sum=0;
        if(popToday>popYesterday){
            sum=(popYesterday * 100)/popToday;
        } else {
            sum=(popToday * 100)/popYesterday;
        }
        setPopSum(100-sum);
    },[popToday]);

    useEffect(()=>{
        let sumV=0;
        if(viewToday>viewYesterday){
            sumV=(viewYesterday * 100)/viewToday;
        } else {
            sumV=(viewToday * 100)/viewYesterday;
        }
        setProfileSum(100-sumV);
    },[viewToday]);

    useEffect(()=>{
        let sumA=0;
        if(adsToday>adsYesterday){
            sumA=(adsYesterday * 100)/adsToday;
        } else {
            sumA=(adsToday * 100)/adsYesterday;
        }
        setAdsSum(100-sumA);
    },[adsToday]);

    useEffect(()=>{
        let sumVi=0;
        if(visitorsToday>visitorsYesterday){
            sumVi=(visitorsYesterday * 100)/visitorsToday;
        } else {
            sumVi=(visitorsToday * 100)/visitorsYesterday;
        }
        setVisitorsSum(100-sumVi);
    },[visitorsToday]);

    useEffect(()=>{
        let sumP=0;
        if(postToday>postYesterday){
            sumP=(postYesterday * 100)/postToday;
        } else {
            sumP=(postToday * 100)/postYesterday;
        }
        setPostSum(100-sumP);
    },[postToday]);
    
    useEffect(()=>{
        let sumS=0;
        if(sliderToday>sliderYesterday){
            sumS=(sliderYesterday * 100)/sliderToday;
        } else {
            sumS=(sliderToday * 100)/sliderYesterday;
        }
        setSliderSum(100-sumS);
    },[sliderToday]);

    


    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getDashboard(){
            await axiosInstanse.get('/dashboard',{headers})
            .then(response=>{
                setUserCount(response.data.body.users);
                setProfilesCount(response.data.body.profiles);
                setPostsCount(response.data.body.posts);
                setCard_usersCount(response.data.body.card_users);
                setViewToday(response.data.body.profile_view);
                setViewYesterday(response.data.body.profile_view_yesterday);
                setAdsToday(response.data.body.ads_view);
                setAdsYesterday(response.data.body.ads_view_yesterday);
                setVisitorsToday(response.data.body.app_visitors);
                setVisitorsYesterday(response.data.body.app_visitors_yesterday);
                setPostToday(response.data.body.post_view);
                setPostYesterday(response.data.body.post_view_yesterday);
                setSliderToday(response.data.body.slider_view);
                setSliderYesterday(response.data.body.slider_view_yesterday);
                setPopToday(response.data.body.popup_view);
                setPopYesterday(response.data.body.popup_view_yesterday);
            })
            .cath(error=>{

            });

        }
        getDashboard();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
   
    return (
        <div>
            <div className="content">
                <div className="dashboardImageDiv">
                    <img src="images/dashboardImg.svg" alt="" />
                </div>
               <Row>
                   <Col lg={3} md={6} xs={12} sm={12}>
                       <NavLink to='/analyticsPage' style={{textDecoration: 'none'}}>
                       <div className="dashboardContainer" >
                           <div className="dashboardTitle">
                               <p>Profile view</p>
                           </div>
                           <div className="countContainer">
                               <p className='bigCount'>{viewToday}</p>
                               <p className='smallCount'>{viewYesterday}</p>
                               {
                                   viewToday>=viewYesterday?
                                   <div className="upArrowContainer" style={{backgroundColor:'rgba(192, 50, 33, 0.2'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow'  />
                                    </div>
                               :
                               <div className="upArrowContainer" style={{backgroundColor:'rgba(192, 50, 33, 0.2',transform: 'rotate(-180deg)'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow'  />
                                    </div>
                               }
                           </div>
                           <div className="barContainer">
                                <BorderLinearProgress id='first' variant="determinate" value={profileSum} />
                           </div>
                       </div>
                       </NavLink>
                   </Col>
                   <Col lg={3} md={6} xs={12} sm={12}>
                       <div className="dashboardContainer">
                           <div className="dashboardTitle">
                               <p>Ads view</p>
                           </div>
                           <div className="countContainer">
                               <p className='bigCount'>{adsToday}</p>
                               <p className='smallCount'>{adsYesterday}</p>
                               {
                                   adsToday > adsYesterday?
                                   <div className="upArrowContainer" style={{backgroundColor:'rgba(6, 139, 146, 0.2)', color: '#068B92'}}>
                                    <HiOutlineArrowNarrowUp  id='upArrow' />
                               </div>
                               :
                               <div className="upArrowContainer" style={{backgroundColor:'rgba(6, 139, 146, 0.2)', transform: 'rotate(-180deg)', color: '#068B92'}}>
                                    <HiOutlineArrowNarrowUp  id='upArrow' />
                               </div>
                               }
                               
                           </div>
                           <div className="barContainer">
                                <BorderLinearProgress id='second' variant="determinate" value={adsSum} />
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} xs={12} sm={12}>
                       <div className="dashboardContainer">
                           <div className="dashboardTitle">
                               <p>App visitors</p>
                           </div>
                           <div className="countContainer">
                               <p className='bigCount'>{visitorsToday}</p>
                               <p className='smallCount'>{visitorsYesterday}</p>
                               {
                                   visitorsToday > visitorsYesterday?
                                   <div className="upArrowContainer" style={{backgroundColor:'rgba(23, 144, 75, 0.2)', color: '#17904B'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow' />
                                    </div>
                                    :
                                    <div className="upArrowContainer" style={{backgroundColor:'rgba(23, 144, 75, 0.2)', transform: 'rotate(-180deg)', color: '#17904B'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow' />
                                    </div>
                               }
                              
                           </div>
                           <div className="barContainer">
                                <BorderLinearProgress id='third' variant="determinate" value={visitorsSum} />
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} xs={12} sm={12}>
                       <div className="dashboardContainer">
                           <div className="dashboardTitle">
                               <p>Post view</p>
                           </div>
                           <div className="countContainer">
                               <p className='bigCount'>{postToday}</p>
                               <p className='smallCount'>{postYesterday}</p>
                               {
                                   postToday > postYesterday?
                                   <div className="upArrowContainer" style={{backgroundColor:'rgba(52, 78, 209, 0.2)', color:'#344ED1'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow' />
                                    </div>
                                    :
                                    <div className="upArrowContainer" style={{backgroundColor:'rgba(52, 78, 209, 0.2)', transform: 'rotate(-180deg)', color:'#344ED1'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow' />
                                    </div>
                               }
                               
                           </div>
                           <div className="barContainer">
                                <BorderLinearProgress id='fourth' variant="determinate" value={postSum} />
                           </div>
                       </div>
                   </Col>
                   
               </Row>

               <Row>
               <Col lg={3} md={6} xs={12} sm={12}>
                       <div className="dashboardContainer" id='secondCol'>
                           <div className="dashboardTitle">
                               <p>Slider view</p>
                           </div>
                           <div className="countContainer">
                               <p className='bigCount'>{sliderToday}</p>
                               <p className='smallCount'>{sliderYesterday}</p>
                               {
                                   sliderToday > sliderYesterday?

                                   <div className="upArrowContainer" style={{backgroundColor:'rgba(0, 98, 255, 0.2)', color: '#0062FF'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow'  />
                                    </div>
                                    :
                                    <div className="upArrowContainer" style={{backgroundColor:'rgba(0, 98, 255, 0.2)', transform: 'rotate(-180deg)', color: '#0062FF'}}>
                                        <HiOutlineArrowNarrowUp id='upArrow'  />
                                    </div>
                               }
                               
                           </div>
                           <div className="barContainer">
                                <BorderLinearProgress id='fifth' variant="determinate" value={sliderSum} />
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} xs={12} sm={12}>
                       <div className="dashboardContainer" id='secondCol'>
                           <div className="dashboardTitle">
                               <p>Pop-up view</p>
                           </div>
                           <div className="countContainer">
                               <p className='bigCount'>{popToday}</p>
                               <p className='smallCount'>{popYesterday}</p>
                               {
                                   popToday>=popYesterday?
                                   <div className="upArrowContainer"  style={{backgroundColor:'rgba(252, 90, 90, 0.2)', color: '#FC5A5A '}}>
                                    <HiOutlineArrowNarrowUp id='upArrow' />
                               </div>
                               :
                               <div className="upArrowContainer"  style={{backgroundColor:'rgba(252, 90, 90, 0.2)',transform: 'rotate(-180deg)', color: '#FC5A5A '}}>
                                    <HiOutlineArrowNarrowUp id='upArrow' />
                               </div>
                               }
                           </div>
                           <div className="barContainer">
                              
                                <BorderLinearProgress  variant="determinate" value={popSum} />
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} xs={12} sm={12}></Col>
                   <Col lg={3} md={6} xs={12} sm={12}></Col>
               </Row>

               {/* Count Information is starting here */}

               <div className="informationTitle">
                   <p>Count information</p>
               </div>
               <Row>
                   <Col lg={3} md={6} sm={12} xs={12}>
                       <div className="informationContainer" style={{background: ' rgba(6, 139, 146, 0.2)', borderRadius:'8px'}}>
                           <div className="ImageContainer" style={{marginLeft: '7%'}}>
                            <img src="images/Users.svg" style={{width: '40px'}} alt="" />  
                           </div>
                           <div className="countWithName">
                               <span>{userCount}</span>
                               <p style={{color: '#068B92', marginLeft: '17px'}}>Users</p>
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} sm={12} xs={12}>
                       <div className="informationContainer" style={{background: ' rgba(217, 95, 24, 0.2)', borderRadius:'8px'}}>
                           <div className="ImageContainer" style={{marginLeft: '7%'}}>
                            <img src="images/Profiles.svg" style={{width: '32px'}} alt="" />  
                           </div>
                           <div className="countWithName">
                               <span>{profilesCount}</span>
                               <p style={{color: '#D95F18', marginLeft: '8px'}}>Profiles</p>
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} sm={12} xs={12}>
                       <div className="informationContainer" style={{background: ' rgba(173, 45, 30, 0.2)', borderRadius:'8px'}}>
                           <div className="ImageContainer" style={{marginLeft: '7%'}}>
                            <img src="images/TmMuseCard.svg" style={{width: '32px'}} alt="" />  
                           </div>
                           <div className="countWithName">
                               <span>{postsCount}</span>
                               <p style={{color: '##AD2D1E', marginLeft: '19px'}}>Posts</p>
                           </div>
                       </div>
                   </Col>
                   <Col lg={3} md={6} sm={12} xs={12}>
                       <div className="informationContainer" style={{background: ' rgba(52, 78, 209, 0.2)', borderRadius:'8px'}}>
                           <div className="ImageContainer" style={{marginLeft: '7%'}}>
                            <img src="images/Post.svg" style={{width: '32px'}} alt="" />  
                           </div>
                           <div className="countWithName">
                               <span style={{paddingLeft: '30px'}}>{card_usersCount}</span>
                               <p style={{color: '#344ED1'}}>TmMuse cards</p>
                           </div>
                       </div>
                   </Col>
               </Row>
            </div>
        </div>
    )
}

export default Dashboard
