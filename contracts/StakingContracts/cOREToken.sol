// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/Staking.sol";

contract cOREToken is StakingToken {
    constructor(address tokenContractAddress)
        StakingToken(tokenContractAddress, "cOre", "cORE")
    {}
}
