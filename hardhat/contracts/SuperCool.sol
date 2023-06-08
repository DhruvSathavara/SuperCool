// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract SUPCool is ERC721URIStorage, VRFConsumerBase {
    using SafeCast for int256;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private tokenCounter;

    AggregatorV3Interface internal matic_usd_price_feed;

    uint256 maxPrompt = 20;
    uint256 public fee;
    uint256 public ranNum;
    bytes32 public keyHash;

    mapping(uint256 => uint256) private tokenPrices;
    mapping(address => uint256[]) private userNFTs;
    mapping(address => string) private Profile;

    constructor(
        string memory name,
        string memory symbol,
        address vrfCoordinator,
        address linkToken,
        bytes32 _keyHash,
        uint256 _fee
    ) ERC721(name, symbol) VRFConsumerBase(vrfCoordinator, linkToken) {
        matic_usd_price_feed = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );

        keyHash = _keyHash;
        fee = _fee;
    }

    function mintNFT(
        uint256 price,
        string memory tokenURI
    ) public returns (uint256) {
        tokenCounter.increment();

        uint256 newItemId = tokenCounter.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenPrices[newItemId] = price;
        userNFTs[msg.sender].push(newItemId);

        return newItemId;
    }


    function buyToken(uint256 tokenId) public payable {
        require(_exists(tokenId), "NFTMarketplace: token does not exist");
        require(
            msg.value == tokenPrices[tokenId],
            "NFTMarketplace: incorrect value"
        );

        address payable seller = payable(ownerOf(tokenId));
        _transfer(seller, msg.sender, tokenId);
        seller.transfer(msg.value);
    }

    function getAllTokens() public view returns (uint256[] memory) {
        uint256[] memory allTokens = new uint256[](tokenCounter.current());
        for (uint256 i = 1; i <= tokenCounter.current(); i++) {
            if (_exists(i)) {
                allTokens[i - 1] = i;
            }
        }
        return allTokens;
    }

    function getMaticUsd() public view returns (uint) {
        (, int price, , , ) = matic_usd_price_feed.latestRoundData();

        return price.toUint256();
    }

    function convertMaticUsd(uint _amountInUsd) public view returns (uint) {
        uint maticUsd = getMaticUsd();

        uint256 amountInUsd = _amountInUsd.mul(maticUsd).div(10 ** 18);

        return amountInUsd;
    }

    function getUserTokens(
        address user
    ) public view returns (uint256[] memory) {
        return userNFTs[user];
    }

    function getTotalSupply() public view returns (uint256) {
        return tokenCounter.current();
    }

    function fulfillRandomness(
        bytes32 requestId,
        uint256 randomness
    ) internal virtual override {
        uint256 winnerIndex = randomness % maxPrompt;
        ranNum = winnerIndex;
    }

    function generateRandomNum() private returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        return requestRandomness(keyHash, fee);
    }

    function getRandomNumber() public returns (uint256) {
        generateRandomNum();
    }

    function storeProfileData(string memory metadata) public {
        Profile[msg.sender] = metadata;
    }

    function getUserProfile(address user) public view returns (string memory) {
        return Profile[user];
    }
}
