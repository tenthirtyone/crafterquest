// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AbstractContracts/Staking.sol";

contract cLUMToken is StakingToken {
    constructor(address tokenContractAddress, address craftingContractAddress)
        StakingToken(
            tokenContractAddress,
            craftingContractAddress,
            "cLumber",
            "cLUM"
        )
    {}
}
