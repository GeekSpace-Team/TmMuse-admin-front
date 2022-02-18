import React, { useState } from "react";
import "./Navbar.css";
import { Col, Row, Stack } from 'react-bootstrap';
import { FiSearch, FiLogOut, FiBell, FiUser } from "react-icons/fi";
import { NavLink } from 'react-router-dom';


const Navbar = () => {

  return (
    <div className="header">
      <Row>
        <Col lg={7} md={6} sm={12} xs={12}>
          <Stack direction='horizontal' gap={4}>

            <Stack direction='horizontal' className="searchBar">
              <FiSearch />
              <input placeholder="Search..." type='text' autoFocus />
            </Stack>
              <FiLogOut className="ms-auto" />
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
