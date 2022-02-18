import React, { useEffect, useState } from 'react';
import './AnalyticsPage.css'
import { Table } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { axiosInstanse } from '../../../utils/axiosInstanse';

const AnalyticsPage = () => {
  const[analyticList,setAnalyticList]=useState([]);
  const [profile_id, setPofile_id] = useState(null);
  const [allProfileList, setAllProfile] = useState([]);
  const [ type, setType ] = useState(null);
  const [ start_date, setStart_date ] = useState(null);
  const [ end_date, setEnd_date ] = useState(null);

 

  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    axiosInstanse.get("/get-name-profile", { headers })
      .then(response => {
        setAllProfile(response.data.body);
      })
  },[])
  useEffect(()=>{
      
      getAnalytic();
  },[]);

  useEffect(()=>{
    getAnalytic();
  },[type]);

  useEffect(()=>{
    getAnalytic();
  },[start_date]);

  useEffect(()=>{
    getAnalytic();
  },[end_date]);


  const headers = { 
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  async function getAnalytic(){
    let tempType=null;
    if(type!="0"){
      tempType=type;
    }
    let analytic = {
      profile_id: profile_id,
      type: tempType,
      start_date: start_date,
      end_date: end_date,
    };
  
    await axiosInstanse.post('/analytics?',analytic,{headers})
    .then(response=>{
      setAnalyticList(response.data.body);
    })
    .cath(error=>{

    });

  }

  

  return <div className='content'>
    <div className="titleNameWithArrow">
      <NavLink to="/dashboard" style={{ textDecoration: 'none', marginTop: '30px' }} >
        <img src="images/leftArrow.svg" alt="" style={{ width: '30px' }} />
      </NavLink>
      <p>Analytics Page</p>
    </div>
    <div className="withLine">
      <div className="saveContainer">
        <img src="images/save.svg" alt="" />
        <p>Save to Excell</p>
      </div>
      <div className="lineImg">
        <img src="images/line.svg" alt="" />
      </div>
    </div>
    <Row style={{ marginLeft: '1%' }}>

      <Col lg={3} md={6} sm={12} xs={12} className='analyticSelect'>
        <select name="" id="" onChange={e=>setType(e.target.value)}>
          <option value="0">Select type</option>
          <option value="profile">Profile</option>
          <option value="post">Post</option>
          <option value="ads">Ads</option>
          <option value="banner">Banner</option>
          <option value="popup">Pop-up</option>
        </select>
      </Col>
      <Col lg={3} md={6} sm={12} xs={12} >
        <input type="date" value={start_date} onInput={e => setStart_date(e.target.value)} />
      </Col>
      <Col lg={3} md={6} sm={12} xs={12} >
        <input type="date" value={end_date} onInput={e => setEnd_date(e.target.value)} />
      </Col>
      <Col lg={3} md={6} sm={12} xs={12} className='analyticSelect'>
        <select style={{ height: '30px' }} name="" id="" onChange={e => setPofile_id(e.target.value)}>
          <option value="0">Select...</option>
          {
            allProfileList.map((element, i) => {
              return (<option value={element.id}>{element.nameTM}</option>)
            })
          }
        </select>
      </Col>

    </Row>
    <Table responsive borderless className='profileTable'>
      <tr>
        <th><center>ID</center></th>
        <th><center>Profile name</center></th>
        <th><center>Type</center></th>
        <th><center>View count</center></th>
        <th><center>Click count</center></th>
        <th><center>Like</center></th>
        <th><center>Dislike</center></th>
      </tr>
      {  analyticList.map((element,i)=>{
                    return(
      <tr>
        <td><center>{element.id}</center></td>
        <td><center>{element.nameTM}</center></td>
        <td><center>{element.type}</center></td>
        <td><center>{element.view_count}</center></td>
        <td><center>{element.click_count}</center></td>
        <td><center>{element.like}</center></td>
        <td><center>{element.dislike}</center></td>
      </tr>
       )
      })
}
  
    </Table>
  </div>;
};

export default AnalyticsPage;
