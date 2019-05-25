import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SubmitReceipt from './components/SubmitReceipt';
import FormContainer from './components/containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
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
        <SubmitReceipt/>
        <FormContainer name="register" fields={["name", "email", "password"]} postUrl="http://localhost:5000/api/user/register"/>

        <FormContainer name="login" fields={["email", "password"]} postUrl="http://localhost:5000/api/user/login"/>
      </div>
    );
  }
}

export default App;
