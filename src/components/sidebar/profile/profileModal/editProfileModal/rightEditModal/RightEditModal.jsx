import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './RightEditModal.css'

const RightEditModal = () => {
    return (
        <div>
            <Row className='inputSize' >
                <Col lg={2.5} md={3} sm={12} xs={12}>
                    <p className='inputTitle'>Is VIP?</p>
                    <input type="checkbox"/>
                </Col> 
                <Col lg={2.5} md={3} sm={12} xs={12}>
                    <p className='inputTitle'>Order in list:</p>
                    <input type="text" />
                </Col> 
                <Col lg={2.5} md={3} sm={12} xs={12}>
                    <p className='inputTitle'>Status:</p>
                    <select name="" id=""><option value="">Active</option><option value="">Passive</option></select>
                </Col> 
                <Col lg={2.5} md={3} sm={12} xs={12}>
                    <p className='inputTitle'>TmMuse Card:</p>
                    <input type="text" />
                </Col> 
                <Col lg={2.5} md={3} sm={12} xs={12}>
                    <p className='inputTitle'>Own Card:</p>
                    <input value={0} type="text" />
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                    <p className='inputTitle'>Category:</p>
                    <select name="" id="category" className="normalSize" ><option value="0">Select category</option><option value="3">Cafe and Restaurant</option></select>
                </Col>  
                <Col lg={5} md={12} sm={12} xs={12}>
                    <p className='inputTitle'>Tenant:</p>
                    <select name="" className="normalSize"><option value="">Select Tenant</option><option value="">Passive</option></select>
                </Col>
                {/* When select cafe and restaurant category starting here*/}

                    <Col lg={3} md={3} sm={12} xs={12}>
                        <p className='inputTitle'>Delivery:</p>
                        <input type="checkbox" />
                    </Col>
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <p className='inputTitle'>Avarage check:</p>
                        <input type="text" />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <p className='inputTitle'>Kitchen TM:</p>
                        <input id='kitchenTmInput' type="text" />
                    </Col> 
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <p className='inputTitle'>Cash:</p>
                        <input type="checkbox" />
                    </Col>
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <p className='inputTitle'>Terminal:</p>
                        <input type="checkbox" />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <p className='inputTitle'>Kitchen RU:</p>
                        <input id='kitchenTmInput' type="text" />
                    </Col> 
                {/* select category ending here */}

                {/* Add phone number is starting here */}
                    <Col lg={4} md={12} sm={12} xs={12}>
                        <p className='inputTitle'>Phone number:</p>
                        <input type="text" className='normalSize' />
                    </Col>
                    <Col lg={4} md={12} sm={12} xs={12}>
                        <p className='inputTitle'>Phone number:</p>
                        <input type="text" className='normalSize' />
                    </Col>
                    <Col lg={4} md={12} sm={12} xs={12}>
                        <p className='addPhoneNumber'> +Add phone number:</p>
                    </Col>
                {/* Add phone number is ending here */}
               
                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                    <p className='inputTitle'>Top slider(multiple):</p>
                    <input type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                    <p className='inputTitle'>Gallery image(multiple):</p>
                    <input type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                    <p className='inputTitle'>VR small image:</p>
                    <input id='fileDownload' type="file" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                    <p className='inputTitle'>VR large image:</p>
                    <input id='fileDownload' type="file" />
                </Col>

                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                    <p className='inputTitle'>Tags TM:</p>
                    <input type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                    <p className='inputTitle'>Tags RU:</p>
                    <input type="text" />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}></Col>
                <Col id='RequiredPromotion' lg={4} md={4} sm={4} xs={4}><p className='inputTitle'>Required promotion:</p></Col>
                <Col lg={2} md={2} sm={2} xs={2}><input type="checkbox" /></Col>
                <Col lg={9} md={9} sm={12} xs={12}></Col>
                <Col className='fullSizeInput' lg={3} md={3} sm={12} xs={12}><button>Add</button></Col>
            </Row>
        </div>
    )
}

export default RightEditModal
