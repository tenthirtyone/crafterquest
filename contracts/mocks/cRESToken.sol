pragma solidity ^0.8.0;

import "../../contracts/AbstractContracts/Staking.sol";

contract cRESToken is StakingToken {
    constructor(address tokenContractAddress)
        StakingToken(tokenContractAddress, "cRes", "cRES")
    {}
}
