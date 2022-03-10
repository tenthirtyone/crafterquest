// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/ResourceToken.sol";

contract OREToken is ResourceToken {
    constructor() ResourceToken("Ore Token", "ORE") {}
}
