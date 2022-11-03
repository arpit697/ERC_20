// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient , uint amount) external returns (bool);

    function allowance(address owner , address spender) external view returns (uint);

    function approve(address spender , uint amount) external returns (bool);

    function transferFrom(address sender, address recipient , uint amount) external returns (bool); 

    event Transfer(address indexed from , address indexed to , uint amount);

    event Approval(address indexed owner , address indexed spender , uint amount);

}

contract  ERC20 is IERC20 {

    uint public override totalSupply = 1000;
    mapping (address => uint) public override balanceOf;
    mapping (address => mapping(address => uint)) public  override allowance;

    string public name = "Arpit";
    string public symbol = "ARP";
    uint8 public decimals = 18 ;

    constructor(){
      balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address recipient , uint amount) external override returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Not enough tokens");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender , recipient , amount);
        return true;
    }

    function approve(address spender , uint amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender , spender , amount);
        return true;
    }

    function transferFrom(address sender, address recipient , uint amount) external override returns (bool) {
        allowance[sender][msg.sender] -= amount; 
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender , recipient , amount);
        return true ; 
    }

  /*   function mint(uint amount) external {
        balanceOf[msg.sender] += amount ;
        totalSupply += amount ;
        emit Transfer(address(0) , msg.sender , amount);
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount ;
        totalSupply -= amount ;
        emit Transfer(msg.sender , address(0) , amount);
    } */
}

