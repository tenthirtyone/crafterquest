// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/Staking.sol";

contract cOREToken is StakingToken {
    constructor(address tokenContractAddress, address craftingContractAddress)
        StakingToken(
            tokenContractAddress,
            craftingContractAddress,
            "cOre",
            "cORE"
        )
    {}
}
