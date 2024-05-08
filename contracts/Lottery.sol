//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address payable[] public players;
    address public winner;
    mapping(address => uint) addressToId;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value == 100000000 wei, "The sent value is not enough");
        players.push(payable(msg.sender));
    }

    function noOfPlayers() public view returns (uint) {
        return players.length;
    }

    function playersList() public view returns (address payable[] memory) {
        return players;
    }

    modifier ismanager() {
        require(msg.sender == manager, "The sender must be contract manager");
        _;
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.number, block.timestamp, players)
                )
            );
    }

    function chooseWinner() public ismanager returns (address) {
        uint randoms = random();
        randoms = randoms % players.length;
        address winners = players[randoms];
        players[randoms].transfer(address(this).balance);
        winner = winners;
        // delete players;
        players = new address payable[](0);
        return winners;
    }
}
