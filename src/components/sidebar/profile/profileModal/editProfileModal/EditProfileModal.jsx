import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './EditProfileModal.css'
import RightAndLeft from './RightAndLeft/RightAndLeft'

const EditProfileModal = () => {
    const [show, setShow] = useState(false);
    return (
        <div>
             <img src="images/Edit.svg" onClick={() => setShow(true)} alt="" />
      <Modal
        className='modal'
        show={show}
        fullscreen={true}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <p className='addProfileTitle'>Add profile</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RightAndLeft/>
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default EditProfileModal
