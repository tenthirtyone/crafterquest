// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/ResourceToken.sol";

contract RESToken is ResourceToken {
    constructor() ResourceToken("Resource Token", "RES") {}
}
