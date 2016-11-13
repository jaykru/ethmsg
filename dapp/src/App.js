import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import Web3 from 'web3';
import './App.css';

let McMenu = React.createClass({

  getInitialState() {
    return {hidden : false};
  },

    show() {
    this.setState({hidden : false});
  },

  render() {
    let style;

    if (this.state.hidden) {
      style = {display: 'none'};
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
});


class Login extends React.Component {
  constructor() {
    super();
    this.state = {field:'',name: '', loggedin:false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({field: event.target.value,name:event.target.value,loggedin:false});
  }

  handleSubmit(event) {
    this.setState({field: '',name: this.state.field, loggedin: true});
    event.preventDefault();
  }

  render() {
    if(!this.state.loggedin) {
         return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.field} onChange={this.handleChange}/>
          <p>Name: {this.state.name}</p>
          <input type="submit" value="OK"/>
        </form>
        </div>
      );
    }
    else {
       return (
        <div>
        <p>{this.state.name}</p>
        </div>
      );

       }
  }
}

class App extends Component {
  getMenu() {
    const Menu = BurgerMenu['slide'];
    const items = this.getItems();
    return (<McMenu wait={20}>
          <Menu id="meme" pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            {items}
          </Menu>
        </McMenu>);
  };

  getItems() {
    return([<a id="home" className="menu-item" href="/">Home</a>,
        <a id="about" className="menu-item" href="/about">About</a>,
        <a id="contact" className="menu-item" href="/contact">Contact</a>]);
  };

  render() {
    return(/*<Login/>*/
      <div id="outer-container" style={{height: '100%'}}>
        {this.getMenu()}
        <main id="page-wrap">
          <h1>BEEG</h1>
        </main>
      </div>)
  }
};

export default App;