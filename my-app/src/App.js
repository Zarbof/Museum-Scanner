import React, { Component, useState } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Nav, Container, Navbar, InputGroup, FormControl, Button, Card } from 'react-bootstrap'
import { ReactSession } from 'react-client-session';
import $ from "jquery";


import ArtifactHomeApp from './components/ArtifactHomeApp';
import PlantBookApp from './components/PlantBookApp'
import AccessDataBase from './components/AccessDataBase'; 
import GrabToken from './components/AccessDataBase'; 

import { BrowserRouter, Route, Routes } from 'react-router-dom';

    function App() {
        const [userToken, setUserToken] = useState("");
        const [dailyDBToken, setDailyDBToken] = useState("");

        ReactSession.setStoreType("localStorage");

        const plantType = 'plant1';

        function onFormSubmitSuccess(e) {
            e.preventDefault();

          $.ajax({
            url: 'http://lelooska.pugetsound.edu/phpApp/getAccessCode.php',
            type: "GET",
            success: function(data) {
              console.log('success')
              const myObject = JSON.parse(data);
              const dailyToken = JSON.stringify(myObject.tokenValue);
              const dailyTokenString = dailyToken.replaceAll('"', '');

              const userTokenString = {userToken}.userToken;

              if(dailyTokenString === userTokenString) {
                ReactSession.set("token", dailyTokenString);
                setDailyDBToken(dailyTokenString);
              } else {
              }
            }.bind(this),
            error: function(xhr, status, err) {
              console.log('error')
            }.bind(this)
          });
        };

        function handleChange(e) {
            setUserToken(e.target.value);

        }

        if(ReactSession.get("token") === {dailyDBToken}.dailyDBToken) {
            return (
                <div className="wrapper">
                    <BrowserRouter>
                        <Navbar bg="light" expand="lg">
                            <Container>
                                <Navbar.Brand href="#home">Lelooska</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="plantbook">Plant Book</Nav.Link>
                                    <Nav.Link href="db">Database Test</Nav.Link>
                                    <Nav.Link href="dbToken">Token Test</Nav.Link>


                                    <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
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
        return (
            <div className="wrapper" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand >Lelooska</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
                            <Nav.Link href="http://lelooska.org/">Lelooska Foundation Website</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Card >
                    <Card.Body>
                        <Card.Title>Please enter the access token.</Card.Title>
                        <Card.Text>
                        <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Token</InputGroup.Text>
                        <FormControl
                            onChange={ handleChange }
                            placeholder="Access Token"
                            aria-label="Access Token"
                            aria-describedby="basic-addon1"
                        />
                        <Button type="text" onClick={onFormSubmitSuccess}>Submit</Button>
                    </InputGroup>
                        </Card.Text>
                    </Card.Body>

                </Card>
                
            </div>
        );
    }

export default App;
            
    
