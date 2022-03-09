import React,{useEffect, useState} from 'react'
import { Table } from 'react-bootstrap'
import DeleteProfileModal from '../profileModal/deleteProfileTable/DeleteProfileModal'
import EditProfileModal from '../profileModal/editProfileModal/EditProfileModal'
import './ProfileTable.css'
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';
import Loading from '../../../loading/Loading'
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty'



const ProfileTable = (props) => {
    const[profileList,setProfileList]=props.data;
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=props.pageCount;
    const [category,setCategory]=useState("0");
    const [show, setShow] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);
   
    
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
                    <EditProfileModal handleClose={handleClose} category={props.category} getData={props.getProfile}   data={element} />
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
                   <DeleteProfileModal handleClose={handleClose1} getData={props.getProfile} profile_id={elementId} />
                </Modal>
            {profileList.length==0?<Empty/>:
            <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Name</center></th>
                <th><center>Image</center></th>
                <th><center>Category</center></th>
                <th><center>vip status</center></th>
                <th><center>status</center></th>
                <th><center>View count</center></th>
                <th><center>Like</center></th>
                <th><center>Dislike</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {
                
                profileList?.map((element,i)=>{
                    return(
                        <tr>
                        <td><center>{element.id}</center></td>
                        <td><center>{element.nameTM}</center></td>
                        <td><center>
                            {
                            element?.sliders &&  element?.sliders[0] && (element?.sliders[0].small_image ?  
                            <img src={ip+element?.sliders[0]?.small_image}  width={150} height={100}/>
                            :(element?.sliders[0]?.large_image ? <img src={ip+element?.sliders[0]?.large_image}  width={150} height={100}/>
                            :<img src="../../../images/place.jpg" width={150} height={100}/>))
                            }
                           
                        </center></td>
                        <td><center>{element.category_id}</center></td>
                        <td><center>{element.is_VIP}</center></td>
                        <td><center>{element.status}</center></td>
                        <td><center>{element.view_count}</center></td>
                        <td><center>{element.like}</center></td>
                        <td><center>{element.dislike}</center></td>
                        <td><center><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></center></td>
                        <td><center><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></center></td>
                        {/* <td><center><DeleteProfileModal getCategory={props.getProfile} profileId={element.id}/></center></td>
                        <td><center><EditProfileModal category={props.category} getProfile={props.getCategory} data={element}/></center></td> */}
                    </tr>
                    )
                })
            }
            </Table>
        }
{profileList.length==0?null:
            <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px', display:'flex', justifyContent:'center'}} />}
        </div>
    )
}

export default ProfileTable
