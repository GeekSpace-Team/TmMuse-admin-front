import React from 'react'
import { Col, Row } from 'react-bootstrap'
import EditImageModal from '../editImageModal/EditImageModal'
import LeftEditModal from '../leftEditModal/LeftEditModal'
import RightEditModal from '../rightEditModal/RightEditModal'

const RightAndLeft = () => {
    return (
        <div>
             <Row>
                <Col lg={6} md={12} sm={12} xs={12}>
                <LeftEditModal/>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                <RightEditModal/>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                    <EditImageModal/>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                    <EditImageModal/>
                </Col>
            </Row>

            
        </div>
    )
}

export default RightAndLeft
