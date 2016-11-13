import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class NameForm extends React.Component {
  constructor() {
    super();
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(/*event*/) {
    super.state.value = this.state.value;
    //event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value}/>
        <input type="submit" value="OK"/>
      </form>
    );
  }
}

class Name extends Component {
  constructor() {
    super();
    this.state = {
      value: "Uninitialized. Register: "
    };
  }
  render() {
    if (localStorage.ethname) {
      this.state.value = localStorage.ethname;
      return(
        <div>
        <h1>{this.state.value}</h1>
        </div>
      );
    }
    else {
      return(
        <div>
        <p>{this.state.value}</p>
        <NameForm/>
        </div>
      );
    }
   }
}

class App extends Component {
  render() {
    <Name/>
  }
};

export default App;