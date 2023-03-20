import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import styles from "./login.module.css";

import MetaMaskIcon from "./components/metamask-icon";
const injected = new InjectedConnector();

export default function LoginPage() {
  const { activate, active, account } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
      }
    }
    setLoading(false);
  }, [loading]);

  async function connectWalletHandler() {
    if (typeof window.ethereum !== "undefined") {
      try {
        let rejected = false;

        setHasMetamask(true);
        await activate(injected, (e) => (rejected = true));

        !rejected && toast.success("Successfully logged in!");
        Router.push("/");
      } catch (e) {
        console.log("Something went wrong!");
      }
    }
  }

  return (
    <>
      <div className="col d-flex justify-content-center">
        <div
          className={`card ${styles.shadow} ${styles.round} ${styles["margin"]} ${styles["card-container-layout"]}`}
        >
          <div className={`card-body ${styles.padding} ${styles.center}`}>
            <MetaMaskIcon pageIsloading={loading} />
            {!hasMetamask && "Please Install metamask"}
            {active ? (
              "Connected"
            ) : (
              <>
                <h3 className="card-title"> Login with MetaMask</h3>
                <hr />
                <p className="card-text">
                  Login with your MetaMask account to Charity DAO
                </p>
                <button
                  className={`btn btn-primary ${styles.shadow} ${styles.btn} `}
                  onClick={connectWalletHandler}
                >
                  {" "}
                  Login{" "}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
