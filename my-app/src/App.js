import React, { Component } from 'react'
import QRScan from 'qrscan'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Nav, Container, Navbar } from 'react-bootstrap'

class App extends Component {
    // handleClick = () => {
    //     console.log('clicked');
    // }
    handleClick = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
      };
       
    render() {
        return (
            <a href="wwww.google.com" onClick={this.handleClick}>
              Click me
            </a>
          );
          
        
    }
}

export default App;
