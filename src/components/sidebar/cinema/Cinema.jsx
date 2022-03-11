import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Stack from '@mui/material/Stack';


const Cinema = () => {
    return (
        <div className='content'>
            <p style={{ color: '#31456A', fontWeight: 'bold', fontSize: '30px', paddingLeft: '40px', paddingTop: '30px' }}>Cinema</p>
            <div style={{ background: 'white', width: '92%', minHeight: '50vh', marginLeft: '40px', marginTop: '30px' }}>
                <div style={{ width: '91%', marginLeft: '40px', paddingTop: '30px' }}>
                    <Row>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2} marginTop={4}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Username:</p>
                                <input type="text"></input>
                            </Stack>
                        </Col>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2} marginTop={4}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Password:</p>
                                <input type="text" ></input>
                            </Stack>
                        </Col>
                        <Col lg={9} md={12} xs={12} sm={12}></Col>
                        <Col lg={3} md={12} xs={6} sm={6}>
                            <Stack direction='row' marginLeft={11} spacing={2} marginTop={7}>
                                <div className="sentButtonInbox">
                                    <button>Add</button>
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Cinema
