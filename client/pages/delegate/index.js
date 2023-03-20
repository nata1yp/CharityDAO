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
  PageWrapper,
  Title,
  Input,
  SubmitButton,
  Label,
  Timer,
  TimerTitle,
  OutOfTime,
} from "./delegate.style";
import Countdown from "react-countdown";

const remix = false;
export default function Delegate() {
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  const [delegate, setDelegate] = useState();
  const [startDelegate, setStartDelegate] = useState();
  const [endDelegate, setEndDelegate] = useState();
  const [outOfDelegationPeriod, setOutOfDelegationPeriod] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitDelegation = async (data) => {
    try {
      await contract.delegation(data.address);
    } catch (error) {
      window.alert(
        error.data.message.substring(
          error.data.message.indexOf("revert") + 7,
          error.data.message.length
        )
      );
    }
  };

  const revokeDelegation = async () => {
    try {
      await contract.revokeDelegation();
    } catch (error) {
      window.alert(
        error.data.message.substring(
          error.data.message.indexOf("revert") + 7,
          error.data.message.length
        )
      );
    }
  };

  useEffect(() => {
    const Delegate = async () => {
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

      contractCharityDAO.donors(account).then((res) => {
        setDelegate(res.delegate);
      });
    };
    Delegate();
  }, []);

  useEffect(() => {
    const startTimer = async () => {
      const start = (await contract.startDonationProposalPeriod()) * 1000;
      setStartDelegate(start);
      const end = (await contract.endDonationProposalPeriod()) * 1000;
      setEndDelegate(end);
      if (Date.now() > end) {
        setOutOfDelegationPeriod(true);
      }
    };
    contract && startTimer();
  }, [contract]);

  const Completionist = () => (
    <PageWrapper>
      {account == delegate ? (
        <Form onSubmit={handleSubmit(submitDelegation)}>
          <FieldWrapper>
            <Title>Make a delegation</Title>
            <Label htmlFor="address">Address</Label>
            <Input
              type="address"
              {...register("address", {
                required: { value: true, message: "This field is required" },
              })}
              placeholder="Give the address of your delegate"
            />
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
          </FieldWrapper>
          <SubmitButton type="submit">Delegate</SubmitButton>
        </Form>
      ) : { account } == 0x0000000000000000000000000000000000000000 ? (
        <div></div>
      ) : (

          <Form onSubmit={handleSubmit(revokeDelegation)}>
            <FieldWrapper>
              <Title>Address {delegate}</Title>
              <Title>is your delegate</Title>
              <SubmitButton type="submit">Revoke Delegation</SubmitButton>
            </FieldWrapper>
          </Form>
      )}
    </PageWrapper>
  );

  const delegationPeriod = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <OutOfTime>
          Out of delegation period.
          <br />
          You can make or revoke a delegation in the next round.
        </OutOfTime>
      );
    } else {
      return (
        <PageWrapper>
          <Completionist />
          <TimerTitle>Delegation period closes in:</TimerTitle>
          <Timer>
            {days}d {hours}h {minutes}m {seconds}s
          </Timer>
        </PageWrapper>
      );
    }
  };

  return (
    <>
      {outOfDelegationPeriod ? (
        <OutOfTime>
          Out of delegation period.
          <br />
          You can make or revoke a delegation in the next round.
        </OutOfTime>
      ) : (
        <Countdown
          date={endDelegate}
          key={endDelegate}
          renderer={delegationPeriod}
        />
      )}
    </>
  );
}
