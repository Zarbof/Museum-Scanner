import React, { Component } from 'react'
import QRScan from 'qrscan'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Nav, Container, Navbar } from 'react-bootstrap'

class App extends Component {
    // handleClick = () => {
    //     console.log('clicked');
    // }
    // handleClick = (e) => {
    //     e.preventDefault();
    //     console.log('The link was clicked.');
    //   };
    handleClick() {
        window.location.assign('http://lelooska.pugetsound.edu/');
    }
    render() {
        return (
            <button onClick = {this.handleClick.bind(this)} Click me/>
          );
          
        
    }
}

export default App;
