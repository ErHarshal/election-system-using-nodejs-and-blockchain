pragma solidity ^0.4.25;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct voters{
        uint voted;
    }
    
    mapping(address => voters) voting;
    // Read/write candidates
    mapping(uint => Candidate) public candidates;

    // Store Candidates Count
    uint public candidatesCount;

     constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string memory  _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    function vote (uint _id) public {
        if(isVoted(msg.sender) == 0)
        {
        voting[msg.sender].voted=1;
        candidates[_id].voteCount+=1;
        }
    }
    
    function isVoted(address _addr) public view returns(uint)
    {
        return(voting[_addr].voted);
    }

}