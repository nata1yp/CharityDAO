// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract CharityDAO {
    // Donor's info
    struct Donor {
        uint256 weight;
        uint256 totalDonation;
        bool votingRight;
        address delegate;
        uint256 proposalVoted;
    }

    // proposal info
    struct Proposal {
        uint256 proposalID;
        address proposer;
        address recipient;
        string title;
        string details;
        uint256 cost;
        uint256 votesFor;
    }

    // contract address
    address payable public treasury;

    mapping(address => Donor) public donors;

    mapping(address => uint256) public beneficiaries;

    mapping(uint256 => Proposal[]) public history;

    address[] donorsAddr;

    Proposal[] public proposal;

    // activeRound winners
    Proposal[] private winners;

    // activeRound number
    uint256 public activeRound;
    uint256 public completedRound;

    uint256 public totalVotingRights;

    uint256 public totalVotes;

    // bool private activeRoundCompleted;

    function DonationProposalPeriod() private pure returns (uint256) {
        return 900;
    }

    function VotingPeriod() private pure returns (uint256) {
        return 300;
    }

    function periodDelay() private pure returns (uint256) {
        return 5;
    }

    function timestamp() public view returns (uint256) {
        return block.timestamp;
    }

    // The block's timestamp at which activeRound begins
    uint256 public startDonationProposalPeriod;

    // The block's timestamp at which proposals, donations and delegations ends
    uint256 public endDonationProposalPeriod;

    // The block's timestamp at which voting begins: holders must delegate their votes prior to this timestamp
    uint256 public startVotingPeriod;

    // The block's timestamp at which voting ends: votes must be cast prior to this timestamp
    uint256 public endVotingPeriod;

    uint256 public endRound;

    constructor() payable {
        treasury = payable(address(this));
        activeRound = 0;
        completedRound = 0;
        totalVotingRights = 0;
    }

    function add256(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "addition overflow");
        return c;
    }

    function getSize(uint256 key) public view returns (uint256) {
        return history[key].length;
    }

    function initializeRound() public {
        require(block.timestamp > endRound);
        for (uint256 i = 0; i < proposal.length; i++) {
            delete beneficiaries[proposal[i].proposer];
        }
        for (uint256 i = 0; i < donorsAddr.length; i++) {
            donors[donorsAddr[i]].proposalVoted = 0;
        }

        delete proposal;
        completedRound = activeRound;
        activeRound++;
        totalVotes = 0;

        startDonationProposalPeriod = block.timestamp;
        endDonationProposalPeriod = add256(
            startDonationProposalPeriod,
            DonationProposalPeriod()
        );
        startVotingPeriod = add256(endDonationProposalPeriod, periodDelay());
        endVotingPeriod = add256(startVotingPeriod, VotingPeriod());
        endRound = add256(endVotingPeriod, 120);
    }

    function getBalance() public view returns (uint256) {
        return treasury.balance;
    }

    function calculateDonationSize() public view returns (uint256 amount) {
        amount = (treasury.balance * 3) / 10;
        return amount;
    }

    function proposalLength() public view returns (uint256 length) {
        length = proposal.length;
        return length;
    }

    function donate() external payable {
        require(
            block.timestamp >= startDonationProposalPeriod &&
                block.timestamp <= endDonationProposalPeriod,
            "Not donation period"
        );

        uint256 donationSize = msg.value;
        donors[msg.sender].totalDonation += donationSize;
        uint256 voteWeight;
        if (donors[msg.sender].totalDonation >= 40 ether) {
            voteWeight = 5;
        } else {
            voteWeight =
                donors[msg.sender].totalDonation /
                10000000000000000000 +
                1;
        }

        if (donors[msg.sender].totalDonation >= 1 ether) {
            giveRightToVote(msg.sender, voteWeight);
        } else {
            donors[msg.sender].weight = 0;
            donors[msg.sender].delegate = msg.sender;
            donors[msg.sender].votingRight = false;
        }
    }

    function giveRightToVote(address donor, uint256 voteWeight) private {
        totalVotingRights -= donors[donor].weight;
        totalVotingRights += voteWeight;
        if (
            donors[donor].delegate ==
            0x0000000000000000000000000000000000000000 ||
            donors[donor].delegate == donor
        ) {
            donors[donor].votingRight = true;
            donors[donor].delegate = donor;
        } else {
            donors[donors[donor].delegate].weight -= donors[donor].weight;
            donors[donors[donor].delegate].weight += voteWeight;
        }

        donors[donor].weight = voteWeight;
    }

    function propose(
        string memory title,
        string memory details,
        uint256 cost,
        address to
    ) public {
        require(
            block.timestamp >= startDonationProposalPeriod &&
                block.timestamp <= endDonationProposalPeriod,
            "Out of proposal period"
        );
        require(beneficiaries[msg.sender] == 0, "You have already proposed");
        require(
            donors[msg.sender].delegate == msg.sender ||
                donors[msg.sender].delegate == 0x0000000000000000000000000000000000000000,
            "You have to revoke your delegate to make a proposal"
        );

        beneficiaries[msg.sender] = proposal.length + 1;
        proposal.push(
            Proposal({
                title: title,
                votesFor: 0,
                proposalID: proposal.length + 1,
                proposer: msg.sender,
                recipient: to,
                details: details,
                cost: cost * 1000000000000000000
            })
        );
    }

    function showProposals()
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            uint256[] memory,
            string[] memory
        )
    {
        uint256[] memory ID = new uint256[](proposal.length);
        string[] memory title = new string[](proposal.length);
        uint256[] memory cost = new uint256[](proposal.length);
        string[] memory details = new string[](proposal.length);

        for (uint256 i = 0; i < proposal.length; i++) {
            ID[i] = proposal[i].proposalID;
            title[i] = proposal[i].title;
            cost[i] = proposal[i].cost;
            details[i] = proposal[i].details;
        }

        return (ID, title, cost, details);
    }

    function vote(uint256 proposalID) public {
        Donor storage sender = donors[msg.sender];
        require(
            block.timestamp >= startVotingPeriod &&
                block.timestamp <= endVotingPeriod,
            "Out of voting period"
        );
        require(
            beneficiaries[msg.sender] == 0,
            "You have made a proposal. You do not have the right to vote."
        );
        require(
            sender.weight >= 1,
            "You have to donate 1 ether or more to have voting right."
        );
        require(
            sender.votingRight,
            "You have a delegate. You do not have the right to vote."
        );
        require(sender.proposalVoted == 0, "You have already voted");

        donorsAddr.push(msg.sender);

        sender.proposalVoted = proposalID;
        proposal[proposalID - 1].votesFor += sender.weight;
        totalVotes += sender.weight;
    }

    function fund(address payable toAddress, uint256 amountInWei) private {
        require(treasury.balance >= amountInWei, "Not enough ether");
        toAddress.transfer(amountInWei);
    }

    function revokeDelegation() public {
        require(
            block.timestamp >= startDonationProposalPeriod &&
                block.timestamp <= endDonationProposalPeriod,
            "Out of delegation period"
        );
        require(!donors[msg.sender].votingRight, "You do not have delegation.");
        address delegate_ = donors[msg.sender].delegate;

        donors[delegate_].weight -= donors[msg.sender].weight;
        donors[msg.sender].votingRight = true;
        donors[msg.sender].delegate = msg.sender;
    }

    function delegation(address to) public {
        Donor storage sender = donors[msg.sender];
        Donor storage delegate_ = donors[to];

        require(
            block.timestamp >= startDonationProposalPeriod &&
                block.timestamp <= endDonationProposalPeriod,
            "Out of delegation period"
        );
        require(sender.weight >= 1, "You do not have voting rights.");
        require(sender.votingRight, "You already have delegation.");
        require(to != msg.sender, "Self-delegation is disallowed.");
        require(
            delegate_.weight >= 1,
            "You can not give delegation to someone who has no right to vote"
        );

        sender.delegate = to;
        sender.votingRight = false;

        delegate_.weight += sender.weight;
    }

    function createWinningQueue() private view returns (uint256[] memory) {
        uint256[] memory winningQueue = new uint256[](proposal.length);
        uint256[] memory votes = new uint256[](proposal.length);
        uint256[] memory costs = new uint256[](proposal.length);

        for (uint256 p = 0; p < proposal.length; p++) {
            votes[p] = proposal[p].votesFor;
            costs[p] = proposal[p].cost;
            winningQueue[p] = proposal[p].proposalID;
        }

        for (uint256 p = 0; p < proposal.length; p++) {
            for (uint256 i = p + 1; i < proposal.length; i++) {
                if (votes[i] > votes[p]) {
                    uint256 temp = votes[p];
                    votes[p] = votes[i];
                    votes[i] = temp;
                    temp = costs[p];
                    costs[p] = costs[i];
                    costs[i] = temp;
                    temp = winningQueue[p];
                    winningQueue[p] = winningQueue[i];
                    winningQueue[i] = temp;
                } else if (
                    votes[i] == votes[p] && winningQueue[i] < winningQueue[p]
                ) {
                    uint256 temp = costs[p];
                    costs[p] = costs[i];
                    costs[i] = temp;
                    temp = winningQueue[p];
                    winningQueue[p] = winningQueue[i];
                    winningQueue[i] = temp;
                }
            }
        }

        return winningQueue;
    }

    function updateCompletedRound() public {
        completedRound = activeRound;
    }

    function results() public payable {
        completedRound = activeRound;
        require(
            block.timestamp >= endVotingPeriod,
            "Voting period is not completed."
        );
        require(
            ((totalVotes * 100) / totalVotingRights) >= 50,
            "Failed! Votes less than 50%. Start a new round."
        );
        // activeRoundCompleted = true;
        uint256[] memory winningQueue = createWinningQueue();
        uint256 maxDonationSize = calculateDonationSize();
        uint256 donation = 0;

        delete winners;

        for (uint256 i = 0; i < winningQueue.length; i++) {
            uint256 propID = winningQueue[i];
            if (
                donation + proposal[propID - 1].cost <= maxDonationSize &&
                proposal[propID - 1].votesFor > 0
            ) {
                donation += proposal[propID - 1].cost;
                winners.push(proposal[propID - 1]);
            }
        }

        history[activeRound] = winners;

        for (uint256 i = 0; i < winners.length; i++) {
            uint256 propID = winners[i].proposalID;
            address payable toAddress = payable(proposal[propID - 1].recipient);
            uint256 amount = proposal[propID - 1].cost;
            fund(toAddress, amount);
        }
    }

    function showWinners() public view returns (uint256[] memory) {
        uint256[] memory winnerList = new uint256[](winners.length);
        for (uint256 i = 0; i < winners.length; i++) {
            winnerList[i] = winners[i].proposalID;
        }

        return winnerList;
    }
}
