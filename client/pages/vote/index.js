import {
  Form,
  FieldWrapper,
  ErrorMessage,
  PageWrapper,
  ProposalWrapper,
  IdentityWrapper,
  DescriptionWrapper,
  CostWrapper,
  TableTitle,
  Title,
  ID,
  SubmitButton,
  Input,
  Label,
  Timer,
  TimerTitle,
  TableWrapper,
  Space,
  TitleCell, 
  DescriptionCell,
  NoProposals
} from "./vote.style";

// import { TitleCell, DescriptionCell } from "../results/results.style";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../../constants/contract-address";
import Countdown from "react-countdown";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const remix = false;
export default function Vote() {
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  const [proposals, setProposals] = useState([]);
  const [endVote, setEndVote] = useState(false);
  const [startVote, setStartVote] = useState(false);
  const [votingPeriod, setVotingPeriod] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitVote = async (data) => {
    console.log("id", data.proposalID);
    try {
      await contract.vote(data.proposalID);
    } catch (error) {
      console.log(error);
      window.alert(
        error.data.message.substring(
          error.data.message.indexOf("revert") + 7,
          error.data.message.length
        )
      );
    }
  };

  useEffect(() => {
    const showProposal = async () => {
      const signer = provider.getSigner();
      const contractAddress = remix
        ? "0xdC60bE396D8d42CaFF53f56AaFf6e09336538E9C"
        : contractAddresses["CharityDAO"];
      const contractCharityDAO = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      setContract(contractCharityDAO);

      const length = await contractCharityDAO.proposalLength();
      let prop = [];
      for (let i = 0; i < length; i++) {
        let proposal = await contractCharityDAO.proposal(i);
        prop.push({
          ID: proposal[0].toString(),
          title: proposal[3],
          description: proposal[4],
          cost: ethers.utils.formatEther(proposal[5].toString(), "ethers"),
        });
      }
      setProposals(prop);
    };
    showProposal();
  }, []);

  useEffect(() => {
    const startTimer = async () => {
      const offset = 0;
      const start = (await contract.startVotingPeriod()) * 1000 + offset;
      setStartVote(start);
      const end = (await contract.endVotingPeriod()) * 1000 + offset;
      setEndVote(end);
      if (Date.now() >= start && Date.now() <= end) {
        setVotingPeriod(true);
      } else {
        setVotingPeriod(false);
      }
    };
    contract && startTimer();
  }, [contract]);

  const votingEndsIn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      <>
        <Title>VOTING IS COMPLETED</Title>
        <Space />
      </>;
    } else {
      return (
        <FieldWrapper>
          <TimerTitle>Voting period ends in:</TimerTitle>
          <Timer>
            {days}d {hours}h {minutes}m {seconds}s
          </Timer>
        </FieldWrapper>
      );
    }
  };

  const votingStartsIn = ({ days, hours, minutes, seconds, completed }) => {
    if (!completed) {
      return (
        <FieldWrapper>
          <TimerTitle>Voting period is going to start in:</TimerTitle>
          <Timer>
            {days}d {hours}h {minutes}m {seconds}s
          </Timer>
        </FieldWrapper>
      );
    }
  };


  const Completionist = () => (
    <Form onSubmit={handleSubmit(submitVote)}>
      <FieldWrapper>
        <Title>
          Have a say in the outcome by voting for your favorite proposal
        </Title>
        <Label>Proposal ID</Label>
        <Input
          type="number"
          {...register("proposalID", {
            required: { value: true, message: "This field is required" },
            min: { value: 1, message: "This value must be over 0" },
            max: {
              value: proposals.length,
              message: "This proposal ID does not exist",
            },
          })}
          placeholder="Give the ID of the proposal you prefer"
        />
        <ErrorMessage>{errors.value?.message}</ErrorMessage>
      </FieldWrapper>

      <SubmitButton type="submit">Vote</SubmitButton>
      <Countdown
        date={endVote}
        key={endVote}
        renderer={votingEndsIn}
        onComplete={() => {
          setVotingPeriod(false);
          // callresults();
        }}
      />
    </Form>
  );

  return (
    <PageWrapper>
      <Countdown
        date={startVote}
        key={startVote}
        renderer={votingStartsIn}
        onComplete={() => setVotingPeriod(true)}
      />
      {votingPeriod ? (
        <Completionist />
      ) : Date.now() >= endVote ? (
        <>
          <Title>VOTING IS COMPLETED</Title>
          <Space />
        </>
      ) : (
        <></>
      )}

      {proposals.length > 0 ? (
        <TableWrapper>
          <TableTitle>Candidate Proposals</TableTitle>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Cost (ETHERS)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals.map((proposal) => (
                  <TableRow key={proposal.ID}>
                    <TitleCell align="center">
                      <b>{proposal.ID}</b>
                    </TitleCell>
                    <DescriptionCell align="left">
                      {proposal.title}
                    </DescriptionCell>
                    <TableCell align="left">{proposal.description}</TableCell>
                    <TableCell align="center">{proposal.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      ) : (
        <NoProposals>No proposals in the current round.</NoProposals>
      )}
    </PageWrapper>
  );
}
