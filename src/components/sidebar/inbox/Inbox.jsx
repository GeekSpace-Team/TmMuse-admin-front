import React, { useState } from 'react'
import { axiosInstanse } from '../../utils/axiosInstanse';
import './Inbox.css'
import InboxPage from './inboxPage/InboxPage'

const Inbox = () => {
  const [inboxList, setInboxList] = useState([]);

    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      };
      async function getInbox() {
         axiosInstanse.get('/get-inbox?page=' + 1, { headers })
         .then(response => {
            setInboxList(response.data.body.inbox);
          }).catch((err)=>{
            console.log(err);
          })
          
    
      }
    return (
        <div className='content'>
            <InboxPage getInbox={getInbox} inboxList={[inboxList, setInboxList]} />
        </div>
    )
}

export default Inbox
