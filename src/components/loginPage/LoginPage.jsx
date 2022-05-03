import { React, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css'





const LoginPage = () => {
    const history = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userToken,setCookie] =useCookies(['userToken','userType']);
    const signIn = () => {
        var username=document.getElementById("username");
        var password=document.getElementById("password");
        if(username.value=="" || password.value==""){
            alert("Enter full information!");
            return;
        }
        handleShow()
        fetch('http://95.85.125.22:5000/sign-in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12213'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            handleClose()
            if(data.error==true){
                alert("Username or password is wrong!");
            } else{
                if(data.body!=null && !data.error){
                    if(data.body.token!==""){
                        console.log("login data",data.body)
                        localStorage.setItem("TmMuseProfile",JSON.stringify(data.body));
                        localStorage.setItem("tkn",data.body.token);
                        window.location.href="/";
                    }
                } else {
                    alert("Username or password is wrong!");
                }
            }
        });
        
      }
    return (
        <CookiesProvider>
            <Container fluid>
                <Row>
                    <Col lg={6} md={6} sm={6} xs={12} className='leftContainer'>

                        <center>
                            <Row className='logoContainer'>
                                <Col lg={1} md={1} sm={1} xs={1}></Col>
                                <Col lg={3} md={3} sm={3} xs={3}>
                                    <img src='images/login_logo.svg' alt='#' className='loginLogo'/>
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={4} className='appNameContainer'>
                                    <Row>
                                        <Col lg={12} xs={12}>
                                            <h2>TmMuse</h2>
                                        </Col>
                                        <Col lg={12} xs={12}>
                                            <p>Save your time!</p>
                                        </Col>
                                    </Row>
                                 </Col>
                                <Col lg={4} md={4} sm={4} xs={4}></Col>
                            </Row>
                            <Row>
                                <Col lg={1} md={1} sm={1} xs={1}></Col>
                                <Col lg={7} md={7} sm={7} xs={7}>
                                    <p className='description'>TmMuse - is a portal for provision of information services in the field of culture, entertainment and leisure.</p>
                                </Col> 
                                <Col lg={4} md={4} sm={4} xs={4}></Col>
                            </Row>  

                        </center>
                    
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12} className='rightContainer'>
                        <center>
                            <Row>
                                <Col lg={2} md={2} sm={2} xs={2}></Col>
                                <Col lg={8} md={8} sm={8} xs={8} className='rightItems'>
                                    <img src='images/loginIcon.svg' alt='#' />
                                </Col>
                                <Col lg={2} md={2} sm={2} xs={2}></Col>
                            </Row>
                            <Row>
                            <Col lg={2} md={2} sm={2} xs={2}></Col>
                                <Col lg={8} md={8} sm={8} xs={8} className='rightItems'>
                                   <p  onKeyDown={() => signIn()}>TmMuse Admin</p>
                                </Col>
                                <Col lg={2} md={2} sm={2} xs={2}></Col>
                            </Row>
                            <Row >
                            <Col lg={2} md={2} sm={2} xs={2}></Col>
                                <Col lg={8} md={8} sm={8} xs={8} className='usernameInput'>
                                   <input  onKeyDown={() => signIn()} placeholder='Username' id='username' required></input>
                                </Col>
                                <Col lg={2} md={2} sm={2} xs={2}></Col>
                            </Row>
                            <Row>
                            <Col lg={2} md={2} sm={2} xs={2}></Col>
                                <Col lg={8} md={8} sm={8} xs={8} className='passwordInput'>
                                   <input type='password' id='password' placeholder='Password' required></input>
                                </Col>
                                <Col lg={2} md={2} sm={2} xs={2}></Col>
                            </Row>
                            <Row>
                            <Col lg={2} md={2} sm={2} xs={2}></Col>
                                <Col lg={8} md={8} sm={8} xs={8} className='loginButton'>
                                    <button onClick={signIn}>Login</button>
                                
                                </Col>
                                <Col lg={2} md={2} sm={2} xs={2}></Col>
                            </Row>
                        </center>
                    </Col>
                </Row>
            </Container>


            <Modal show={show}
                onHide={handleClose}
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
                </Modal.Body>
            
            </Modal>
        </CookiesProvider>
    )
}

export default LoginPage
