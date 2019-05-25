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
        <FormContainer name="register" fields={["name", "email", "password"]} postUrl="http://localhost:5000/api/user/register" handleResponse={(data) => console.log(JSON.stringify(data))}/>
        <FormContainer 
          name="login" 
          fields={["email", "password"]} 
          postUrl="http://localhost:5000/api/user/login" 
          handleResponse={(data) => {
            console.log("here");
            console.log(JSON.stringify(data))
            //TODO: explore the security implementations of this
            localStorage.setItem('token', data.auth_token);
          }
            }
        />
        
        <FormContainer 
          name="create group" 
          fields={["group_name"]} 
          postUrl="http://localhost:5000/api/group"
          handleResponse={(data) => {
            console.log(JSON.stringify(data))
            if(!data.successful){
              alert(data.message)
            }
          }
          }
        />
      </div>
    );
  }
}

export default App;
