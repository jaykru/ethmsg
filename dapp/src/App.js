import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import Web3 from 'web3';
import AutoScroll from 'react-auto-scroll';
import './App.css';

  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9001"));
if (!web3.isConnected()) {
  alert("shit")
}
var abi = [{ "constant": false, "inputs": [ { "name": "to", "type": "uint256" }, { "name": "from", "type": "uint256" }, { "name": "talk", "type": "string" } ], "name": "sendMessage", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "userAdd", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "messages", "outputs": [ { "name": "sender", "type": "uint256" }, { "name": "recipient", "type": "uint256" }, { "name": "text", "type": "string" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "user", "type": "uint256" }, { "name": "index", "type": "uint256" } ], "name": "getMessage", "outputs": [ { "name": "sender", "type": "uint256" }, { "name": "text", "type": "string" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "user", "type": "uint256" } ], "name": "numMessages", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }];

var ethmsgContract = web3.eth.contract(abi);
var ethmsg = ethmsgContract.at('0x7f7c972D7610C6c242e861785447E2efC9E826fd');

class MessageListing extends AutoScroll {
  constructor() {
    super();
    this.state = {from:'', to: '', pnumberh:0,cnumberh:0,pnumbert:0,cnumbert:0,messages:[]};
  }
  
  getNumber() {
    var howmanyhere = ethmsg.numMessages(this.to);
    var howmanythere = ethmsg.numMessages(this.from);
    this.setState({pnumberh:this.state.cnumberh,cnumberh:howmanyhere});
    this.setState({pnumbert:this.state.cnumbert,cnumbert:howmanythere});
  }

  getMessages() {
    var newmessages = [];
    if (this.state.cnumberh > this.state.pnumberh) {
      for (var i = 0; i<this.state.cnumberh; i++) {
        var msg = ethmsg.getMessage(this.state.to,i);
        newmessages.push(msg);
      }
    if (this.state.cnumbert > this.state.pnumbert) {
      for (var j = 0; j<this.state.cnumbert; j++) {
        var msg1 = ethmsg.getMessage(this.state.from,j);
        newmessages.push(msg1);
      }
    for (var g = 1; g<newmessages.length; g++) {
      if (newmessages[g].timestamp > newmessages[g-1].timestamp) {
        var k = newmessages[g];
        newmessages[g] = newmessages[g-1];
        newmessages[g-1] = k;
      }
    }
    this.setState({messages:newmessages});
    }
  }
  }

  render() {
    this.getNumber()
    this.getMessages()
    var msgblocks = [];
    this.state.messages.forEach(function (item) {
      msgblocks.push(<div><p>{item.sender}:</p>
                <pre>
                  {item.text}
                </pre>
                </div>)
    });
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

class App extends Component {
  constructor() {
    super();
    this.state={uid:ethmsg.userAdd(),curchat:0,cnum:0,pnum:0};
  }

  getMenu() {
    const Menu = BurgerMenu['slide'];
    return (
        <McMenu wait={20}>
          <Menu id="meme" pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            {this.getItems()}
          </Menu>
        </McMenu>
     );
  }

  getItems() {
    return(
      <div>
      <button onClick={this.setState({curchat:0})}>sent</button>
      <br/>
      <button onClick={this.setState({curchat:1})}>jeremy</button>
      </div>
    );
  }

  render() {
    return(/*<Login/>*/
      <div id="outer-container" style={{height: '100%'}}>
        {this.getMenu()}
        <main id="page-wrap">
          <h1>dischat</h1>
          <MessageListing from={this.state.curchat} to={this.state.uid}/>
        </main>
      </div>)
  }
};

export default App;