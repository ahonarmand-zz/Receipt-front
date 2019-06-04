import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SubmitReceipt from './components/SubmitReceipt';
import FormContainer from './components/containers/FormContainer';
import Header from './components/components/Header'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import { Home, Login, Profile, Register, Settings, Groups } from './components/containers/Pages'



function NavLinks() {
  return(
      <div className="links">
          <Link to="/" className="link">Home</Link>
          <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link>
          <Link to="/settings" className="link">Settings</Link>
          <Link to="/profile" className="link">Profile</Link>
          <Link to="/groups" className="link">Groups</Link>
      </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router> 
        {/* Router component expects only one child */}
        <div className="App">
        {/* <Header appName='receipt'/> */}
          <NavLinks/>
          <Switch>
            <Route exact path="/" component={ Home }/>
            <Route path="/login" component={ Login }/>
            <Route path="/register" component={ Register }/>
            <Route path="/settings" component={ Settings }/>
            <Route path="/profile" component={ Profile }/>
            <Route path="/groups" component={ Groups }/>
            <Route render={ () => <h1>404 Error</h1> } />
          </Switch>

        <SubmitReceipt/>
      </div>
      </Router>
      
    );
  }
}

export default App;
