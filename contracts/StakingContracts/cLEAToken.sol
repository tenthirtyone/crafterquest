// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/Staking.sol";

contract cLEAToken is StakingToken {
    constructor(address tokenContractAddress)
        StakingToken(tokenContractAddress, "cLeather", "cLEA")
    {}
}
