// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../contracts/AbstractContracts/ResourceToken.sol";

contract RESToken is ResourceToken {
    constructor() ResourceToken(200000000, "Resource Token", "RES") {}
}
