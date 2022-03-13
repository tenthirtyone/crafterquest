// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface StakingERC20 {
    function burn(address account, uint32 amount) external;
}

contract Crafterverse is Ownable, ERC721, ERC721Enumerable, ERC721URIStorage {
    struct Recipe {
        string name;
        StakingERC20 ingredient; // getting dynamic struct arrays is still goofy - todo use emit
        uint32 amount;
        uint32 skill;
        bool active;
    }

    struct Item {
        uint256 id;
        uint8 rank;
        address createdBy;
    }

    Recipe[] public recipes;
    Item[] public items;

    constructor() ERC721("Crafterverse", "CV") {}

    function addRecipe(
        string memory name,
        address ingredient,
        uint32 amounts,
        uint32 skill
    ) public onlyOwner returns (uint256) {
        recipes.push(
            Recipe(name, StakingERC20(ingredient), amounts, skill, true)
        );
        return recipes.length - 1;
    }

    function craftItem(uint256 id, uint8 rank) public {
        require(rank > 0, "rank must be a value above 0");

        uint32 amount = recipes[id].amount * rank;
        recipes[id].ingredient.burn(msg.sender, amount);

        Item memory newItem;

        newItem.id = id;
        newItem.rank = rank;
        newItem.createdBy = msg.sender;

        items.push(newItem);

        uint256 tokenId = items.length - 1;
        _safeMint(msg.sender, tokenId);
    }

    function craftItemWithURI(
        uint256 id,
        uint8 rank,
        string memory _tokenURI
    ) public {
        craftItem(id, rank);

        uint256 tokenId = items.length - 1;
        _setTokenURI(tokenId, _tokenURI);
    }

    function totalRecipes() public view returns (uint256) {
        return recipes.length;
    }

    function totalItems() public view returns (uint256) {
        return items.length;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
