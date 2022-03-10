// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Crafterverse is Ownable, ERC721, ERC721Enumerable, ERC721URIStorage {
    struct Item {
        string name;
        address[] ingredients;
        uint32[] amounts;
        uint32 skill;
        bool active;
    }

    Item[] public recipes;
    Item[] public items;

    constructor() ERC721("Crafterverse", "CV") {}

    function addRecipe(
        string memory name,
        address[] memory ingredients,
        uint32[] memory amounts,
        uint32 skill
    ) public onlyOwner returns (uint256) {
        recipes.push(Item(name, ingredients, amounts, skill, true));
        return recipes.length - 1;
    }

    function craftItem(uint256 id) public {}

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
