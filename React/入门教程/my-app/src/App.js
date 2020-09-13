import React from 'react';
import User from './component/User';
import Clock from './component/Clock';
import LoggingButton from './component/LoggingButton';
import LoginControl from './component/LoginControl';
import List from './component/List';
import NameForm from './component/NameForm';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <User />
        <Clock />
        <LoggingButton />
        <LoginControl />
        <List numbers = {[1, 2, 3, 4, 5]}/>
        <NameForm />
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
    </div>
  );
}

export default App;
