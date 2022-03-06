// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AbstractContracts/ResourceToken.sol";

contract RUIToken is ResourceToken {
    constructor() ResourceToken(200000000, "Ruins Token", "RUI") {}
}
