// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
import "./lipfactory.sol";

contract LipHelper is LipFactory {
  uint256 levelUpFee = 0.01 ether;
  
  modifier aboveLevel(uint256 _level, uint256 _lipId) {
    require(lips[_lipId].level >= _level);
    _;
  }

  modifier onlyOwnerOf(uint256 _lipId) {
    require(msg.sender == ownerOf(_lipId));
    _;
  }

  function _triggerCooldown(Lip storage _lip) internal {
    _lip.readyTime = uint32(block.timestamp + cooldownTime);
  }

  function _isReady(Lip storage _lip) internal view returns (bool) {
    return (_lip.readyTime <= block.timestamp);
  }

  function withDraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }

  function setLevelUpFee(uint256 _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function levelUp(uint256 _lipId) public payable onlyOwnerOf(_lipId) {
    Lip storage lip = lips[_lipId];
    require(_isReady(lip));
    require(msg.value >= levelUpFee);
    lip.level++;
    _triggerCooldown(lip);
  }

  function changeName(uint256 _lipId, string calldata _newName)
    external
    aboveLevel(2, _lipId)
    onlyOwnerOf(_lipId)
  {
    Lip storage lip = lips[_lipId];
    lip.name = _newName;
  }

  function getAllLips() public view returns (Lip[] memory) {
    return lips;
  }

  function getEnemy(address _owner) public view returns (Lip[] memory) {
    Lip[] memory result = new Lip[](lips.length - balanceOf(_owner));
    uint256 counter = 0;
    for (uint256 i = 0; i < lips.length; i++) {
      if (ownerOf(i) != _owner) {
        result[counter] = lips[i];
        counter = counter + 1;
      }
    }
    return result;
  }

  function getOwnerLips(address _owner) public view returns (Lip[] memory) {
    Lip[] memory result = new Lip[](balanceOf(_owner));
    uint256 counter = 0;
    for (uint256 i = 0; i < lips.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = lips[i];
        counter = counter + 1;
      }
    }
    return result;
  }
}