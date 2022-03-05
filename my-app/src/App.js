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
            <React.Fragment>
                <h1>QRScan Demo</h1>
                {this.state.watching
                    ? (
                        <QRScan onFind={this.onFind} />
                    )
                    : (
                        <React.Fragment>
                            <button onClick={() => this.setState({ watching: true })}>Scan</button>
                            <h4>value: {this.state.value}</h4>
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        )
    }
}

export default App;
