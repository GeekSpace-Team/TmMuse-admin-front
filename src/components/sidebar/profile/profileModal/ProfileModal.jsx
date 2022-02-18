import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import './profileModal.css'
import LeftSIdeModal from './LeftSideModal/LeftSIdeModal';
import RightSideModal from './RightSideModal/RightSideModal';
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import { axiosInstanse } from "../../../utils/axiosInstanse";
import { useEffect } from 'react';
import Compress from 'compress.js'
import { useNavigate } from 'react-router-dom';




const ProfileModal = () => {
    const navigate = useNavigate();
    const compress = new Compress()
    const [show, setShow] = useState(false);
    const [nameTM, setNameTM] = useState('');
    const [nameRU, setNameRU] = useState('');
    const [shortdescTM, setshortdescTM] = useState('');
    const [shortdescRU, setshortdescRU] = useState('');
    const [descTM, setdescTM] = useState('');
    const [descRU, setdescRU] = useState('');
    const [instagram, setinstagram] = useState('');
    const [site, setsite] = useState('');
    const [location, setlocation] = useState('');
    const [address, setaddress] = useState('');
    const [workhours, setworkhours] = useState('');
    const [freetime, setfreetime] = useState('');
    const [isVIP, setisVIP] = useState(false);
    const [orderInList, setorderInList] = useState(0);
    const [status, setstatus] = useState(1);
    const [tmmusecard, settmmusecard] = useState(0);
    const [owncard, setowncard] = useState(0);
    const [category, setcategory] = useState(0);
    const [delivery, setdelivery] = useState(false);
    const [avaragecheck, setavaragecheck] = useState(0);
    const [kitchenTM, setkitchenTM] = useState('');
    const [kitchenRU, setkitchenRU] = useState('');
    const [cash, setcash] = useState(false);
    const [terminal, setterminal] = useState(false);
    const [required_promotion, setrequired_promotion] = useState(false);
    const [isActiveCard, setisActiveCard] = useState(false);
    const [insertedProfileId, setinsertedProfileId] = useState(0);
    const [insertedCategoryId, setinsertedCategoryId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [arrayOfTopSliderImages, setarrayOfTopSliderImages] = useState([]);
    const [arrayOfGalleryLargeImages, setarrayOfGalleryLargeImages] = useState([]);
    const [serverUrl, setServerUrl] = useState("http://10.192.168.16:5000/");
    const [phone_number, setPhone_number] = useState('');
    const [isAdd, setIsAdd] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [isCafe, setIsCafe] = useState(false);
    const [isMovie, setIsMovie] = useState(false);
    const [compressedSliders, setCompressedSliders] = useState([]);
    const [compressedGallery, setCompressedGallery] = useState([]);
    const [tagsTM, setTagsTM] = useState('');
    const [tagsRU, setTagsRU] = useState('');
    const [isWifi, setIsWifi] = useState(false);
    const [phoneNumberList, setphoneNumberList] = useState([""]);
    const [largeVrImage, setLargeVrImage] = useState('');
    const [smallVrImage, setSmallVrImage] = useState('');
    const [promoCount, setPromoCount] = useState(0);
    const [isCertificate, setisCertificate] = useState(false);
    const [movieTime, setMovieTime] = useState('');


    const phoneNumberUpdateById = (value, index) => {
        const newPhones = [
            ...phoneNumberList.slice(0, index),
            value,
            ...phoneNumberList.slice(index + 1)
        ];
        setphoneNumberList(newPhones);
    }



    const handleAdd = () => {
        setIsAdd(!isAdd);
    }

    const addPhoneNumber = () => {
        const newPhones = [
            ...phoneNumberList.slice(0, phoneNumberList.length),
            ""
        ];
        setphoneNumberList(newPhones);
    }

    useEffect(() => {
        setphoneNumberList(phoneNumberList);
    }, [phoneNumberList]);


    useEffect(() => {
        setCompressedSliders(compressedSliders);
    }, [compressedSliders])


    useEffect(() => {
        setCompressedGallery(compressedGallery);
    }, [compressedGallery])



    const head = {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer jfyewfhejkgkjwgeewj',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    };

    const getCategories =async()=>{
        await axiosInstanse.get("/get-categories", { head })
        .then(response => {
            setCategoryList(response.data.body);
        })
        .catch(ex => {
            console.log(ex);
        });
    }


    useEffect(()=>{
        getCategories();
    },[])


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


    const handleLargeVrImage = (event) => {
        setLargeVrImage(event.target.files[0]);
    }


    const handleSmallVrImage = (event) => {
        setSmallVrImage(event.target.files[0]);
    }

    // Slider add images

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

    const onFileUploadTopSliderImages = async () => {
        for (let i = 0; i < arrayOfTopSliderImages.length; i++) {

            let formData = new FormData();
            formData.append(`file`, arrayOfTopSliderImages[i], "ok.jpg");
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer jfyewfhejkgkjwgeewj',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                }
            };
            await axiosInstanse.post("/add-sliders?profile_id=" + insertedProfileId + "&index=" + i + 1, formData, config).then((data) => {
                console.log(data.data);
            })
                .catch(function (error) {
                    alert("Add slider large error: " + error.message);
                    setLoading(false);
                })
        }

        onSliderSmallImageUpload();

    };

    const onSliderSmallImageUpload = async () => {

        if (insertedProfileId == 0) {
            return;
        }
        for (let i = 0; i < compressedSliders.length; i++) {
            let formData = new FormData();
            formData.append(`file`, compressedSliders[i], "ok.jpg");
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
                }
            };
            await axiosInstanse.put("/update-sliders?profile_id=" + insertedProfileId, formData, config)
                .then((data) => {

                    setLoading(false)
                })
                .catch(function (error) {
                    alert("Add slider small error: " + error.message);
                    setLoading(false);
                })
        }

        addPhoneNumbers();

    };


    // End of slider image add  


    // Gallery images add

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


    const onFileUploadGalleryLargeImages = async () => {
        for (let i = 0; i < arrayOfGalleryLargeImages.length; i++) {

            let formData = new FormData();
            formData.append(`file`, arrayOfGalleryLargeImages[i], "ok.jpg");
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer jfyewfhejkgkjwgeewj',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                }
            };
            await axiosInstanse.post("/add-galleries?profile_id=" + insertedProfileId + "&index=" + i + 1, formData, config).then((data) => {
                console.log(data.data);
            })
                .catch(function (error) {
                    alert("Add gallery large error: " + error.message);
                    setLoading(false);
                })
        }

        onGallerySmallImageUpload();

    };

    const onGallerySmallImageUpload = async () => {

        if (insertedProfileId == 0) {
            return;
        }
        for (let i = 0; i < compressedGallery.length; i++) {
            let formData = new FormData();
            formData.append(`file`, compressedGallery[i], "ok.jpg");
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
                }
            };
            await axiosInstanse.put("/update-galleries?profile_id=" + insertedProfileId, formData, config)
                .then((data) => {

                })
                .catch(function (error) {
                    alert("Add gallery small error: " + error.message);
                    setLoading(false);
                })
        }

        if (smallVrImage != '' && largeVrImage != '') {
            uploadLargeVrImage();
        } 

    };

    // End of gallery image upload


    const addTags = async () => {

        if (insertedProfileId == 0)
            return;
        const tagsTmArray = tagsTM.split(',');
        const tagsRuArray = tagsRU.split(',');
        console.log(insertedProfileId);
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
            }
        };
        await axiosInstanse.post('/add-tags', {
            profile_id: insertedProfileId,
            category_id: category,
            tagTM: tagsTmArray,
            tagRU: tagsRuArray
        }, config).then(response => {
            if (!response.data.error) {
                onFileUploadGalleryLargeImages();
            }
        }).catch(err => {
            alert("Add tags error: " + err);
        });
    }


    const uploadLargeVrImage = async () => {
        if (largeVrImage != '') {
            let data = new FormData()
            data.append('file', largeVrImage, "ok.jpg")
            let url = "/add-vr-large-image?profile_id=" + insertedProfileId;
            const headers = {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar',
                'Content-Type': 'multipart/form-data'
            };
            await axiosInstanse.post(url, data, {
                headers
            })
                .then(res => { // then print response status
                    if (!res.data.error) {
                        uploadSmallVrImage();
                    }
                }).catch(ex => {
                    alert("Image upload error:" + ex);
                    setLoading(false);
                    setinsertedProfileId(0);
                })
        }
    }


    const uploadSmallVrImage = async () => {
        if (smallVrImage != '') {
            let data = new FormData()
            data.append('file', smallVrImage, "ok.jpg")
            let url = "/add-vr-small-image?profile_id=" + insertedProfileId;
            const headers = {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar',
                'Content-Type': 'multipart/form-data'
            };
            await axiosInstanse.put(url, data, {
                headers
            })
                .then(res => { // then print response status
                    if (!res.data.error) {
                        setLoading(false);
                    }
                }).catch(ex => {
                    alert("Image upload error:" + ex);
                    setLoading(false);
                    setinsertedProfileId(0);
                })
        }
    }


    const addPhoneNumbers = async () => {
        console.log(phoneNumberList);
        if (insertedProfileId == 0 || phoneNumberList[0]=='')
            return;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
            }
        };
        await axiosInstanse.post('/add-phone-number', {
            profile_id: insertedProfileId,
            phone_numbers: phoneNumberList
        }, config).then(response => {
            if (!response.data.error) {
                onFileUploadTopSliderImages();
            }
        }).catch(err => {
            alert("Add phone number error: " + err);
        });
    }


    const addOwnPromotion = async () => {
        if (insertedProfileId == 0 || owncard == '' || owncard == 0)
            return;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
            }
        };
        await axiosInstanse.post('/add-own-promotion', {
            profile_id: insertedProfileId,
            promotion_status: owncard
        }, config).then(response => {
            if (!response.data.error) {
                addTags();
            }
        }).catch(err => {
            alert("Add phone number error: " + err);
        });
    }


    const addProfile = async () => {
        let tempSite=site;
        if(category == 2){
            tempSite=movieTime;
        }
        let vip = 0;
        let isPromo = false;
        if (isVIP) {
            vip = 1;
        }

        if (promoCount != '') {
            if (promoCount > 0) {
                isPromo = true;
            }
        }

        if (owncard === '') {
            setowncard(0);
            setisActiveCard(false);
        } else if (owncard == 0) {
            setisActiveCard(false);
        }
        else {
            setisActiveCard(true);
        }

        setLoading(true);
        await fetch('http://10.192.168.16:5000/add-profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer jfyewfhejkgkjwgeewj'
            },
            body: JSON.stringify({
                nameTM: nameTM,
                short_descTM: shortdescTM,
                nameRU: nameRU,
                short_descRU: shortdescRU,
                like: 0,
                dislike: 0,
                instagram: instagram,
                site: tempSite,
                location: location,
                address: address,
                is_cash: cash,
                is_terminal: terminal,
                work_hours: workhours,
                delivery: delivery,
                cousineTM: kitchenTM,
                cousineRU: kitchenRU,
                average_check: avaragecheck,
                is_active_card: isActiveCard,
                tm_muse_card: tmmusecard,
                is_certificate: isCertificate,
                is_promo: isPromo,
                status: status,
                is_VIP: vip,
                WiFi: isWifi,
                category_id: category,
                view_count: 0,
                promo_count: promoCount,
                descriptionTM: descTM,
                descriptionRU: descRU,
                order_in_list: orderInList,
                free_time: freetime,
                required_promotion: required_promotion,
                cinema_id: 0
            })
        })
            .then(response => response.json())
            .then(data => {
                setinsertedProfileId(data.body.profile_id);
                setinsertedCategoryId(data.body.category_id)
            })
            .catch(err => {
                setLoading(false);
                alert("Add profile error: " + err);
            })
    }


    useEffect(() => {
        if (isAdd) {
            addProfile();
        }
    }, [isAdd]);

    useEffect(() => {
        if (insertedProfileId == 0)
            return;
        if (owncard != '') {
            addOwnPromotion();
        } else {
            onFileUploadTopSliderImages();
        }

    }, [insertedProfileId]);

    return (
        <div>
            <button variant="primary" onClick={() => setShow(true)}>+ Add profile</button>
            <Modal
                className='modal'
                show={show}
                fullscreen={true}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <p className='addProfileTitle'>Add profile</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <form method="post" enctype="multipart/form-data"> */}
                    <Row>
                        <Col lg={6} md={12} sm={12} xs={12}>
                            <Row className='leftinputItem'>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Name TM:</p>
                                        <input className='inputModal' value={nameTM} onInput={e => setNameTM(e.target.value)} type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Name RU:</p>
                                        <input className='inputModal' value={nameRU} onInput={e => setNameRU(e.target.value)} type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Short description TM:</p>
                                        <input value={shortdescTM} onInput={e => setshortdescTM(e.target.value)} className='inputModal' type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Short description RU:</p>
                                        <input value={shortdescRU} onInput={e => setshortdescRU(e.target.value)} className='inputModal' type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Description TM:</p>
                                        <textarea value={descTM} onInput={e => setdescTM(e.target.value)} name="" id="" cols="20" rows="4"></textarea>
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Description RU:</p>
                                        <textarea value={descRU} onInput={e => setdescRU(e.target.value)} name="" id="" cols="20" rows="4"></textarea>
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Instagram(only username):</p>
                                        <input value={instagram} onInput={e => setinstagram(e.target.value)} className='inputModal' type="text" />
                                    </Stack>
                                </Col>
                                {
                                    isMovie == true ?
                                        <Row className="addMovie">
                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Movie time:
                                                        <pre>9.1.2022(13:00,22:30)*
                                                            <br />11.1.2022-12.1.2022(14:00,22:30)*</pre></p>
                                                    <textarea name="" id="movie" cols="51.9" rows="5" onInput={e => setMovieTime(e.target.value)}></textarea>
                                                </Stack>
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Site URl:</p>
                                                    <input value={site} onInput={e => setsite(e.target.value)} className='inputModal' type="text" />
                                                </Stack>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Location...</p>
                                                    <input value={location} onInput={e => setlocation(e.target.value)} className='inputModal' type="text" />
                                                </Stack>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Address:</p>
                                                    <input value={address} onInput={e => setaddress(e.target.value)} className='inputModal' type="text" />
                                                </Stack>
                                            </Col>

                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Work hours(09:00-18:00):</p>
                                                    <input value={workhours} onInput={e => setworkhours(e.target.value)} className='inputModal' type="text" />
                                                </Stack>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Free time(13:00-14:00):</p>
                                                    <input value={freetime} onInput={e => setfreetime(e.target.value)} className='inputModal' type="text" />
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
                                        <input type="checkbox" style={{ marginTop: '5px' }} onInput={e => setisVIP(e.target.checked)} />
                                        <p className='inputTitle'>Is VIP?</p>
                                    </Stack>
                                </Col>
                                <Col lg={2.5} md={3} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Order in list:</p>
                                        <input value={orderInList} onInput={e => setorderInList(e.target.value)} type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={2.5} md={3} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Status:</p>
                                        <select style={{ height: '30px' }} onChange={e => setstatus(e.target.value)} name="" id="">
                                            <option value="0">Status</option>
                                            <option value="1">Active</option>
                                            <option value="2">Passive</option>
                                        </select>
                                    </Stack>
                                </Col>
                                <Col lg={2.5} md={3} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>TmMuse Card:</p>
                                        <input value={tmmusecard} onInput={e => settmmusecard(e.target.value)} type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={2.5} md={3} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Own Card:</p>
                                        <input value={owncard} onInput={e => setowncard(e.target.value)} type="text" />
                                    </Stack>
                                </Col>
                                <Col lg={4} md={12} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Category:</p>
                                        <select onChange={e => setcategory(e.target.value)} style={{ height: '30px' }} name="" id="category" className="normalSize" >
                                            <option value="0">Select category</option>
                                            {
                                                categoryList.map((element, i) => {
                                                    return (
                                                        <option value={element.id}>{element.name}</option>
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
                                                    <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setdelivery(e.target.checked)} />
                                                    <p className='inputTitle'>Delivery:</p>
                                                </Stack>
                                            </Col>
                                            <Col lg={3} md={3} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Avarage check:</p>
                                                    <input value={avaragecheck} onInput={e => setavaragecheck(e.target.value)} type="text" />
                                                </Stack>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Kitchen TM:</p>
                                                    <input value={kitchenTM} onInput={e => setkitchenTM(e.target.value)} id='kitchenTmInput' type="text" />
                                                </Stack>
                                            </Col>
                                            <Col lg={3} md={3} sm={12} xs={12}>
                                                <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                    <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setcash(e.target.checked)} />
                                                    <p className='inputTitle'>Cash:</p>
                                                </Stack>
                                            </Col>
                                            <Col lg={3} md={3} sm={12} xs={12}>
                                                <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                    <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setterminal(e.target.checked)} />
                                                    <p className='inputTitle'>Terminal:</p>
                                                </Stack>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Stack direction='column' spacing={0}>
                                                    <p className='inputTitle'>Kitchen RU:</p>
                                                    <input value={kitchenRU} onInput={e => setkitchenRU(e.target.value)} id='kitchenTmInput' type="text" />
                                                </Stack>
                                            </Col>
                                            <Col lg={3} md={3} sm={12} xs={12}>
                                                <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                                    <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setIsWifi(e.target.checked)} />
                                                    <p className='inputTitle'>Wifi:</p>
                                                </Stack>
                                            </Col>
                                        </Row>
                                        :
                                        <p></p>
                                }


                                {/* Add phone number is starting here */}
                                <Row className="AddPhoneNumber">
                                    {
                                        phoneNumberList.map((element, i) => {
                                            return (
                                                <Col lg={4} md={12} sm={12} xs={12}>
                                                    <Stack direction='column' spacing={0}>
                                                        <p className='inputTitle'>Phone number {i + 1}:</p>
                                                        <input type="text" value={element.phoneNumber} onInput={e => phoneNumberUpdateById(e.target.value, i)} className='normalSize' />
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
                                        <input type="text" onChange={e => setTagsTM(e.target.value)} />
                                    </Stack>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12} className='fullSizeInput'>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Tags RU:</p>
                                        <input type="text" onChange={e => setTagsRU(e.target.value)} />
                                    </Stack>
                                </Col>
                                <Col lg={3} md={3} sm={12} xs={12}>
                                    <Stack direction='column' spacing={0}>
                                        <p className='inputTitle'>Promo count:</p>
                                        <input type="number" value={promoCount} onInput={e => setPromoCount(e.target.value)} />
                                    </Stack>
                                </Col>
                                <Col lg={3} md={3} sm={12} xs={12}>
                                    <Stack direction='row' spacing={-5} marginTop={3} marginLeft={-5}>
                                        <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setisCertificate(e.target.checked)} checked={isCertificate} />
                                        <p className='inputTitle'>Certificat</p>
                                    </Stack>
                                </Col>
                                <Col id='RequiredPromotion' lg={4} md={4} sm={4} xs={4}>
                                    <Stack direction='row' spacing={0} marginTop={3} marginLeft={-5}>
                                        <input type="checkbox" style={{ marginTop: '5px' }} onChange={e => setrequired_promotion(e.target.checked)} />
                                        <p className='inputTitle' style={{ marginLeft: '-29px' }}>Required promotion</p>
                                    </Stack>
                                </Col>
                                <Col lg={9} md={9} sm={12} xs={12}></Col>
                                <Col className='fullSizeInput' lg={3} md={3} sm={12} xs={12}><button onClick={handleAdd}>Add</button></Col>


                            </Row>
                        </Col>
                    </Row>
                    {/* </form> */}
                </Modal.Body>
            </Modal >


            <Modal show={loading}
                backdrop="static"
                keyboard={false}
                centered>

                <Modal.Body>
                    <Player
                        autoplay
                        loop
                        src="images/ios_loading.json"
                        style={{ height: '50px', width: '50px' }}
                    >
                    </Player>
                    <label>Please wait...</label>
                </Modal.Body>

            </Modal>

        </div >
    )
}

export default ProfileModal
