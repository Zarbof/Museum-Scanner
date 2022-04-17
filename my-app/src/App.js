import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Container, Navbar, InputGroup, FormControl } from 'react-bootstrap'
import { ReactSession } from 'react-client-session';


import ArtifactHomeApp from './components/ArtifactHomeApp';
import PlantBookApp from './components/PlantBookApp';
import ScavengerHuntApp from './components/ScavengerHuntApp';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

    function App() {
        const plantType = 'flowers'
        ReactSession.setStoreType("localStorage");
        ReactSession.set("username", "TestUsername");

        //if(ReactSession.get("token") == "dogs") {
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
                                    <Nav.link href="scavengerhunt">Scavenger Hunt</Nav.link>
                                    <Nav.link href="http://lelooska.org">Lelooska Foundation main website</Nav.link>
                                    <Nav.link href="http://lelooska.org/donate/"> Donate</Nav.link>
                                    <Nav.Link href="http://lelooska.pugetsound.edu/phpApp/museumLogin.php">Admin Login</Nav.Link>
                                </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    <Routes>
                        <Route path="home" element={<ArtifactHomeApp />} />
                        <Route path="plantbook" element={<PlantBookApp plantType={plantType} />} />
                        <Route path="scavengerhunt" element={<ScavengerHuntApp/>} />
                    </Routes>
                    </BrowserRouter>
                </div>
            );
        //}
        /*
        return (
        <div className="wrapper">
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Token</InputGroup.Text>
                <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </div>
        );
        */
    }
    

export default App;
