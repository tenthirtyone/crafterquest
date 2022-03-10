// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/ResourceToken.sol";

contract LUMToken is ResourceToken {
    constructor() ResourceToken("Lumber Token", "LUM") {}
}
