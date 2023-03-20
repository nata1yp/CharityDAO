import Link from "next/link";
import Image from "next/image";
import classes from "./main-header.module.css";
import { FieldWrapper } from "./main-header.style";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../../constants/contract-address";

export default function MainHeader() {
  const [loading, setLoading] = useState(true);
  const { account, library: provider } = useWeb3React();
  const [contract, setContract] = useState();
  const [activeRound, setActiveRound] = useState();
  const localPathname = window.location.pathname;

  useEffect(() => {
    const firstRound = async () => {
      const signer = provider.getSigner();
      const contractAddress = contractAddresses["CharityDAO"];
      console.log(contractAddress);
      console.log(signer);
      const contractCharityDAO = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      setContract(contractCharityDAO);

      const r = await contractCharityDAO.activeRound();
      setActiveRound(r.toString());
      console.log("round", r);
    };
    firstRound();
  }, []);

  if (activeRound == 0) {
    return (
      <FieldWrapper>
        <Image
          src="/../public/images/logo.png"
          width="200"
          height="165"
          alt="home"
        />
      </FieldWrapper>
    );
  } else {
    return (
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href="/">
            <Image
              src="/../public/images/logo.png"
              width="95"
              height="88"
              alt="home"
            />
          </Link>
        </div>

        <nav>
          <ul>
            <li
              className={
                localPathname == "/donate"
                  ? classes.selectedTab
                  : classes.nonSelectedTab
              }
            >
              <Link href="/donate">Donate</Link>
            </li>
            <li
              className={
                localPathname == "/propose"
                  ? classes.selectedTab
                  : classes.nonSelectedTab
              }
            >
              <Link href="/propose">Propose</Link>
            </li>

            <li
              className={
                localPathname == "/Delegate"
                  ? classes.selectedTab
                  : classes.nonSelectedTab
              }
            >
              <Link href="/delegate">Delegate</Link>
            </li>
            <li
              className={
                localPathname == "/vote"
                  ? classes.selectedTab
                  : classes.nonSelectedTab
              }
            >
              <Link href="/vote">Vote</Link>
            </li>

            <li
              className={
                localPathname == "/results"
                  ? classes.selectedTab
                  : classes.nonSelectedTab
              }
            >
              <Link href="/results">Results</Link>
            </li>

            <li
              className={
                localPathname == "/account"
                  ? classes.selectedTab
                  : classes.nonSelectedTab
              }
            >
              <Link href="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
