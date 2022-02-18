import React from 'react'
import './Profile.css'
import ProfileTable from './profileTable/ProfileTable'
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ProfileModal from './profileModal/ProfileModal';


const Profile = () => {
    
    return (
        <div className='content' >
            <Stack className='profileName' marginTop='10' direction='row' justifyContent='space-between' >
                <p>Profiles</p>
                <span className='ProfileModalAddButton'><ProfileModal/></span>
            </Stack>
            <Stack direction={{ lg: 'row', md: 'row', sm: 'row', xs:'column'}} className='profileSelect'
             spacing={5}>
                <select name="" id=""><option value="">Select category</option></select>
            </Stack>
            <ProfileTable/>
        </div>
    )
}

export default Profile
