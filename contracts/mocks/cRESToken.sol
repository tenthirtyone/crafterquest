pragma solidity ^0.8.0;

import "../AbstractContracts/Staking.sol";

contract cRESToken is StakingToken {
    constructor(address tokenContractAddress, address craftingContractAddress)
        StakingToken(
            tokenContractAddress,
            craftingContractAddress,
            "cRes",
            "cRES"
        )
    {}
}
