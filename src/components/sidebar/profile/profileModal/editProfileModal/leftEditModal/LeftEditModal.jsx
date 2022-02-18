import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './LeftEditModal.css'

const LeftEditModal = () => {
    return (
        <div>
            <Row className='leftinputItem'>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Name TM:</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Name RU:</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Short description TM:</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Short description RU:</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Description TM:</p>
                    <textarea name="" id="" cols="20" rows="4"></textarea>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Description RU:</p>
                    <textarea name="" id="" cols="20" rows="4"></textarea>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Instagram(only username):</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Site URl:</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Location...</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Address:</p>
                    <input className='inputModal' type="text" />
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Work hours(09:00-18:00):</p>
                    <input className='inputModal' type="text" />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <p className='inputTitle'>Free time(13:00-14:00):</p>
                    <input className='inputModal' type="text" />
                </Col>
                <div className="addMovie">
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <p className='inputTitle'>Movie time:</p>
                        <textarea name="" id="movie" cols="51.9" rows="5"></textarea>
                    </Col>
                </div>

            </Row>
        </div>
    )
}

export default LeftEditModal
