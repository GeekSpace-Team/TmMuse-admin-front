import React,{ useState, useEffect } from 'react'
import './Interests.css'
import InterestsTable from './interestsTable/InterestsTable'
import Stack from '@mui/material/Stack';
import AddInterestsModal from './addInterestsModal/AddInterestsModal';
import { axiosInstanse } from '../../utils/axiosInstanse';


const Interests = () => {
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = useState([]);
    const [interestList, setIntertestList] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      };
    async function getInterests(page)  {
         axiosInstanse.get('/get-interests?page=' + page, {headers})
         .then(response => {
            setIntertestList(response.data.body.interests);
            setPageCount(response.data.body.page_count);
          })
            .catch(error => {

            });


    }
    return (
        <div className='content'>
            <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Interests</p>
                <AddInterestsModal getInterests={getInterests}/>
            </Stack>
            <InterestsTable getInterests={getInterests} isEmpty={[isEmpty, setIsEmpty]} page={[page, setPage]} interestList={[interestList, setIntertestList]} pageCount={[pageCount, setPageCount]}/>
        </div>
    )
}

export default Interests
