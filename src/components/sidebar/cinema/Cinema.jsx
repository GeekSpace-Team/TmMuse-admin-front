import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import { axiosInstanse } from '../../utils/axiosInstanse';
import { showError, showSuccess, showWarning } from '../../toast/toast';
import { ToastContainer } from 'react-toastify';


const Cinema = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ type, setType ] = useState('5');

    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      };

      async function cinemaUp() {
          const cinema = {
            username: username,
            password: password,
            type: type
          };
          axiosInstanse.post('/sign-up', cinema, { headers })
          .then(response => {
            if (response.data.error) {
              showWarning("Something is went wrong!");
            }
            showSuccess("Successfully added!!!");
            setUsername('');
            setPassword('');
        }).catch(ex => {
            showError("Adding error:" + ex);
          });
      }

      
  useEffect(() => {

    cinemaUp();
  }, []);

    return (
        <div className='content'>
            <p style={{ color: '#31456A', fontWeight: 'bold', fontSize: '30px', paddingLeft: '40px', paddingTop: '30px' }}>Cinema</p>
            <div style={{ background: 'white', width: '92%', minHeight: '50vh', marginLeft: '40px', marginTop: '30px' }}>
                <div style={{ width: '91%', marginLeft: '40px', paddingTop: '30px' }}>
                    <Row>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2} marginTop={4}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Username:</p>
                                <input type="text" value={username} onInput={e => setUsername(e.target.value)}></input>
                            </Stack>
                        </Col>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2} marginTop={4}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Password:</p>
                                <input type="text" value={password} onInput={e => setPassword(e.target.value)} ></input>
                            </Stack>
                        </Col>
                        <Col lg={9} md={12} xs={12} sm={12}></Col>
                        <Col lg={3} md={12} xs={6} sm={6}>
                            <Stack direction='row' marginLeft={11} spacing={2} marginTop={7}>
                                <div className="sentButtonInbox">
                                    <button onClick={()=>cinemaUp()}>Add</button>
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                </div>
            </div>
      <ToastContainer />
        </div>
    )
}

export default Cinema
