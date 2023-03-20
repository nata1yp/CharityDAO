import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import ContractsContext from "../../store/contract-context";
import { contractAddresses } from "../../constants/contract-address";
import Countdown from "react-countdown";
import {
  PageWrapper,
  SubmitButton,
  Timer,
  TimerTitle,
  SelectRound,
  TableTitle,
  TableWrapper,
  DescriptionCell,
  TitleCell,
} from "./results.style";
import { Pagination } from "@mui/material";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const remix = false;

export default function Results() {
  const [loading, setLoading] = useState(true);
  const { account, library: provider } = useWeb3React();
  const [winners, setWinners] = useState([]);
  const [contract, setContract] = useState();
  const [proposals, setProposals] = useState([]);
  const [activeRound, setActiveRound] = useState();
  const [endVote, setEndVote] = useState();
  const [completedRound, setCompletedRound] = useState();
  const [message, setMessage] = useState();
  var l;

  function hideButton() {
    document.getElementById("btn").style.visibility = "hidden";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const showResults = async () => {
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
      const act = await contractCharityDAO.activeRound();
      setActiveRound(act.toString());

      const compl = await contractCharityDAO.completedRound();
      setCompletedRound(parseInt(compl));

      const w = await contractCharityDAO.showWinners();
      setWinners(w);

      try {
        l = await contractCharityDAO.getSize(compl);
      } catch (error) {
        l = 0;
      }
      var prop = [];
      if (l > 0) {
        for (let i = 0; i < l; i++) {
          var proposal = await contractCharityDAO.history(compl, i);
          console.log(proposal);
          prop.push({
            ID: proposal[0].toString(),
            title: proposal[3],
            description: proposal[4],
            cost: ethers.utils.formatEther(proposal[5].toString(), "ethers"),
            recipient: proposal[2],
          });
        }
      }
      setProposals(prop);
      console.log(prop);
    };
    showResults();
  }, []);

  useEffect(() => {
    const startTimer = async () => {
      const endOfVoting = (await contract.endVotingPeriod()) * 1000;
      setEndVote(endOfVoting);
    };
    contract && startTimer();
  }, [contract]);

  const waitForTheResults = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      console.log("a",activeRound);
      console.log("v", completedRound);
      if (completedRound == activeRound) {
        return;
      } else {
        return (
          <SubmitButton
            id="btn"
            onClick={() => {
              callresults();
              hideButton();
            }}
          >
            You can now see the winners of the current round
          </SubmitButton>
        );
      }
    } else {
      return (
        <PageWrapper>
          <TimerTitle>Voting period is not completed. Wait for:</TimerTitle>
          <Timer>
            {days}d {hours}h {minutes}m {seconds}s
          </Timer>
        </PageWrapper>
      );
    }
  };

  const callresults = async () => {
    try {
      await contract.updateCompletedRound();
      await contract.results();
      forceUpdate();
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

  const selectRoundData = async (event, value) => {
    var l = await contract.getSize(value);
    var prop = [];
    if (l > 0) {
      for (let i = 0; i < l; i++) {
        var proposal = await contract.history(value, i);
        console.log(proposal);
        prop.push({
          ID: proposal[0].toString(),
          title: proposal[3],
          description: proposal[4],
          cost: ethers.utils.formatEther(proposal[5].toString(), "ethers"),
          recipient: proposal[2],
        });
      }
    }
    if (value == activeRound && value!=completedRound){
        setMessage("No results yet.")
    }
    else{
      setMessage("Round Failed. No winners.")
    }
    setProposals(prop);
  };

  return (
    <PageWrapper>
      <Countdown date={endVote} key={endVote} renderer={waitForTheResults} />

      <SelectRound>Select a round to see the results</SelectRound>
      <Pagination
        count={activeRound}
        variant="outlined"
        shape="rounded"
        onChange={selectRoundData}
        size="large"
      />

      {proposals.length > 0 ? (
        <TableWrapper>
          <TableTitle>Winners in order of preference</TableTitle>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Cost(ETHERS)</TableCell>
                  <TableCell align="center">Recipient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals.map((proposal) => (
                  <TableRow key={proposal.ID}>
                    <TitleCell align="left">{proposal.title}</TitleCell>
                    <DescriptionCell align="left">
                      {proposal.description}
                    </DescriptionCell>
                    <TableCell align="center">{proposal.cost}</TableCell>
                    <TableCell align="right">{proposal.recipient}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      ) : (
        <TableTitle>{message}</TableTitle>
      )}
    </PageWrapper>
  );
}
