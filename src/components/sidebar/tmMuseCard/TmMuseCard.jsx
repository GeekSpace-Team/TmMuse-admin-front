import React,{useState} from 'react'
import TmMuseTable from './tmTable/TmMuseTable'
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';
import './tmMuseCard.css'
import AddTmCard from './addTmCard/AddTmCard';


const TmMuseCard = () => {
  const[isUpdate,setUpdate]=useState(false);
  const handleAddButton=()=>{
    setUpdate(!isUpdate);
  }
  return (
    <div className='content'>
        <Row style={{paddingTop: '30px'}}>
            <Col lg={3} md={6} xs={6} sm={6}>
                <p style={{marginLeft : '20px'}} className='titleNames'>TmMuse cards</p>
            </Col>
            <Col lg={6} md={1} xs={1} sm={1}></Col>
            <Col lg={3} md={5} xs={5} sm={5}>
                <AddTmCard funcAdd={handleAddButton}/>
            </Col>
        </Row>
        {
          isUpdate?<TmMuseTable/>:<TmMuseTable/>
        }
      
    </div>
  )
}

export default TmMuseCard
