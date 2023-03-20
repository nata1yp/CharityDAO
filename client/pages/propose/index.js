import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../../constants/contract-address";
import {
  Form,
  ErrorMessage,
  FieldWrapper,
  Title,
  PageWrapper,
  SubmitButton,
  Label,
  Input,
  TextArea,
  Timer,
  TimerTitle,
  OutOfTime,
} from "./propose.style";
import Countdown from "react-countdown";
const remix = false;
export default function Propose() {
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  const [startPropose, setStartPropose] = useState();
  const [endPropose, setEndPropose] = useState();
  const [outOfProposalPeriod, setOutOfProposalPeriod] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitProposal = async (data) => {
    console.log(data.title, data.description, data.cost, data.recipient);
    try {
      await contract.propose(
        data.title,
        data.description,
        data.cost,
        data.recipient
      );
    } catch (error) {
      window.alert(error.data.message.substring(error.data.message.indexOf("revert") + 7, error.data.message.length))
    }
  };

  useEffect(() => {
    const Propose = async () => {
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
    };
    Propose();
  }, []);

  useEffect(() => {
    const startTimer = async () => {
      const start = (await contract.startDonationProposalPeriod()) * 1000;
      setStartPropose(start);
      const end = (await contract.endDonationProposalPeriod()) * 1000;
      setEndPropose(end);
      if (Date.now() >= end) {
        setOutOfProposalPeriod(true);
      }

    };
    contract && startTimer();
  }, [contract]);


  const Completionist = () => (
    <Form onSubmit={handleSubmit(submitProposal)}>
      <FieldWrapper>
        <Title>Make a proposal</Title>
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title", {
            required: { value: true, message: "This field is required" },
          })}
          placeholder="Give a title for your proposal"
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor="description">Description</Label>
        <TextArea
          {...register("description", {
            required: { value: true, message: "This field is required" },
            maxLength: { value: 1000, message: "Less than 1000 characters" },
          })}
          placeholder="Give a short description of your proposal"
          rows="5"
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Cost</Label>
        <Input
          type="number"
          {...register("cost", {
            required: { value: true, message: "This field is required" },
            min: { value: 0, message: "The cost must be over 0" },
          })}
          placeholder="Give this value in ethers"
        />
        <ErrorMessage>{errors.cost?.message}</ErrorMessage>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Recipient</Label>
        <Input
          type="address"
          {...register("recipient", {
            required: { value: true, message: "This field is required" },
          })}
          placeholder="Give the address of the recipient"
        />
        <ErrorMessage>{errors.recipient?.message}</ErrorMessage>
      </FieldWrapper>
      <SubmitButton type="submit">Propose</SubmitButton>
    </Form>
  );

  const proposalPeriod = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <OutOfTime>Out of proposal period. <br/>You can make a proposal in the next round.</OutOfTime>;
    } else {
    // Render a countdown
    // if (!completed) {
      return (
        <PageWrapper>
          <Completionist />
          <TimerTitle>
            Proposal period ends in: 
          </TimerTitle>
          <Timer>{days}d {hours}h {minutes}m {seconds}s</Timer>
        </PageWrapper>
      );
    }
  };

  return (
    <>
      {outOfProposalPeriod ? (
        <OutOfTime>Out of proposal period.<br/>You can make a proposal in the next round.</OutOfTime>
      ) : (
        <Countdown
          date={endPropose}
          key={endPropose}
          renderer={proposalPeriod}
        />
      )}
    </>

  );
}
