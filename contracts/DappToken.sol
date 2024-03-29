pragma solidity ^0.5.8;

// implements on this documentation https://eips.ethereum.org/EIPS/eip-20
contract DappToken {
    string public name;
    string public symbol;
    string public standard = "Dapp Token v1.0";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) public {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;
        name = _name;
        symbol = _symbol;
    }

    function transfer(address _to, uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] > _value, "do not enough token to tranfer");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    //msg.sender will keep track _spender
    //approve, ex: approve _spender on the exchange specific _amount
    //Theory: account A approve account B to spend C token
    function approve(address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;// store amount to allowance mappings
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
     // _from: accountB in this case
     // _to: accountC in this case
     // _amount: number of token we are going to transfer
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
       //require _from account have enough tokens
       require(_value <= balanceOf[_from], "_amount must less than balance");
       //require allowance is big enough
       require(_value <= allowance[_from][msg.sender], "cannot transfer larger than approve amount");
       //change the balance
       balanceOf[_from] -= _value;
       balanceOf[_to] += _value;
       //Update the allowance
       allowance[_from][msg.sender] -= _value; // msg.sender in this case is spendingAccount
       //call Transfer event:EP20 standard
       emit Transfer(_from, _to, _value);
        return true;
    }
}