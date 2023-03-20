import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../../constants/contract-address";
import {
  FieldWrapper,
  Title,
  PageWrapper,
  Label,
  Info,
} from "./account.style";
import Countdown from "react-countdown";


export default function Donate() {
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  const [totalDonation, setTotalDonation] = useState();
  const [weight, setWeight] = useState();
  const [proposalVoted, setProposalVoted] = useState();
  const [votingRight, setVotingRight] = useState();
  const [delegate, setDelegate] = useState();
  const [proposalID, setProposalID] = useState();
  const [proposalTitle, setProposalTitle] = useState();
  const [votesFor, setVotesFor] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const Account = async () => {
      const signer = provider.getSigner();
      const contractAddress = contractAddresses["CharityDAO"];
      const contractCharityDAO = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      setContract(contractCharityDAO);

      contractCharityDAO.donors(account).then((res) => {
        setTotalDonation(res.totalDonation.toString());
        setWeight(res.weight.toString());
        setProposalVoted(res.proposalVoted.toString());
        setVotingRight(res.votingRight);
        setDelegate(res.delegate.toString());
      });

      var proposalID = await contractCharityDAO.beneficiaries(account);
      setProposalID(proposalID.toString());

      if (proposalID != 0) {
        contractCharityDAO.proposal(proposalID - 1).then((prop) => {
          setProposalTitle(prop.title);
          setVotesFor(prop.votesFor.toString());
        });
      }
    };
    Account();
  }, []);

  return (
    <PageWrapper>
      <Title>Account's Info</Title>
      {proposalID == 0 ? (
        <FieldWrapper>
          <Label>User Status</Label>
          <Info>Donor</Info>
          <Label>Address</Label>
          <Info>{account}</Info>
          <Label>Total Donation (WEI)</Label>
          <Info>{totalDonation}</Info>
          <Label>Voting Rights</Label>
          {votingRight ? (<>
            <Info>{weight}</Info>
            <Label>Vote</Label>
            {proposalVoted != 0 ? (
              <Info>
                Proposal with ID<b> {proposalVoted}</b>
              </Info>
            ) : (
              <Info>No vote</Info>
            )}
            </>
          ) : weight == 0 ? (
            <Info>
              You have to donate more than 1 Ether to get voting rights
            </Info>
          ) : (
            <Info>You have a delegate. You can not vote</Info>
          )}
        </FieldWrapper>
      ) : (
        <FieldWrapper>
          <Label>User Status</Label>
          <Info>Beneficiary</Info>
          <Label>Address</Label>
          <Info>{account}</Info>
          <Label>Proposal ID</Label>
          <Info>{proposalID}</Info>
          <Label>Proposal Title</Label>
          <Info>{proposalTitle}</Info>
          <Label>Votes for</Label>
          <Info>{votesFor}</Info>
        </FieldWrapper>
      )}
    </PageWrapper>
  );
}
