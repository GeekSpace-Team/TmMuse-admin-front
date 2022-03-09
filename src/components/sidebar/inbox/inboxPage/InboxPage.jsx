import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './InboxPage.css'
import Stack from '@mui/material/Stack';
import AddInbox from '../addInbox/AddInbox';
import ReplyModal from '../replyModal/ReplyModal';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import Empty from '../../../empty/Empty';
import Loading from '../../../loading/Loading';
import { Modal } from '@mui/material';


const InboxPage = () => {
  const [inboxList, setInboxList] = useState([]);
  const [answeredMessage, setAnsweredMessage] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [inboxTitle, setInboxTitle] = useState([""]);
  const [inboxMessage, setInboxMessage] = useState([""]);
  const [inboxId, setInboxId] = useState([0]);
  const [username,setUsername]=useState('');
  const [ phone_number, setPhone_number ] = useState('');   

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ title, setTitle ] = useState('');
  const [ message, setMessage ] = useState('');

  const handleInboxClick = (element) => {
    setInboxTitle(element.title);
    setUsername(element.fullname);
    setInboxMessage(element.message);
    setPhone_number(element.phone_number);
    if(element.phone_number){
      setPhone_number(element.phone_number);
    } else {
      setPhone_number('+993 6* ** ** **');
    }
    setInboxId(element.id);
    if(element.fullname){
      setUsername(element.fullname);
    } else {
      setUsername("TmMuse team");
    }
  }

  useEffect(() => {

    getInbox();
  }, [page]);

  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  async function getInbox() {
    axiosInstanse.get('/get-inbox?page=' + 1, { headers })
      .then(res => {
        setInboxList(res.data.body);
        console.log("Data Response:", res.data.body)
      }).catch((err) => {
        console.log(err);
      })


  }

  const handleChange = (event, value) => {
    setPage(value);
  };
  return <div className='bg'>
    <div className='bg-2'>
      <Row>
        <Col lg={5} md={5} sm={5} xs={5} className='InboxContainer'>
          <Col lg={12}>
            <div className="searchContainer"  >
              <input type="search"  placeholder='Search...' />
            </div>
          </Col>
          <Col lg={12}>
            <AddInbox />
          </Col>
          {inboxList?.map((element, i) => {
            return (
              <Col lg={12}>
                <div className="inboxContainer" onClick={() => handleInboxClick(element)}>
                  <div className="imgContainer">
                    <h2>{
                      element.fullname!=null? element.fullname.substring(0, 2) :
                    "TmMuseTeam".substring(0, 2)
                    }</h2>
                  </div>
                  <div className="inboxTitleContainer">
                    <p>{"TmMuse Team"}</p>
                    <h3>{element.title}</h3>
                    <span>{element.message.substring(0, 30)}{element.message.length > 30 ? <span>...</span> : null}</span>
                  </div>
                  <div className="dateInfo">
                    <span>{element.created_at}</span>
                  </div>
                </div>
              </Col>
            )
          })
          }
          {!inboxList  && <Col lg={12} style={{ textAlign: "center" }}><Loading/>
          </Col>
          }
        </Col>
        <Col lg={7} md={7} sm={7} xs={7}>
          <div className="messageArea">
          <Stack width='100%'>
            <div className="dateWithTitle">
              {/* <p>{element.updated_at }</p> */}
              <h2>{inboxTitle}</h2>
            </div>
            <Col lg={12} md={8} sm={12} xs={12}>
              <p style={{ marginLeft: '20px', collor: '#ADB5BD', fontSize: '15px' }}>{inboxMessage}</p>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: '#31456A', fontSize: '19px', marginTop: '90px', marginLeft: '20px' }}>From: {username}</h1>
              <p style={{ color: '#31456A', marginLeft: '20px', fontSize: '13px' }}>{phone_number}</p>
            </Col>
            <div className="sentButtonInbox">
              {/* <ReplyModal /> */}
              <div>
          
        
 <button onClick={handleOpen}><img src="images/send.svg"  style={{marginRight:'10px', height: '17px'}} alt="" /> Reply</button>
             
    </div>
            </div>
          </Stack>
          </div>
        </Col>
      </Row>
    </div>
  </div>;
};

export default InboxPage;
