import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from '@web3-react/core'
import { ContractsContextProvider } from "../store/contract-context";
import Layout from "../components/layout/layout";
import Footer from "../components/footer/footer";

import "../styles/globals.css";


const getLibrary = (provider) => {
  return new Web3Provider(provider);
};


export default function MyApp({ Component, pageProps }) {
  return (
    <ContractsContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer/>
      </Web3ReactProvider>
    </ContractsContextProvider>
  );
}





