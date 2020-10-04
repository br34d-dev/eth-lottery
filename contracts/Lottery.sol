pragma solidity ^0.7.0;

// SPDX-License-Identifier: MIT

contract Lottery {
    address public manager;
    address[] public participants;
    
    constructor() {
        manager = msg.sender;
    }
    
    function register() public payable {
        require(msg.value >= 0.1 ether);
        participants.push(msg.sender);
    }
        
    function drawWinner() public payable restricted {
        
        uint idx = random() % participants.length;
        payable(participants[idx]).transfer(address(this).balance);
        
        // Reset the Lottery
        participants = new address[](0);
    }
    
    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }
    
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getParticipants() public view returns (address[] memory) {
        return participants;
    } 
}