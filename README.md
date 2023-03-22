# CharityDAO - Diploma Thesis

<b>Charity DAO leverages blockchain technology to accept donations from people in a transparent and secure manner. Members of the DAO can propose and vote on various charitable causes to support, ensuring that donations align with the collective values and goals of the organization. The funds are then distributed to diverse charitable causes based on decisions made by the members of the DAO, creating a democratic and community-driven approach to philanthropy<b>

## Technologies Used
* NextJS
* Solidity (for the smart contract)
* Truffle Suite / Ganache
* Metamask

## Getting Started
Create a Ganache Workspace using ***truffle-config.js*** file which is in ***backend*** 
<br>*Note: If you click the CONTRACTS tab in Ganache window you can view a Contract which is not yet deployed and do not have an address*</br>
<br>*Note: Always Keep Ganache running while running CharityDAO*</br>

Clone repository and open a new Terminal

Download npm with command: 
```bash
npm install -g npm
```

Update npm with command: 
```bash
npm install -g npm@latest
```

Download Truffle with command: 
```bash
npm install -g truffle
```

Ensure that Truffle was successfully downloaded with command: 
```bash
truffle version
```

Navigate terminal to ***backend*** folder with command:
```bash
cd backend
```

Install truffle project dependencies with command: 
```bash 
truffle build
```

Deploy Smart Contract with command: 
```bash
truffle migrate --reset
```
*Note: You can now check Contracts tab in Ganache to see that state has changed to "DEPLOYED" and contract has an address*

Copy the address of the contract

Navigate to ***contract-address.js*** file located in ***client/constants*** and replace the old address with the one you copied from Ganache

Navigate terminal to ***client*** folder with command: 
```bash
cd .. 
#and 
cd client
```

To install ***next.js*** project dependencies (aka create Node modules folder) run command: 
```bash
npm install
```
*Note: This may take some time*

To start the frontend run command: 
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

Open Metamask and add a new Network. RPC URL must be set to HTTP://127.0.0.1:7545 and Chain ID to 1337. You can choose your own Currency Symbol (we used ETH but it is up to you).


## Main functions of Smart Contract
* initializeRound(): Set up the initial state for a round of DAO process
* donate(): Allows users to contribute funds to the treasury of the DAO
* giveRightToVote(): Invoked by donate() function, gives voting rights to users based on the amount of their donation
* delegation(): A donor can transfer their voting rights to another user who can then vote on their behalf in the decision-making process
* revokeDelegation(): Removes the voting rights from the recipient and restore them to the original user
* propose(): Users can make proposals to initiate a fundraising campaign to raise funds for a specific charity or cause
* vote(): Allows donors to cast a vote to determine which proposals to fund
* results(): Ranks proposals by votes, calculates funding allocation for each round, presents winning proposals and updates system history
* fund(): Called by results() function, automates the process of transferring funds from the treasury of the DAO to the winners of each round
* calculateDonationSize(): Calculates the percentage of the DAO's treasury balance that will be offered for each round of funding

## Thesis Information
Utilization of blockchain technology for creating a charity DAO 
[Diploma Thesis](http://artemis.cslab.ece.ntua.gr:8080/jspui/handle/123456789/18597) (greek)

### Abstract
In the field of digital technology, certain technologies occasionally emerge that create a lot of noise, some rightfully so, while others not. One of the most talked-about technologies in recent years, that seems to live up to the extremely high expectations surrounding it, is Blockchain.

The first reference to this particular technology was made in 2008 with the creation of Bitcoin. Since then, there has been a significant expansion of blockchain capabilities, and in recent years it has experienced exponential adoption, as a multitude of programmers leverage it to create decentralized applications.

The enthusiasm surrounding the new technology, its advantages and application possibilities, has led many to talk about a revolution similar to that of the Internet, which in the coming years will radically change the structures, organization and operation of modern societies. Already, blockchain technology applications cover almost all areas of the economy, while more and more companies, organizations and public authorities are investing significant resources in order to implement the new technology.

The aim of this thesis is to study blockchain technology and how it can improve the current structure of charitable organizations. By leveraging this significant innovation of technology, it becomes possible to overcome many obstacles that make charitable initiatives unreliable, given their current structure, and act as a hindrance to citizens who want to offer help.

The result of the research conducted is the creation of a Decentralized Autonomous Organization with philanthropic character, the "Charity DAO". This organization is built entirely on the blockchain in order to take advantage of all the benefits offered by this technology.

The concepts of Blockchain, consensus algorithms, and smart contracts are being investigated in the context of the thesis. Additionally, the concept of Decentralized Autonomous Organization (DAO) is analyzed, along with the advantages it offers compared to the traditional form of an organization.

### Conclusion
A charity DAO can bring transparency, accountability, and democratic decision-making to the world of charitable giving, potentially increasing the impact of donations and creating a more equitable and efficient charitable ecosystem.