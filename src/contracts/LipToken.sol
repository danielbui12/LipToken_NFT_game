// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LipToken is ERC721, Ownable {
    constructor() ERC721("Lip Token", "LPT") {}

    uint256 COUNTER;
    uint256 fee = 0.01 ether;

    struct Lip {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Lip[] public lips;
    mapping(address => Lip[]) ownerLips;

    event NewLipCreated(address indexed owner, uint256 id, uint256 dna);

    // helper
    function _generateRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randomNumber % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withDraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function _createLip(string memory _name) internal {
        uint256 randomDna = _generateRandomNum(10**16);
        uint8 randomRarity = uint8(_generateRandomNum(100));
        Lip memory newLip = Lip(_name, COUNTER, randomDna, 1, randomRarity);
        lips.push(newLip);
        ownerLips[msg.sender].push(newLip);
        _safeMint(msg.sender, COUNTER);
        emit NewLipCreated(msg.sender, COUNTER, randomDna);
        COUNTER++;
    }

    function createRandomLip(string memory _name) public payable {
        require(msg.value >= fee);
        _createLip(_name);
    }

    function getLips() public view returns (Lip[] memory) {
        return lips;
    }

    // other way to get owner lips
    // function getOwnerLips(address _owner) public view returns (Lip[] memory) {
    //     Lip[] memory result = new Lip[](balanceOf(_owner));
    //     uint256 counter = 0;
    //     for (uint256 i = 0; i < lips.length; i++) {
    //         if (ownerOf(i) == _owner) {
    //             result[counter] = lips[i];
    //             counter++;
    //         }
    //     }
    //     return result;
    // }

    function getAddressLips(address _owner) public view returns (Lip[] memory) {
        return ownerLips[_owner];
    }

    function levelUp(uint256 _lipId) public {
        require(ownerOf(_lipId) == msg.sender);
        Lip storage lip = lips[_lipId];
        lip.level++;
    }
}
