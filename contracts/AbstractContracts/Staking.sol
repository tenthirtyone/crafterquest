pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingToken is ERC20, Ownable {
    modifier onlyCraftingContract() {
        require(
            msg.sender == CraftingContract,
            "Only the crafting contract may call this function"
        );
        _;
    }

    address CraftingContract;
    IERC20 immutable tokenContract;
    uint256 stakeRewardPerBlock = 1;

    // account to amount transferred to contract
    mapping(address => uint256) stakingBalances;
    mapping(address => uint256) stakingBlock;

    constructor(
        address _tokenContract,
        address craftingContract,
        string memory tokenName,
        string memory tokenSymbol
    ) ERC20(tokenName, tokenSymbol) {
        tokenContract = IERC20(_tokenContract);
        CraftingContract = craftingContract;
    }

    function setStakeRewardPerBlock(uint256 reward) public onlyOwner {
        stakeRewardPerBlock = reward;
    }

    function stake(uint256 amount) public {
        if (stakingBalances[msg.sender] != 0) {
            revert("account is already staking");
        }
        // prevent re-entrancy
        stakingBalances[msg.sender] = amount;
        stakingBlock[msg.sender] = block.number;
        tokenContract.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw() public {
        if (stakingBalances[msg.sender] == 0) {
            revert("account is not staking");
        }

        if (stakingBlock[msg.sender] == 0) {
            revert("account is not staking");
        }

        uint256 amountStaked = stakingBalances[msg.sender];

        harvest();
        stakingBalances[msg.sender] = 0;
        stakingBlock[msg.sender] = 0;

        tokenContract.transfer(msg.sender, amountStaked);
    }

    function stakingTokensEarned() public view returns (uint256) {
        uint256 amountStaked = stakingBalances[msg.sender];
        uint256 totalBlocksStaked = block.number - stakingBlock[msg.sender];

        uint256 stakeReward = (totalBlocksStaked * stakeRewardPerBlock) *
            amountStaked;

        return stakeReward;
    }

    // mint tokens without withdrawing stake
    function harvest() public returns (uint256) {
        uint256 stakeReward = stakingTokensEarned();
        stakingBlock[msg.sender] = block.number;
        _mint(msg.sender, stakeReward);
        return stakeReward;
    }

    // called by crafting contract when crafting items
    function burn(address account, uint256 amount)
        external
        onlyCraftingContract
    {
        _burn(account, amount);
    }
}
