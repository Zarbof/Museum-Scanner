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
        window.location.assign('http://google.com');
    }
    render() {
        return (
            <button onClick = {this.handleClick.bind(this)} />
          );
          
        
    }
}

export default App;
