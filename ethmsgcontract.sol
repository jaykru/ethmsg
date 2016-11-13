pragma solidity ^0.4.2;

contract Messenger {

    struct Message {
        uint sender;
        uint recipient;
        string text;
        uint timestamp;
    }

    mapping (uint => Message[]) public messages;
    uint usercount = 0;

    function sendMessage(uint to, uint from, string talk) {
            messages[to].push(Message({
                sender: from,
                recipient: to,
                text: talk,
                timestamp: now
            }));
    }
    
    function numMessages(uint user) returns (uint) {
        return messages[user].length;
    }
    
    function userAdd() (uint){
        return usercount++;
    }

    function getMessage(uint user, uint index) returns (uint sender, string text, uint timestamp) {
        Message retmsg = messages[user][index];
        return (retmsg.sender,retmsg.text,retmsg.timestamp);
    }
}