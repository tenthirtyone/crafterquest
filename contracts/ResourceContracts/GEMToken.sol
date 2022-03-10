// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/ResourceToken.sol";

contract GEMToken is ResourceToken {
    constructor() ResourceToken("Gem Token", "GEM") {}
}
