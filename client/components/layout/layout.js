import { Fragment } from "react";
import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";

import MainHeader from "./main-header";
import LoginPage from "../../pages/login";
import Footer from "../footer/footer";
import Link from "next/link";
import Image from "next/image";
import classes from "./main-header.module.css";
import { useState, useEffect } from "react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { contractAddresses } from "../../constants/contract-address";

const MainPage = styled.div`
  display: flex;
  justify-content: center;
`;

function Layout(props) {
  const [loading, setLoading] = useState(true);
  const { active, account} = useWeb3React();
  if (active) {
    return (
      <Fragment>
        <MainHeader />
        <MainPage> {props.children} </MainPage>
        <Footer/>
      </Fragment>
    );
  } else {
    return <LoginPage />;
  }
}

export default Layout;
