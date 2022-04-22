import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import DeleteAds from '../deleteAds/DeleteAds'
import UpdateAds from '../updateAds/UpdateAds'
import './Ads.css'
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';
import Loading from '../../../loading/Loading'
import { Backdrop, Modal, Stack } from '@mui/material';
import Empty from '../../../empty/Empty';


const AdsTable = (props) => {
    const [adsList, setAdsList] = props.adsList;
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = props.pageCount;
    const [isEmpty, setIsEmpty] = props.isEmpty;
    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);

    useEffect(() => {
        props.getAds(page);
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <UpdateAds handleClose={handleClose} getData={props.getAds}   data={element} />
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open1}
                    onClose={handleClose1}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <DeleteAds handleClose={handleClose1} getData={props.getAds} adsId={elementId} />
                </Modal>
                {(adsList.length==0 && !isEmpty)?<Empty/>
      :<Table responsive borderless className='profileTable'>
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th style={{paddingLeft:'40px'}}>Name</th>
                <th style={{paddingLeft:'50px'}}>Comment of admin</th>
                <th style={{paddingLeft:'100px'}}>Profile || Site URL</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            {
                
                adsList.map((element,i)=>{
                    return(
                        <tr>
                            <td>{element.id}</td>
                            <td><img src={ip + element.image} alt="" style={{ width: '150px', height: '100px', objectFit: 'cover' }} /></td>
                            <td style={{paddingLeft:'40px'}}>{element.nameTM}</td>
                            <td style={{paddingLeft:'50px'}}>{element.comment_of_admin}</td>
                            <td style={{paddingLeft:'100px'}}>{element.profile_id == 0 ? element.site_url : element.profile_id}</td>
                            <td style={{paddingRight:'40px'}}><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></td>
                            <td style={{paddingRight:'40px'}}><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></td>
                        </tr>
                    )
                })
            }
            
                
            </Table>
        }
        {adsList.length==0?null:
        
             <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px',justifyContent:'center', display:"flex"}} />}
        </div>
        
    )
}

export default AdsTable
