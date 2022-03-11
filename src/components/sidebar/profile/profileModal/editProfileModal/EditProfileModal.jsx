import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
// import LeftSIdeModal from './LeftSideModal/LeftSIdeModal';
// import RightSideModal from './RightSideModal/RightSideModal';
import { Player } from '@lottiefiles/react-lottie-player';
import { axiosInstanse } from "../../../../utils/axiosInstanse";
import { useEffect } from 'react';
import Compress from 'compress.js'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { IoMdClose } from 'react-icons/io';
import './EditProfileModal.css'
import { ToastContainer, toast } from 'react-toastify';
import { showError } from '../../../../toast/toast';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '99%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'scroll',
    p: 4,
    display: 'block',
};


const EditProfileModal = (props) => {
    console.log("data", props.data);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { props.handleClose() }
    const navigate = useNavigate();
    const compress = new Compress()
    const [nameTM, setNameTM] = useState(props.data.nameTM);
    const [nameRU, setNameRU] = useState(props.data.nameRU);
    const [short_descTM, setshortdescTM] = useState(props.data.short_descTM);
    const [short_descRU, setshortdescRU] = useState(props.data.short_descRU);
    const [descriptionTM, setdescTM] = useState(props.data.descriptionTM);
    const [descriptionRU, setdescRU] = useState(props.data.descriptionRU);
    const [instagram, setinstagram] = useState(props.data.instagram);
    const [site, setsite] = useState(props.data.site);
    const [location, setlocation] = useState(props.data.location);
    const [address, setaddress] = useState(props.data.address);
    const [work_hours, setWork_hours] = useState(props.data.work_hours);
    const [free_time, setfreetime] = useState(props.data.free_time);
    const [is_VIP, setisVIP] = useState(props.data.is_VIP);
    const [order_in_list, setorderInList] = useState(props.data.order_in_list);
    const [status, setstatus] = useState(props.data.status);
    const [promotion_status, setowncard] = useState(props.data.promotion_status);
    const [category, setcategory] = useState(props.data.category_id);
    const [delivery, setdelivery] = useState(props.data.delivery);
    const [average_check, setavaragecheck] = useState(props.data.average_check);
    const [cousineTM, setCousineTM] = useState(props.data.cousineTM);
    const [cousineRU, setCousineRU] = useState(props.data.cousineRU);
    const [is_cash, setcash] = useState(props.data.is_cash);
    const [terminal, setterminal] = useState(props.data.terminal);
    const [required_promotion, setrequired_promotion] = useState(props.data.required_promotion);
    const [is_active_card, setisActiveCard] = useState(props.data.is_active_card);
    const [insertedProfileId, setinsertedProfileId] = useState(props.data.insertedProfileId);
    const [insertedCategoryId, setinsertedCategoryId] = useState(props.data.insertedCategoryId);
    const [loading, setLoading] = useState(false);
    const [arrayOfTopSliderImages, setarrayOfTopSliderImages] = useState([]);
    const [arrayOfGalleryLargeImages, setarrayOfGalleryLargeImages] = useState([]);
    const [serverUrl, setServerUrl] = useState("http://10.192.168.60:5000/");
    const [phone_number, setPhone_number] = useState(props.data.phone_numbers);
    const [isAdd, setIsAdd] = useState(props.data.isAdd);
    const categoryList = props.category;
    const [isCafe, setIsCafe] = useState(props.data.isCafe);
    const [isMovie, setIsMovie] = useState(false);
    const [compressedSliders, setCompressedSliders] = useState([]);
    const [compressedGallery, setCompressedGallery] = useState([]);
    const [tagsTM, setTagsTM] = useState('');
    const [tagsRU, setTagsRU] = useState('');
    const [WiFi, setIsWifi] = useState(props.data.WiFi);
    const [phoneNumberList, setphoneNumberList] = useState([""]);
    const [largeVrImage, setLargeVrImage] = useState('');
    const [smallVrImage, setSmallVrImage] = useState('');
    const [is_promo, setPromoCount] = useState(props.data.is_promo);
    const [is_certificate, setisCertificate] = useState(props.data.is_certificate);
    const [movieTime, setMovieTime] = useState(props.data.movieTime);
    const [is_terminal, setIs_terminal] = useState(props.data.is_terminal);
    const [like, setLike] = useState(props.data.like);
    const [dislike, setDislike] = useState(props.data.dislike);
    const [category_id, setCategory_id] = useState(props.data.category_id);
    const [view_count, setView_count] = useState(props.data.view_count);
    const [promo_count, setPromo_count] = useState(props.data.promo_count);
    const [cinema_id, setCinema_id] = useState(props.data.cinema_id);
    const [tm_muse_card, setTm_muse_card] = useState(props.data.tm_muse_card);
    const [own_promotion, setOwn_promotion] = useState(props.data.own_promotion);

    let newPhones = [];
    let tempTagTM='';
    let tempTagRU='';
    if(typeof props.data.phone_numbers !== 'undefined' && props.data.phone_numbers!=null){
        for(let j=0;j<props.data?.tags.length;j++){
            tempTagTM+=props.data.tags[j].tagTM;
            tempTagRU+=props.data.tags[j].tagRU;
            if(j<props.data?.tags.length-1){
                tempTagTM+=",";
                tempTagRU+=",";
            }
        }
    }

    if(typeof props.data.phone_numbers !== 'undefined' && props.data.phone_numbers!=null){
        for (let k = 0; k < props.data.phone_numbers.length; k++) {
            newPhones.push(props.data.phone_numbers[k].phone_number)
        }
    }

    useEffect(()=>{
        setphoneNumberList(newPhones);
        setTagsTM(tempTagTM);
        setTagsRU(tempTagRU);
    },[])

    const onFinsih = (id) => {
        setLoading(false);
        // setinsertedProfileId(0);
        // setinsertedCategoryId(0);
        handleClose();
        props.getData(props.page);
    }


    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };


    const addPhoneNumber = () => {
        const newPhones = [
            ...phoneNumberList.slice(0, phoneNumberList.length),
            ""
        ];
        setphoneNumberList(newPhones);
    }

    const phoneNumberUpdateById = (value, index) => {
        const newPhones = [
            ...phoneNumberList.slice(0, index),
            value,
            ...phoneNumberList.slice(index + 1)
        ];
        setphoneNumberList(newPhones);
    }

    const onFileUploadTopSliderImages = (id) => {
        if(arrayOfTopSliderImages.length==0){
            if(arrayOfGalleryLargeImages.length>0)
                onFileUploadGalleryLargeImages(id);
            else if(largeVrImage!='' && smallVrImage!=''){
                uploadLargeVrImage();
            } else {
                addTags(id);
            }
            return;
        }
        let formData = new FormData();

        for (let i = 0; i < arrayOfTopSliderImages.length; i++) {
            formData.append(`file1`, arrayOfTopSliderImages[i], "ok.jpg");
            formData.append(`file2`, compressedSliders[i], "ok.jpg");
        }


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        };
        axiosInstanse.post("/add-sliders?profile_id=" + id, formData, config).then((data) => {
            console.log(data.data);
            if(arrayOfGalleryLargeImages.length>0)
                onFileUploadGalleryLargeImages(id);
            else if(largeVrImage!='' && smallVrImage!=''){
                uploadLargeVrImage();
            } else {
                addTags(id);
            }
        })
            .catch(function (error) {
                showError('Add slider large error: ' + error.message);
                setLoading(false);
            })



    };



    const addTags = async (id) => {

        if (id == 0) {
            return;
        }
        const tagsTmArray = tagsTM.split(',');
        const tagsRuArray = tagsRU.split(',');
        if (tagsTmArray.length == 0 || tagsTmArray[0].trim()=='') {
            onFinsih(id);
            return;
        }
        console.log(id);
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
            }
        };
        axiosInstanse.post('/add-tags', {
            profile_id: id,
            category_id: category,
            tagTM: tagsTmArray,
            tagRU: tagsRuArray
        }, config).then(response => {
            if (!response.data.error) {
                
                    onFinsih(id);
                
            }
        }).catch(err => {
            // alert("Add tags error: " + err);
            showError("Add tags error: " + err);
            onFinsih(id);
        });
    }


    const onFileChangeTopSlider = (event) => {

        // Update the state
        setarrayOfTopSliderImages(event.target.files);
        setCompressedSliders([]);
        const files = [...event.target.files]
        let newArray = []
        compress.compress(files, {
            size: 1, // the max size in MB, defaults to 2MB
            quality: 0.10, // the quality of the image, max is 1,
            maxWidth: 1920, // the max width of the output image, defaults to 1920px
            maxHeight: 1920, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
            rotate: true // Enables rotation, defaults to false
        }).then((data) => {
            // returns an array of compressed images
            for (let k = 0; k < data.length; k++) {
                let img1 = data[k]
                let base64str = img1.data
                let imgExt = img1.ext
                let file = Compress.convertBase64ToFile(base64str, imgExt)
                console.log(file);
                newArray = [...newArray, file]
                if (k == data.length - 1) {
                    setCompressedSliders(newArray);
                }

            }
            console.log(data)
        })




    };

    const onFileChangeGallery = (event) => {

        // Update the state
        setarrayOfGalleryLargeImages(event.target.files);
        setCompressedGallery([]);
        const files = [...event.target.files]
        let newArray = []
        compress.compress(files, {
            size: 1, // the max size in MB, defaults to 2MB
            quality: 0.10, // the quality of the image, max is 1,
            maxWidth: 1920, // the max width of the output image, defaults to 1920px
            maxHeight: 1920, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
            rotate: true // Enables rotation, defaults to false
        }).then((data) => {
            // returns an array of compressed images
            for (let k = 0; k < data.length; k++) {
                let img1 = data[k]
                let base64str = img1.data
                let imgExt = img1.ext
                let file = Compress.convertBase64ToFile(base64str, imgExt)
                console.log(file);
                newArray = [...newArray, file]
                if (k == data.length - 1) {
                    setCompressedGallery(newArray);
                }

            }
            console.log(data)
        })




    };

    const handleSmallVrImage = (event) => {
        setSmallVrImage(event.target.files[0]);
    }
    const handleLargeVrImage = (event) => {
        setLargeVrImage(event.target.files[0]);
    }

   



    


    const addPhoneNumbers = async (id) => {
        console.log(phoneNumberList);
        if (id == 0 || phoneNumberList[0] == ''){
            onFileUploadTopSliderImages(id);
            return;
        }
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
            }
        };
        axiosInstanse.post('/add-phone-number', {
            profile_id: id,
            phone_numbers: phoneNumberList
        }, config).then(response => {
            if (!response.data.error) {
                if (arrayOfTopSliderImages.length > 0)
                    onFileUploadTopSliderImages(id);
                else if (arrayOfGalleryLargeImages.length > 0) {
                    onFileUploadGalleryLargeImages(id);
                } else if (smallVrImage != '' && largeVrImage != '') {
                    uploadLargeVrImage(id);
                } else {
                    addTags(id);
                }
            }
        }).catch(err => {
            // alert("Add phone number error: " + err)
            showError("Add phone number error: " + err);
            onFinsih(id);
        });
    }



    
    const onFileUploadGalleryLargeImages = (id) => {
        if(arrayOfGalleryLargeImages.length==0){
            if(largeVrImage!='' && smallVrImage!=''){
                uploadLargeVrImage();
            } else {
                addTags(id);
            }
            return;
        }
        let formData = new FormData();
        for (let i = 0; i < arrayOfGalleryLargeImages.length; i++) {
            formData.append(`file1`, arrayOfGalleryLargeImages[i], "ok.jpg");
            formData.append(`file2`, compressedGallery[i], "ok.jpg");
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        };
        axiosInstanse.post("/add-galleries?profile_id=" + id, formData, config).then((data) => {
            console.log(data.data);
            if(largeVrImage!='' && smallVrImage!=''){
                uploadLargeVrImage();
            } else {
                addTags(id);
            }
        })
            .catch(function (error) {
                // alert("Add gallery large error: " + error.message);
                showError("Add gallery large error: " + error.message);
                setLoading(false);
            })



    };


   


  


    const uploadLargeVrImage = async (id) => {
        if (largeVrImage != '') {
            let data = new FormData()
            data.append('file', largeVrImage, "ok.jpg")
            let url = "/add-vr-large-image?profile_id=" + id;
            axiosInstanse.post(url, data, {
                headers
            })
                .then(res => { // then print response status
                    if (!res.data.error) {
                        uploadSmallVrImage(id);
                    }
                }).catch(ex => {
                    // alert("Image upload error:" + ex);
                    showError("Image upload error: " + ex);
                    setLoading(false);
                    setinsertedProfileId(0);
                })
        }
    }



    const uploadSmallVrImage = async (id) => {
        if (smallVrImage != '') {
            let data = new FormData()
            data.append('file', smallVrImage, "ok.jpg")
            let url = "/add-vr-small-image?profile_id=" + id;
            axiosInstanse.put(url, data, {
                headers
            })
                .then(res => { // then print response status
                    if (!res.data.error) {
                        addTags(id);
                    }
                }).catch(ex => {
                    // alert("Image upload error:" + ex);
                    showError("Image upload error: " + ex);
                    onFinsih();
                })
        }
    }


    useEffect(() => {
        if (category == 4) {
            setIsCafe(true);
        } else {
            setIsCafe(false);
        }

        if (category == 2) {
            setIsMovie(true);
        } else {
            setIsMovie(false);
        }
    }, [category])

    const UpdateProfile = (id) => {
        axiosInstanse.put("/update-profile?id=" + id, {
            nameTM: nameTM,
            nameRU: nameRU,
            short_descTM: short_descTM,
            short_descRU: short_descRU,
            like: like,
            dislike: dislike,
            instagram: instagram,
            location: location,
            address: address,
            is_cash: is_cash,
            is_terminal: is_terminal,
            work_hours: work_hours,
            delivery: delivery,
            cousineTM: cousineTM,
            cousineRU: cousineRU,
            average_check: average_check,
            is_active_card: is_active_card,
            tm_muse_card: tm_muse_card,
            is_certificate: is_certificate,
            is_promo: is_promo,
            is_VIP: is_VIP,
            WiFi: WiFi,
            status: status,
            category_id: category_id,
            view_count: view_count,
            promo_count: promo_count,
            cinema_id: cinema_id,
            descriptionTM: descriptionTM,
            descriptionRU: descriptionRU,
            order_in_list: order_in_list,
            free_time: free_time,
            required_promotion: required_promotion,
            promotion_status: promotion_status,
            own_promotion: own_promotion,
            site: site

        }, { headers }).then((data) => {
            console.log("result", id);
            if (phoneNumberList.length > 0 && phoneNumberList[0] != '') {
                addPhoneNumbers(id);
            }
            else if (arrayOfTopSliderImages.length > 0) {
                // alert("2 if");
                onFileUploadTopSliderImages(id);
            }
            else if (arrayOfGalleryLargeImages.length > 0) {
                // alert("3 if");
                onFileUploadGalleryLargeImages(id);
            } else if (smallVrImage != '' && largeVrImage != '') {
                // alert("4 if");
                uploadLargeVrImage(id);
            } else {
                // alert("5 if");
                addTags(id);
            }
            //   if(phoneNumberList.length===null){
            //     props.handleClose()
            //     props.getData(1);
            //   }else{
            //     onFileUploadTopSliderImages(props.data.id)
            //   }


        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <div className='updateProfilee'>
            <Box sx={style}>
                <Stack direction='row' justifyContent='space-between'>
                    <p className='bannerModalTitle'>Update post</p>
                    <IoMdClose className='Xicon' onClick={handleClose} />
                </Stack>
                <Row >
                    <Col lg={6} md={12} sm={12} xs={12}>
                        <Row className='leftinputItem'>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Name TM:</p>
                                    <input className='inputModal' onChange={(e) => setNameTM(e.target.value)} defaultValue={props.data.nameTM} type="text" />
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Name RU:</p>
                                    <input className='inputModal' onChange={(e) => setNameRU(e.target.value)} defaultValue={props.data.nameRU} type="text" />
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Short description TM:</p>
                                    <input onChange={(e) => setshortdescTM(e.target.value)} defaultValue={props.data.short_descTM} className='inputModal' type="text" />
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Short description RU:</p>
                                    <input onChange={(e) => setshortdescRU(e.target.value)} defaultValue={props.data.short_descRU} className='inputModal' type="text" />
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Description TM:</p>
                                    <textarea onChange={(e) => setdescTM(e.target.value)} defaultValue={props.data.descriptionTM} name="" id="" cols="20" rows="4"></textarea>
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Description RU:</p>
                                    <textarea onChange={(e) => setdescRU(e.target.value)} defaultValue={props.data.descriptionRU} name="" id="" cols="20" rows="4"></textarea>
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Instagram(only username):</p>
                                    <input onChange={(e) => setinstagram(e.target.value)} defaultValue={props.data.instagram} className='inputModal' type="text" />
                                </Stack>
                            </Col>
                            {
                                isMovie == true ?
                                    <Row className="addMovie">
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Movie time:
                                                    <pre>09/01/2022(13:00,22:30)*
                                                        <br />11/01/2022-12/01/2022(14:00,22:30)*</pre></p>
                                                <textarea name="" id="movie" cols="51.9" rows="5" onChange={(e) => setsite(e.target.value)} defaultValue={site}></textarea>
                                            </Stack>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Address:</p>
                                                <input onChange={(e) => setaddress(e.target.value)} defaultValue={props.data.address} className='inputModal' type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Price:</p>
                                                <input onChange={(e) => setavaragecheck(e.target.value)} defaultValue={props.data.average_check} value={average_check} type="text" />
                                            </Stack>
                                        </Col>

                                    </Row>
                                    :
                                    <Row>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Site URl:</p>
                                                <input onChange={(e) => setsite(e.target.value)} defaultValue={props.data.site} className='inputModal' type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Location...</p>
                                                <input onChange={(e) => setlocation(e.target.value)} defaultValue={props.data.location} className='inputModal' type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Address:</p>
                                                <input onChange={(e) => setaddress(e.target.value)} defaultValue={props.data.address} className='inputModal' type="text" />
                                            </Stack>
                                        </Col>

                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Work hours(09:00-18:00):</p>
                                                <input onChange={(e) => setWork_hours(e.target.value)} defaultValue={props.data.work_hours} className='inputModal' type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Free time(13:00-14:00):</p>
                                                <input onChange={(e) => setfreetime(e.target.value)} defaultValue={props.data.free_time} className='inputModal' type="text" />
                                            </Stack>
                                        </Col>

                                    </Row>


                            }



                        </Row>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                        <Row className='inputSize' >
                            <Col lg={2.5} md={3} sm={12} xs={12}>
                                <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                    <input type="checkbox" style={{ marginTop: '5px' }} checked={is_VIP} onInput={e => setisVIP(!is_VIP)} />
                                    <p className='inputTitle'>Is VIP?</p>
                                </Stack>
                            </Col>
                            <Col lg={2.5} md={3} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Order in list:</p>
                                    <input value={order_in_list} onInput={e => setorderInList(e.target.value)} type="text" />
                                </Stack>
                            </Col>
                            <Col lg={2.5} md={3} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Status:</p>
                                    <select style={{ height: '30px' }} defaultValue={status} onChange={e => setstatus(e.target.value)} name="" id="">
                                        <option value="0">Status</option>
                                        <option value="1">Active</option>
                                        <option value="2">Passive</option>
                                    </select>
                                </Stack>
                            </Col>
                            <Col lg={2.5} md={3} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>TmMuse Card:</p>
                                    <input onChange={(e) => setTm_muse_card(e.target.value)} defaultValue={props.data.tm_muse_card} type="text" />
                                </Stack>
                            </Col>
                            <Col lg={2.5} md={3} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Own Card:</p>
                                    <input value={own_promotion} onInput={e => setOwn_promotion(e.target.value)} type="text" />
                                </Stack>
                            </Col>
                            <Col lg={4} md={12} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Category:</p>
                                    <select value={category} onChange={e => setcategory(e.target.value)} style={{ height: '30px' }} name="" id="category" className="normalSize" >
                                        <option value="0">Select category</option>
                                        {
                                            categoryList?.map((element, i) => {
                                                return (
                                                    <option key={"keyyy" + element?.id} value={element.id}>{element.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Stack>
                            </Col>

                            {
                                isCafe == true ?
                                    <Row id="cafeRestaurantContainer1">
                                        <Col lg={3} md={3} sm={12} xs={12}>
                                            <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                <input type="checkbox" style={{ marginTop: '5px' }} checked={delivery} onInput={e => setdelivery(!delivery)} />
                                                <p className='inputTitle'>Delivery:</p>
                                            </Stack>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Avarage check:</p>
                                                <input value={average_check} onInput={e => setavaragecheck(e.target.value)} type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Kitchen TM:</p>
                                                <input value={cousineTM} onInput={e => setCousineTM(e.target.value)} id='kitchenTmInput' type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} xs={12}>
                                            <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                <input type="checkbox" style={{ marginTop: '5px' }} checked={is_cash} onInput={e => setcash(!is_cash)} />
                                                <p className='inputTitle'>Cash:</p>
                                            </Stack>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} xs={12}>
                                            <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                <input type="checkbox" style={{ marginTop: '5px' }} checked={is_terminal} onInput={e => setIs_terminal(!is_terminal)} />
                                                <p className='inputTitle'>Terminal:</p>
                                            </Stack>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Kitchen RU:</p>
                                                <input value={cousineRU} onInput={e => setCousineRU(e.target.value)} id='kitchenTmInput' type="text" />
                                            </Stack>
                                        </Col>
                                        <Col lg={3} md={3} sm={12} xs={12}>
                                            <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                <input type="checkbox" style={{ marginTop: '5px' }} checked={WiFi} onInput={e => setIsWifi(!WiFi)} />
                                                <p className='inputTitle'>Wifi:</p>
                                            </Stack>
                                        </Col>
                                    </Row>
                                    :
                                    <p></p>
                            }


                            {/* Add phone number is starting here */}
                            {/* <Row className="AddPhoneNumber">
                                {
                                    phone_number?.map((element, i) => {
                                        return <Col key={"keyyyyyyy" + element.id} lg={4} md={12} sm={12} xs={12}>
                                            <Stack direction='column' spacing={0}>
                                                <p className='inputTitle'>Phone number {i + 1}:</p>
                                                <input type="text" onChange={(e) => setPhone_number(e.target.value)} value={element.phone_number} className='normalSize' />
                                            </Stack>
                                        </Col>

                                    })
                                }
                                <Col lg={4} md={12} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0} marginLeft={-9} marginTop={0}>
                                        <p className='addPhoneNumber' onClick={addPhoneNumber}> +Add phone number:</p>
                                    </Stack>
                                </Col>
                            </Row> */}
                            {/* Add phone number is starting here */}
                            <Row className="AddPhoneNumber">
                                {
                                    phoneNumberList?.map((element, i) => {
                                        return (
                                            <Col key={"keyyyyyyy" + element.id} lg={4} md={12} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Phone number {i + 1}:</p>
                                                    <input type="text" value={element} onInput={e => phoneNumberUpdateById(e.target.value, i)} className='normalSize' />
                                                </Stack>
                                            </Col>
                                        )
                                    })
                                }
                                <Col lg={4} md={12} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0} marginLeft={-14} marginTop={-1}>
                                        <p className='addPhoneNumber' onClick={addPhoneNumber}> +Add phone number:</p>
                                    </Stack>
                                </Col>
                            </Row>
                            {/* Add phone number is ending here */}

                            <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                <Stack direction='column' spacing={0}>
                                    <form method="post" enctype="multipart/form-data">
                                        <p className='inputTitle'>Top slider(multiple):</p>
                                        <input type="file" className='custom-file-input' onChange={onFileChangeTopSlider} multiple />
                                    </form>
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Gallery image(multiple):</p>
                                    <input type="file" className='custom-file-input' onChange={onFileChangeGallery} multiple />
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>VR small image:</p>
                                    <input id='fileDownload' className='custom-file-input' type="file" onChange={handleSmallVrImage} />
                                </Stack>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>VR large image:</p>
                                    <input id='fileDownload' className='custom-file-input' type="file" onChange={handleLargeVrImage} />
                                </Stack>
                            </Col>

                            <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Tags TM:</p>
                                        <input type="text" onChange={e => setTagsTM(e.target.value)} value={tagsTM} />
                                    </Stack>
                                </Col>
                           <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Tags RU:</p>
                                        <input type="text" onChange={e => setTagsRU(e.target.value)} value={tagsRU} />
                                    </Stack>
                                </Col>
                            <Col lg={3} md={3} sm={12} xs={12}>
                                <Stack direction='column' spacing={0}>
                                    <p className='inputTitle'>Promo count:</p>
                                    <input type="number" onChange={(e) => setPromoCount(e.target.value)} defaultValue={props.data.promo_count} />
                                </Stack>
                            </Col>
                            <Col lg={3} md={3} sm={12} xs={12}>
                                <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                    <input type="checkbox" style={{ marginTop: '5px' }} checked={is_certificate} onInput={e => setisCertificate(!is_certificate)} />
                                    <p className='inputTitle'>Certificat</p>
                                </Stack>
                            </Col>
                            <Col id='RequiredPromotion' lg={4} md={4} sm={4} xs={4}>
                                <Stack direction='row' spacing={0} marginTop={3} marginLeft={-5}>
                                    <input type="checkbox" style={{ marginTop: '5px' }} checked={required_promotion} onInput={e => setrequired_promotion(!required_promotion)} />
                                    <p className='inputTitle' style={{ marginLeft: '-29px' }}>Required promotion</p>
                                </Stack>
                            </Col>
                            <Col lg={9} md={9} sm={12} xs={12}></Col>
                            <Col className='fullSizeInput' lg={3} md={3} sm={12} xs={12}>
                                <button onClick={() => UpdateProfile(props.data.id)}>Update</button>
                            </Col>


                        </Row>
                    </Col>
                </Row>
                {/* </form> */}
            </Box>
            <ToastContainer />
        </div >
    )
}

export default EditProfileModal
