import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Container, Navbar, InputGroup, FormControl, Button, Card } from 'react-bootstrap'
import { ReactSession } from 'react-client-session';

import ArtifactHomeApp from './components/ArtifactHomeApp';
import PlantBookApp from './components/PlantBookApp'
import AccessDataBase from './components/AccessDataBase'; 

import { BrowserRouter, Route, Routes } from 'react-router-dom';

    function App() {
        const plantType = 'plant1';
        const token = '';
        ReactSession.setStoreType("localStorage");
        ReactSession.set("token", token);

        function handleClick() {
            window.location.assign('https://google.com');
        }

        if(ReactSession.get("token") == "dogs") {
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

                                    <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
                                </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    <Routes>
                        <Route path="home" element={<ArtifactHomeApp />} />
                        <Route path="plantbook" element={<PlantBookApp plantType={plantType} />} />
                        <Route path="db" element={<AccessDataBase />} />
        
                    </Routes>
                    </BrowserRouter>
                </div>
                );
        }
        return (
            <div className="wrapper mt-6" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Card className="mt-6">
                    <Card.Body>
                        <Card.Title>Please enter the access token.</Card.Title>
                        <Card.Text>
                        <InputGroup className="mb-3 mt-2">
                    <InputGroup.Text id="basic-addon1">Token</InputGroup.Text>
                        <FormControl
                            placeholder="Access Token"
                            aria-label="Access Token"
                            aria-describedby="basic-addon1"
                        />
                        <Button type="text" onClick={handleClick}>Submit</Button>
                    </InputGroup>
                        </Card.Text>
                    </Card.Body>

                </Card>
                
            </div>
        );
    }

export default App;
            
    
