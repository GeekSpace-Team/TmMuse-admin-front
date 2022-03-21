import React,{useState} from 'react'
import TmMuseTable from './tmTable/TmMuseTable'
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';
import './tmMuseCard.css'
import AddTmCard from './addTmCard/AddTmCard';
import { axiosInstanse } from '../../utils/axiosInstanse';
import { CSVLink } from 'react-csv';


const TmMuseCard = () => {
  const [cardList, setCardList] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  async function getCard(page) {
     axiosInstanse.get('/get-card?page=' + page, { headers })
      .then(response => {
        setCardList(response.data.body.cards);
        setPageCount(response.data.body.page_count);
      })
      .catch(error => {

      });
    }
  return (
    <div className='content'>
        <Row style={{paddingTop: '30px'}}>
            <Col lg={3} md={6} xs={6} sm={6}>
                <p style={{marginLeft : '20px'}} className='titleNames'>TmMuse cards</p>
            </Col>
            <Col lg={6} md={1} xs={1} sm={1}></Col>
            <Col lg={3} md={5} xs={5} sm={5}>
                <AddTmCard getCard={getCard} cardList={[cardList, setCardList]} />
            </Col>
        </Row>
        <div className="withLine">
      <div className="saveContainer">
        <img src="images/save.svg" alt="" />
        <CSVLink 
        data={cardList}
        filename={"TmMuse"+new Date()+".csv"}
        >Save to excel</CSVLink>
      </div>
      <div className="lineImg">
        <img src="images/line.svg" alt="" />
      </div>
    </div>
        <TmMuseTable getCard={getCard} cardList={[cardList, setCardList]} pageCount={[pageCount, setPageCount]} />
        
      
    </div>
  )
}

export default TmMuseCard;
