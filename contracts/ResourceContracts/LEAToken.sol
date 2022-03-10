// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/ResourceToken.sol";

contract LEAToken is ResourceToken {
    constructor() ResourceToken("Leather Token", "LEA") {}
}
