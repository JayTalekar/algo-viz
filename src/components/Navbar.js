import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Logo from "../images/dsa_logo.jpg"
function Navbarr() {
  return (
    <>
<Navbar bg="dark" variant="dark" sticky="top">
    <Container>
      <Navbar.Brand href="/" style={{margin:"auto 0",fontSize:"27PX"}}>
        <img
          alt=""
          src={Logo}
          width="40"
          height="40"
          className="d-inline-block align-top"
        />{' '}
      Algo-Viz
      </Navbar.Brand>
    </Container>
  </Navbar>
</>
  )
}

export default Navbarr