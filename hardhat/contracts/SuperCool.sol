// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SuperCool is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenCounter;

    mapping(uint256 => uint256) private tokenPrices;
    mapping(address => uint256[]) private userNFTs;

    constructor() ERC721("supercool", "sc") {}

    function mintNFT(
        uint256 price,
        string memory tokenUri
    ) public returns (uint256) {
        tokenCounter.increment();

        uint256 newItemId = tokenCounter.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
        tokenPrices[newItemId] = price;
        userNFTs[msg.sender].push(newItemId);

        return newItemId;
    }

    function buyToken(uint256 tokenId) public payable {
        address payable seller = payable(ownerOf(tokenId));
        require(
            msg.value == tokenPrices[tokenId],
            "NFTMarketplace: incorrect value"
        );
        _transfer(seller, msg.sender, tokenId);
        seller.transfer(msg.value);
    }

    function getAllTokens() public view returns (uint256[] memory) {
        uint256 totalCount = tokenCounter.current();
        uint256[] memory tempTokens = new uint256[](totalCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= totalCount; i++) {
            if (tryOwnerOf(i) != address(0)) {
                tempTokens[index] = i;
                index++;
            }
        }

        uint256[] memory allTokens = new uint256[](index);
        for (uint256 j = 0; j < index; j++) {
            allTokens[j] = tempTokens[j];
        }
        return allTokens;
    }

    function tryOwnerOf(uint256 tokenId) public view returns (address) {
        try this.ownerOf(tokenId) returns (address tokenOwner) {
            return tokenOwner;
        } catch {
            return address(0);
        }
    }

    function getUserTokens(
        address user
    ) public view returns (uint256[] memory) {
        return userNFTs[user];
    }

    function getTotalSupply() public view returns (uint256) {
        return tokenCounter.current();
    }
}
