// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/Staking.sol";

contract cGEMToken is StakingToken {
    constructor(address tokenContractAddress)
        StakingToken(tokenContractAddress, "cRuin", "cGEM")
    {}
}
