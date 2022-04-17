import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Container, Navbar } from 'react-bootstrap'
import { ReactSession } from 'react-client-session';


import ArtifactHomeApp from './components/ArtifactHomeApp';
import PlantBookApp from './components/PlantBookApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

    function App() {
        const plantType = 'flowers'
        ReactSession.setStoreType("localStorage");
        ReactSession.set("username", "TestUsername");

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
                            <Nav.Link href="home">home</Nav.Link>
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
            </Routes>
            </BrowserRouter>
        </div>
        );
    }
export default App;