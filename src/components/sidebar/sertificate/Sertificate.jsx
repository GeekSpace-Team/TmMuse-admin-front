import React, { useEffect, useState } from 'react'
import AddCertificate from './addCertificate/AddCertificate'
import './Sertificate.css'
import Stack from '@mui/material/Stack';
import SertificateTable from './sertificateTable/SertificateTable'
import { axiosInstanse } from '../../utils/axiosInstanse';
import Loading from '../../loading/Loading';

const Sertificate = () => {
  const [certificateList, setCertificateList] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [allProfileList, setAllProfileList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);


  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };

  useEffect(() => {
    
    axiosInstanse.get("/get-name-profile", { headers })
      .then((response) => {
        setAllProfileList(response.data.body);
        if(response.data.body==null || response.data.body.certificateList.length==0){
          setIsEmpty(true);
        }
      }).catch((err)=>{
        console.log(err)
      });
  }, [])


  
  async function getCertificate(page) {
     axiosInstanse.get('/get-certificates?page=' + 1, { headers })
      .then((response) => {
        setCertificateList(response.data.body.certificates);
        setPageCount(response.data.body.page_count);
      })
      .catch((err)=>{
        console.log(err)
      });
    

  }
 
    return (
        <div className='content'>
            <Stack direction='row' id='forButton' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Certificate</p>
                <AddCertificate getCertificate={getCertificate} />
            </Stack>
              <SertificateTable getCertificate={getCertificate} isEmpty={[isEmpty,setIsEmpty]} allProfileList={allProfileList}  certificateList={certificateList} pageCount={pageCount} />
            
        </div>
    )
}

export default Sertificate;
