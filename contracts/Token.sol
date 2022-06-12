// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import 'hardhat/console.sol';  // for debugging

contract Token{
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address => uint256) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
        console.log("Owner is %s", owner);
    }

    function transfer(address to, uint amount) external{
        console.log("**Sender balance is %s tokens**", balances[msg.sender]);
        console.log("**Sender is sending %s tokens to %s**", amount, to);

        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns(uint){
        return balances[account];
    }
}