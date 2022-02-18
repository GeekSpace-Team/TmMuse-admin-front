import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './InboxPage.css'
import Stack from '@mui/material/Stack';
import AddInbox from '../addInbox/AddInbox';
import ReplyModal from '../replyModal/ReplyModal';
import { axiosInstanse } from '../../../utils/axiosInstanse';


const InboxPage = () => {
  const [inboxList, setInboxList] = useState([]);
  const [answeredMessage, setAnsweredMessage] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [inboxTitle, setInboxTitle] = useState([""]);
  const [inboxMessage, setInboxMessage] = useState([""]);
  const [inboxId, setInboxId] = useState([0]);

  const handleInboxClick = (id, title, message) => {
    setInboxTitle(title);
    setInboxMessage(message);
    setInboxId(id);
  }

  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    async function getInbox() {
      await axiosInstanse.get('/get-inbox?page=' + page, { headers })
        .then(response => {
          setInboxList(response.data.body);
        })
        .cath(error => {

        });

    }
    getInbox();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return <div className='bg'>
    <div className='bg-2'>







      <Row>


        <Col lg={5} md={5} sm={5} xs={5} className='InboxContainer'>
          <Col lg={12}>
            <div className="searchContainer">
              <input type="search" placeholder='Search...' />
            </div>
           
          </Col>
          <Col lg={12}>
              <AddInbox />
          </Col>
          {inboxList.map((element, i) => {
            return (
              
                <Col lg={12}>
                  <div className="inboxContainer" onClick={() => handleInboxClick(element.id, element.title, element.message)}>
                    <div className="imgContainer">
                      <h2>{"TmMuse Team".substring(0, 2)}</h2>

                    </div>
                    <div className="inboxTitleContainer">
                      <p>{"TmMuse Team"}</p>
                      <h3>{element.title}</h3>
                      <span>{element.message.substring(0, 30)}{element.message.length > 30 ? <span>...</span> : null}</span>
                    </div>
                    <div className="dateInfo">
                      <span>25.01.2022 15:00</span>
                    </div>
                  </div>
                </Col>
             

            )
          })
          }

          
        </Col>

        <Col lg={7} md={7} sm={7} xs={7}>
          <div className="messageArea">
            <div className="dateWithTitle">
              <p>25.01.2022 15:00</p>
              <h2>{inboxTitle}</h2>
            </div>
            <Col lg={12} md={8} sm={12} xs={12}>
              <p style={{ marginLeft: '20px', collor: '#ADB5BD', fontSize: '15px' }}>{inboxMessage}</p>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: '#31456A', fontSize: '19px', marginTop: '90px', marginLeft: '20px' }}>From: Shageldi Alyyev</h1>
              <p style={{ color: '#31456A', marginLeft: '20px', fontSize: '13px' }}>Phone number: +99362727322</p>
            </Col>
            <div className="sentButtonInbox">
              <ReplyModal inboxid={inboxId}/>
            </div>
          </div>

        </Col>

      </Row>


    </div>







  </div>;
};

export default InboxPage;
