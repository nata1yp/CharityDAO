import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../../constants/contract-address";
import {
  Form,
  FieldWrapper,
  ErrorMessage,
  Title,
  PageWrapper,
  SubmitButton,
  Input,
  Select,
  Label,
  Timer,
  TimerTitle,
  OutOfTime,
} from "./donate.style";
import Countdown from "react-countdown";

const remix = false;
export default function Donate() {
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  const [startDonation, setStartDonation] = useState();
  const [endDonation, setEndDonation] = useState();
  const [outOfDonationPeriod, setOutOfDonationPeriod] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitDonation = async (data) => {
    try {
      let amount = ethers.utils.parseUnits(data.value, data.subdivision);
      await contract.donate({ value: amount });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const Donate = async () => {
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
    Donate();
  }, []);

  useEffect(() => {
    const startTimer = async () => {
      const start =
        (await contract.startDonationProposalPeriod()) * 1000;
      setStartDonation(start);
      const end = (await contract.endDonationProposalPeriod()) * 1000;
      setEndDonation(end);
      if (Date.now() > end) {
        setOutOfDonationPeriod(true);
      }
      console.log("HERE", start, end);
    };
    contract && startTimer();
  }, [contract]);

  const Completionist = () => (
    <Form onSubmit={handleSubmit(submitDonation)}>
      <FieldWrapper>
        <Title>Make a donation</Title>
        <Label>Subdivision</Label>
        <Select defaultValue={"ether"} {...register("subdivision")}>
          <option value="wei">Wei</option>
          <option value="gwei">Gwei</option>
          <option value="finney">Finney</option>
          <option value="ether">Ether</option>
        </Select>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Value</Label>
        <Input
          type="number"
          {...register("value", {
            required: { value: true, message: "This field is required" },
            min: { value: 0, message: "This value must be over 0" },
          })}
          placeholder="Give the value of your donation"
        />
        <ErrorMessage>{errors.value?.message}</ErrorMessage>
      </FieldWrapper>

      <SubmitButton type="submit">Donate</SubmitButton>
    </Form>
  );

  const donationPeriod = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <OutOfTime>Out of donation period. <br/>You can make your donation in the next round.</OutOfTime>;
    } else {
      return (
        <PageWrapper>
          <Completionist />
          <TimerTitle>
            Donation period ends in:
          </TimerTitle>
          <Timer>{days}d {hours}h {minutes}m {seconds}s</Timer>
        </PageWrapper>
      );
    }
  };

  return (
    <>
      {outOfDonationPeriod ? (
        <OutOfTime>Out of donation period.<br/>You can make your donation in the next round.</OutOfTime>
      ) : (
        <Countdown
          date={endDonation}
          key={endDonation}
          renderer={donationPeriod}
        />
      )}
    </>
  );
}
