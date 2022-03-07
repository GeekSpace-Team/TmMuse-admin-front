// import React from 'react'
// import { Col, Row } from 'react-bootstrap'
// import './RightEditModal.css'

// const RightEditModal = () => {
//     return (
//         <div>
//             <Row className='inputSize' >
//                 <Col lg={2.5} md={3} sm={12} xs={12}>
//                     <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
//                         <input type="checkbox" style={{ marginTop: '5px' }} />
//                         <p className='inputTitle'>Is VIP?</p>
//                     </Stack>
//                 </Col>
//                 <Col lg={2.5} md={3} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Order in list:</p>
//                         <input value={orderInList} type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={2.5} md={3} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Status:</p>
//                         <select style={{ height: '30px' }} name="" id="">
//                             <option value="0">Status</option>
//                             <option value="1">Active</option>
//                             <option value="2">Passive</option>
//                         </select>
//                     </Stack>
//                 </Col>
//                 <Col lg={2.5} md={3} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>TmMuse Card:</p>
//                         <input value={tmmusecard} type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={2.5} md={3} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Own Card:</p>
//                         <input value={owncard} onInput={e => setowncard(e.target.value)} type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={4} md={12} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Category:</p>
//                         <select onChange={e => setcategory(e.target.value)} style={{ height: '30px' }} name="" id="category" className="normalSize" >
//                             <option value="0">Select category</option>
//                             {
//                                 categoryList?.map((element, i) => {
//                                     return (
//                                         <option key={"keyyy" + element?.id} value={element.id}>{element.name}</option>
//                                     )
//                                 })
//                             }
//                         </select>
//                     </Stack>
//                 </Col>


//                 {
//                     isCafe == true ?
//                         <Row id="cafeRestaurantContainer1">
//                             <Col lg={3} md={3} sm={12} xs={12}>
//                                 <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
//                                     <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setdelivery(e.target.checked)} />
//                                     <p className='inputTitle'>Delivery:</p>
//                                 </Stack>
//                             </Col>
//                             <Col lg={3} md={3} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Avarage check:</p>
//                                     <input value={avaragecheck} onInput={e => setavaragecheck(e.target.value)} type="text" />
//                                 </Stack>
//                             </Col>
//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Kitchen TM:</p>
//                                     <input value={kitchenTM} onInput={e => setkitchenTM(e.target.value)} id='kitchenTmInput' type="text" />
//                                 </Stack>
//                             </Col>
//                             <Col lg={3} md={3} sm={12} xs={12}>
//                                 <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
//                                     <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setcash(e.target.checked)} />
//                                     <p className='inputTitle'>Cash:</p>
//                                 </Stack>
//                             </Col>
//                             <Col lg={3} md={3} sm={12} xs={12}>
//                                 <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
//                                     <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setterminal(e.target.checked)} />
//                                     <p className='inputTitle'>Terminal:</p>
//                                 </Stack>
//                             </Col>
//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Kitchen RU:</p>
//                                     <input value={kitchenRU} onInput={e => setkitchenRU(e.target.value)} id='kitchenTmInput' type="text" />
//                                 </Stack>
//                             </Col>
//                             <Col lg={3} md={3} sm={12} xs={12}>
//                                 <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
//                                     <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setIsWifi(e.target.checked)} />
//                                     <p className='inputTitle'>Wifi:</p>
//                                 </Stack>
//                             </Col>
//                         </Row>
//                         :
//                         <p></p>
//                 }

//                 <Row className="AddPhoneNumber">
//                     {
//                         phoneNumberList?.map((element, i) => {
//                             return (
//                                 <Col key={"keyyyyyyy" + element.id} lg={4} md={12} sm={12} xs={12}>
//                                     <Stack direction='column' spacing={0}>
//                                         <p className='inputTitle'>Phone number {i + 1}:</p>
//                                         <input type="text" value={element.phoneNumber} onInput={e => phoneNumberUpdateById(e.target.value, i)} className='normalSize' />
//                                     </Stack>
//                                 </Col>
//                             )
//                         })
//                     }
//                     <Col lg={4} md={12} sm={12} xs={12}>
//                         <Stack direction='column' spacing={0} marginLeft={-14} marginTop={-1}>
//                             <p className='addPhoneNumber' onClick={addPhoneNumber}> +Add phone number:</p>
//                         </Stack>
//                     </Col>
//                 </Row>
//                 {/* Add phone number is ending here */}

//                 <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
//                     <Stack direction='column' spacing={0}>
//                         <form method="post" enctype="multipart/form-data">
//                             <p className='inputTitle'>Top slider(multiple):</p>
//                             <input type="file" className='custom-file-input' onChange={onFileChangeTopSlider} multiple />
//                         </form>
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Gallery image(multiple):</p>
//                         <input type="file" className='custom-file-input' onChange={onFileChangeGallery} multiple />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>VR small image:</p>
//                         <input id='fileDownload' className='custom-file-input' type="file" onChange={handleSmallVrImage} />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>VR large image:</p>
//                         <input id='fileDownload' className='custom-file-input' type="file" onChange={handleLargeVrImage} />
//                     </Stack>
//                 </Col>

//                 <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Tags TM:</p>
//                         <input type="text" onChange={e => setTagsTM(e.target.value)} />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Tags RU:</p>
//                         <input type="text" onChange={e => setTagsRU(e.target.value)} />
//                     </Stack>
//                 </Col>
//                 <Col lg={3} md={3} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Promo count:</p>
//                         <input type="number" value={promoCount} onInput={e => setPromoCount(e.target.value)} />
//                     </Stack>
//                 </Col>
//                 <Col lg={3} md={3} sm={12} xs={12}>
//                     <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
//                         <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setisCertificate(e.target.checked)} checked={isCertificate} />
//                         <p className='inputTitle'>Certificat</p>
//                     </Stack>
//                 </Col>
//                 <Col id='RequiredPromotion' lg={4} md={4} sm={4} xs={4}>
//                     <Stack direction='row' spacing={0} marginTop={3} marginLeft={-5}>
//                         <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setrequired_promotion(e.target.checked)} />
//                         <p className='inputTitle' style={{ marginLeft: '-29px' }}>Required promotion</p>
//                     </Stack>
//                 </Col>
//                 <Col className='fullSizeInput' lg={3} md={3} sm={12} xs={12}><button>Add</button></Col>
//             </Row>
//         </div>
//     )
// }

// export default RightEditModal
