pragma solidity ^0.4.2;

contract Messenger {

    struct Message {
        address sender;
        string text;
    }

    mapping (address => Message[]) public messages;

    function sendMessage(address to, string talk) returns (bool) {
        if (to != msg.sender) {
            messages[to].push(Message({
                sender: msg.sender,
                text: talk,
                timestamp: now
            }));
            return true;
        }
        else {
            return false;
        }
    }
    
    function numMessages() returns (uint) {
        return messages[msg.sender].length;
    }

    function getMessage(uint index) returns (address sender, string text, uint timestamp) {
        Message retmsg = messages[msg.sender][index];
        return (retmsg.sender,retmsg.text,retmsg.timestamp);
    }
}