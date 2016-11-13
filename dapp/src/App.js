import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import Web3 from 'web3';
import AutoScroll from 'react-auto-scroll';
import './App.css';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
if(!web3.isConnected()) {
  alert('shit');
}

var abi = [{ "constant": false, "inputs": [ { "name": "to", "type": "uint256" }, { "name": "from", "type": "uint256" }, { "name": "talk", "type": "string" } ], "name": "sendMessage", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "userAdd", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "messages", "outputs": [ { "name": "sender", "type": "uint256" }, { "name": "recipient", "type": "uint256" }, { "name": "text", "type": "string" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "user", "type": "uint256" }, { "name": "index", "type": "uint256" } ], "name": "getMessage", "outputs": [ { "name": "sender", "type": "uint256" }, { "name": "text", "type": "string" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "user", "type": "uint256" } ], "name": "numMessages", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }];

var ethmsgContract = web3.eth.contract(abi);
var ethmsg = ethmsgContract.at('0x7f7c972D7610C6c242e861785447E2efC9E826fd');

class MessageListing extends AutoScroll, Component {
  constructor() {
    super();
    this.state = {from:'', to: '', pnumber:0,cnumber:0,messages:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  getNumber() {
    var howmany = ethmsg.numMessages(this.to);
    this.setState({pnumber:this.state.cnumber,cnumber:howmany});
  }

  getMessages() {
    if (cnumber > pnumber) {
      var newmessages = [];
      for (var i = 0; i<cnumber; i++) {
        var msg = ethmsg.getMessage(this.state.to,i);
        newmessages.push(msg);
      }
      this.setState({messages:newmessages});
    }
  }

  render() {
    getNumber()
    getMessages()
    var msgblocks = [];
    this.state.messages.forEach(item) {
      msgblocks.push(<div><p>{item.sender}:</p>
                <pre>
                  {item.text}
                </pre>
                </div>)
    }
    return(msgblocks);
   }
}

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
          <h1>dischat</h1>
        </main>
      </div>)
  }
};

export default App;