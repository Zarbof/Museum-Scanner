import React, { Component, useState, useEffect } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Nav, Container, Navbar, InputGroup, FormControl, Button, Card, Row } from 'react-bootstrap'
import { ReactSession } from 'react-client-session';
import $ from "jquery";

import ArtifactHomeApp from './components/ArtifactHomeApp';
import PlantBookApp from './components/PlantBookApp'
import AccessDataBase from './components/AccessDataBase'; 
import GrabToken from './components/AccessDataBase'; 

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cookies from 'universal-cookie';

    function App() {
        // const [userToken, setUserToken] = useState("");
        // const [dailyDBToken, setDailyDBToken] = useState("");
        document.body.style = 'background: #343d46;';

        // ReactSession.setStoreType("localStorage");
        const cookies = new Cookies();
        cookies.set('loggedIn', False);

        const plantType = 'plant1';

        // function onFormSubmitSuccess(e) {
        //     e.preventDefault();

        //   $.ajax({
        //     url: 'http://lelooska.pugetsound.edu/phpApp/getAccessCode.php',
        //     type: "GET",
        //     success: function(data) {
        //       console.log('success')
        //       const myObject = JSON.parse(data);
        //       const dailyToken = JSON.stringify(myObject.tokenValue);
        //       const dailyTokenString = dailyToken.replaceAll('"', '');

        //       const userTokenString = {userToken}.userToken;

        //       if(dailyTokenString === userTokenString) {
        //         ReactSession.set("token", dailyTokenString);
        //         setDailyDBToken(dailyTokenString);
        //       } 
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //       console.log('error')
        //     }.bind(this)
        //   });
        // };

        // function handleChange(e) {
        //     setUserToken(e.target.value);
        //     cookies.set('token', e.target.value, { path: '/' });
        // }     

        // if(ReactSession.get("token") || cookies.get('token') === {dailyDBToken}.dailyDBToken) {
        //     return (
        //         <div className="wrapper">
        //             <BrowserRouter>
        //                 <Navbar bg="light" expand="lg">
        //                     <Container>
        //                         <Navbar.Brand href="#home">Lelooska</Navbar.Brand>
        //                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //                         <Navbar.Collapse id="basic-navbar-nav">
        //                         <Nav className="me-auto">
        //                             <Nav.Link href="plantbook">Plant Book</Nav.Link>
        //                             <Nav.Link href="db">Database Test</Nav.Link>
        //                             <Nav.Link href="dbToken">Token Test</Nav.Link>


        //                             <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
        //                         </Nav>
        //                         </Navbar.Collapse>
        //                     </Container>
        //                 </Navbar>
        //             <Routes>
        //                 <Route path="home" element={<ArtifactHomeApp />} />
        //                 <Route path="plantbook" element={<PlantBookApp plantType={plantType} />} />
        //                 <Route path="db" element={<AccessDataBase />} />
        //                 <Route path="dbToken" element={<GrabToken />} />

        
        //             </Routes>
        //             </BrowserRouter>
        //         </div>
        //         );
        // }
        // return (
        //     <div className="wrapper" style={{
        //         display: 'flex',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //     }}>
        //        <Container>
        //             <Row>
        //                 {/* <Navbar bg="light" expand="lg">
        //                     <Container>
        //                         <Navbar.Brand >Lelooska</Navbar.Brand>
        //                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //                         <Navbar.Collapse id="basic-navbar-nav">
        //                             <Nav className="me-auto">
        //                                 <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
        //                                 <Nav.Link href="http://lelooska.org/">Lelooska Foundation Website</Nav.Link>
        //                             </Nav>
        //                         </Navbar.Collapse>
        //                     </Container>
        //                 </Navbar> */}
        //             </Row>
        //             <Row className = "align-items-center">
        //                 <Card >
        //                     <Card.Body>
        //                         <Card.Title>Please enter the access token.</Card.Title>
        //                         <Card.Text>
        //                             <InputGroup className="mb-3">
        //                                 <InputGroup.Text id="basic-addon1">Token</InputGroup.Text>
        //                                 <FormControl
        //                                     onChange={handleChange}
        //                                     placeholder="Access Token"
        //                                     aria-label="Access Token"
        //                                     aria-describedby="basic-addon1"
        //                                 />
        //                                 <Button type="text" onClick={onFormSubmitSuccess}>Submit</Button>
        //                             </InputGroup>
        //                         </Card.Text>
        //                     </Card.Body>

        //                 </Card>
        //             </Row>
        //         </Container>

                
        //     </div>
        // );

        useEffect(() => {
            console.log("useEffect test");

            $.ajax({
                url: 'http://lelooska.pugetsound.edu/phpApp/getAccessCode.php',
                type: "GET",
                success: function(data) {
                  console.log("This is the users token: " + cookies.get('loggedIn'));

                  console.log('Succes: Retrieved information from ')
                  const myObject = JSON.parse(data);
                  const dailyToken = JSON.stringify(myObject.tokenValue);
                  const dailyTokenString = dailyToken.replaceAll('"', '');
                  console.log("The string token: " + dailyTokenString);

                //   const userTokenString = {userToken}.userToken;
    
                //   if(dailyTokenString === userTokenString) {
                //     ReactSession.set("token", dailyTokenString);
                //     setDailyDBToken(dailyTokenString);
                //   } 
                }.bind(this),
                error: function(xhr, status, err) {
                  console.log('error')
                }.bind(this)
              });
        });

        // with no access token
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <Navbar expand="lg" variant="dark">
                        <Container>
                            <Navbar.Brand href="home">Lelooska</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="plantbook">Plant Book</Nav.Link>
                                {/* <Nav.Link href="db">Database Test</Nav.Link>
                                <Nav.Link href="dbToken">Token Test</Nav.Link> */}
                                <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
                                <Nav.Link href="http://lelooska.org">Lelooska Foundation</Nav.Link>
                                <Nav.Link href="http://lelooska.org/donate">Donate!</Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                <Routes>
                    <Route path="home" element={<ArtifactHomeApp />} />
                    <Route path="plantbook" element={<PlantBookApp plantType={plantType} />} />
                    <Route path="db" element={<AccessDataBase />} />
                    <Route path="dbToken" element={<GrabToken />} />
                </Routes>
                </BrowserRouter>
            </div>
            );
    }

export default App;
            
    
