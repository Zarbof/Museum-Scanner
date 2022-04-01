import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Nav, Container, Navbar } from 'react-bootstrap'

import ArtifactBody from './components/ArtifactBody';
import ArtifactHistory from './components/ArtifactHistory';
import PlantBook from './components/PlantBook'

import { BrowserRouter, Route, Routes } from 'react-router-dom';


// class App extends Component {
//     // handleClick = () => {
//     //     console.log('clicked');
//     // }
//     // handleClick = (e) => {
//     //     e.preventDefault();
//     //     console.log('The link was clicked.');
//     //   };
//     handleClick() {
//         window.location.assign('http://lelooska.pugetsound.edu/phpApp/museumLogin.php');
//     }
//     render() {
//         return (
//             <Button onClick = {this.handleClick.bind(this)}>CLick me</Button>
//           );
          
        
//     }
// }
    function App() {
        return (
        <div className="wrapper">
            <h1>Application</h1>
            <BrowserRouter>
            <Routes>
                <Route path="home" element={<ArtifactBody />} />

            </Routes>
            </BrowserRouter>
        </div>
        );
    }

export default App;
