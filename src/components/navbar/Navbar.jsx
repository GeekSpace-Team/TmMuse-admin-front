import React, { useState } from "react";
import "./Navbar.css";
import { Col, Row, Stack } from 'react-bootstrap';
import { FiSearch, FiLogOut, FiBell, FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  if(localStorage.getItem("tkn")==null || typeof localStorage.getItem("tkn")==='undefined' || localStorage.getItem("tkn")==''){
    window.location.href="/login";
  }
  const logout=()=>{
    localStorage.setItem("tkn","");
    localStorage.setItem("TmMuseProfile","");
    window.location.href="/login";
  }
  return (
    <div className="header">
      <Row>
        <Col lg={7} md={6} sm={12} xs={12}>
          <Stack direction='horizontal' gap={4}>

            
           
              <FiLogOut className="ms-auto" onClick={logout}/>
            <FiBell />

            <div className="userIcon">
              <center>
                <FiUser />
              </center>
            </div>
          </Stack>
        </Col>
        <Col lg={5} md={6} sm={0} xs={0}>
          <Stack className="userInfo">
            <p>Jemal</p>
            <p>admin panel</p>
          </Stack>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
