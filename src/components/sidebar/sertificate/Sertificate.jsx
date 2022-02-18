import React from 'react'
import AddCertificate from './addCertificate/AddCertificate'
import './Sertificate.css'
import Stack from '@mui/material/Stack';
import SertificateTable from './sertificateTable/SertificateTable'

const Sertificate = () => {
    return (
        <div className='content'>
            <Stack direction='row' id='forButton' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Certificate</p>
                <AddCertificate/>
            </Stack>
            <SertificateTable/>
        </div>
    )
}

export default Sertificate
