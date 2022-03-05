import React, { Component } from 'react'
import QRScan from 'qrscan'

<<<<<<< HEAD
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Edit <code>src/App.js</code> I WISH THERE WOULD BE A THUNDERSTORM!!!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
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
>>>>>>> 582c9310ff20f4fd35d9314c55874bf5809a3b43
}

export default App;
