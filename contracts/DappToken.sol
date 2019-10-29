pragma solidity ^0.5.8;

// implements on this documentation https://eips.ethereum.org/EIPS/eip-20
contract DappToken {
    string public name;
    string public symbol;
    string public standard = "Dapp Token v1.0";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) public {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;
        name = _name;
        symbol = _symbol;
    }

    function transfer(address _to, uint256 _amount) public returns(bool success) {
        require(balanceOf[msg.sender] > _amount, "do not enough token to tranfer");
        balanceOf[_to] = _amount;
        balanceOf[msg.sender] -= _amount;
        emit Transfer(msg.sender, _to, _amount);
    }
}