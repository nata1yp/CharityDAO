import Link from "next/link";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { abi } from "../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../constants/contract-address";
import {
  FieldWrapper,
  Title,
  InitializeButton,
  PageWrapper,
  RoundWrapper,
} from "./index.style";
import { WelcomeTitle, Status } from "./index.style";
import Countdown from "react-countdown";

const remix = false;
export default function Home() {
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  var [activeRound, setActiveRound] = useState(0);
  const [timeDiff, setTimeDiff] = useState();
  const [balance, setBalance] = useState();
  const [donationSize, setDonationSize] = useState();
  const [roundCompleted, setRoundCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const InitializeRound = async () => {
    try {
      await contract.initializeRound();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const home = async () => {
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

      contractCharityDAO.activeRound().then((r) => {
        setActiveRound(r.toString());
      });

      contractCharityDAO.getBalance().then((b) => {
        setBalance(b.toString());
      });

      contractCharityDAO.calculateDonationSize().then((d) => {
        setDonationSize(d.toString());
      });

      const endRound = await contractCharityDAO.endRound();

      if (Date.now() > endRound * 1000) {
        setRoundCompleted(true);
      } else {
        setRoundCompleted(false);
      }
    };
    home();
  }, []);

  return (
    <PageWrapper>
      <WelcomeTitle>Welcome to Charity DAO!</WelcomeTitle>
      <FieldWrapper>
      A community of individuals dedicated to making a positive difference in the world 
      </FieldWrapper>
      <FieldWrapper>
        With Charity DAO you can:
        <ul>
          <b> As a donor: </b>
          <li>
            <b>Make a donation</b> to DAO's treasury
          </li>
          <li>
            <b>Cast your vote </b> in favor of the proposal to secure the necessary funding
          </li>
          <li>
            <b>Delegate your voting rights</b> to another donor
          </li>
          <br />
          <b>As a beneficiary: </b>
          <li><b>Submit a proposal</b> to acquire the crucial financing required to reach your objective.</li>
          <li><b>Obtain the required finances</b> to reach your desired outcome.</li>
        </ul>
      </FieldWrapper>

      <RoundWrapper>
        {activeRound == 0 ? (
          <Status>
            <InitializeButton onClick={InitializeRound}>BEGIN</InitializeButton>
          </Status>
        ) : (
          <>
            <Title>
              <b>CURRENT ROUND</b>
            </Title>
              <Countdown date={Date.now() + parseInt(timeDiff)}></Countdown>
              <div><b>Number: </b> {activeRound}</div>
              <div><b>Balance:</b> {balance} <b>WEI</b> </div>
              <div><b>Max Donation Size:</b> {donationSize} <b>WEI</b></div>
              {roundCompleted ? (
                <>
                  <div><b><br/>Status: Completed</b></div>
                    <InitializeButton onClick={InitializeRound}>
                      Start new round
                    </InitializeButton>
                </>
              ) : (
                <div><b><br/>Status: Active</b></div>
              )}
          </>
        )}
      </RoundWrapper>
    </PageWrapper>
  );
}
