import React, { Component } from 'react'
import QRScan from 'qrscan'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Nav, Container, Navbar } from 'react-bootstrap'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { value: '', watching: false }
        this.onFind = this.onFind.bind(this)
    }

    onFind(value) {
        this.setState({ value, watching: false })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button>Click me bitch</button>

                </header>
            </div>
        )
    }
}

export default App;
