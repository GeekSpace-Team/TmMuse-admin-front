// import { Stack } from '@mui/material'
// import React from 'react'
// import { Col, Row } from 'react-bootstrap'
// import './LeftEditModal.css'

// const LeftEditModal = () => {
//     return (
//         <div>
//             <Row className='leftinputItem'>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Name TM:</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Name RU:</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Short description TM:</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Short description RU:</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Description TM:</p>
//                         <textarea name="" id="" cols="20" rows="4"></textarea>
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Description RU:</p>
//                         <textarea name="" id="" cols="20" rows="4"></textarea>
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Instagram(only username):</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Site URl:</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Location...</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Address:</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>

//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Work hours(09:00-18:00):</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                     <Stack direction='column' spacing={0}>
//                         <p className='inputTitle'>Free time(13:00-14:00):</p>
//                         <input className='inputModal' type="text" />
//                     </Stack>
//                 </Col>
//                 {
//                     isMovie == true ?
//                         <Row className="addMovie">
//                             <Col lg={12} md={12} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Movie time:
//                                         <pre>9.1.2022(13:00,22:30)*
//                                             <br />11.1.2022-12.1.2022(14:00,22:30)*</pre></p>
//                                     <textarea name="" id="movie" cols="51.9" rows="5" onInput={e => setMovieTime(e.target.value)}></textarea>
//                                 </Stack>
//                             </Col>
//                         </Row>
//                         :
//                         <Row>
//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Site URl:</p>
//                                     <input value={site} onInput={e => setsite(e.target.value)} className='inputModal' type="text" />
//                                 </Stack>
//                             </Col>
//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Location...</p>
//                                     <input value={location} onInput={e => setlocation(e.target.value)} className='inputModal' type="text" />
//                                 </Stack>
//                             </Col>
//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Address:</p>
//                                     <input value={address} onInput={e => setaddress(e.target.value)} className='inputModal' type="text" />
//                                 </Stack>
//                             </Col>

//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Work hours(09:00-18:00):</p>
//                                     <input value={workhours} onInput={e => setworkhours(e.target.value)} className='inputModal' type="text" />
//                                 </Stack>
//                             </Col>
//                             <Col lg={6} md={6} sm={12} xs={12}>
//                                 <Stack direction='column' spacing={0}>
//                                     <p className='inputTitle'>Free time(13:00-14:00):</p>
//                                     <input value={freetime} onInput={e => setfreetime(e.target.value)} className='inputModal' type="text" />
//                                 </Stack>
//                             </Col>
//                         </Row>


//                 }

//             </Row>
//         </div>
//     )
// }

// export default LeftEditModal
