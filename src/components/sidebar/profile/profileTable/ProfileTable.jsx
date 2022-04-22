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
      useEffect(() => {
        props.getProfile(page);
    }, [page]);
    return (
        <div>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <EditProfileModal handleClose={handleClose} category={props.category} page={page} profileList={profileList}  getData={props.getProfile}   data={element} />
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
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>View count</th>
                <th>Like</th>
                <th>Dislike</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            {
                
                profileList?.map((element,i)=>{
                    return(
                        <tr>
                        <td>{element.id}</td>
                        <td>{element.nameTM}</td>
                        <td>
                            {
                            element?.sliders &&  element?.sliders[0] && (element?.sliders[0].small_image ?  
                            <img src={ip+element?.sliders[0]?.small_image}  width={150} height={100}/>
                            :(element?.sliders[0]?.large_image ? <img src={ip+element?.sliders[0]?.large_image}  width={150} height={100}/>
                            :<img src="../../../images/place.jpg" width={150} height={100}/>))
                            }
                           
                        </td>
                        <td>{element.category_id}</td>
                        <td>{element.view_count}</td>
                        <td>{element.like}</td>
                        <td>{element.dislike}</td>
                        <td><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></td>
                        <td style={{paddingRight:'20px'}}><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></td>
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
