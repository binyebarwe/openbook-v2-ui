import "../styles/globals.css";
require("@solana/wallet-adapter-react-ui/styles.css");

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";

import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import ClientWalletProvider from "../components/ClientWalletProvider";

export const SOLANA_MAIN = clusterApiUrl(WalletAdapterNetwork.Mainnet);
export const SOLANA_TEST = clusterApiUrl(WalletAdapterNetwork.Testnet);
export const SOLANA_DEV = clusterApiUrl(WalletAdapterNetwork.Devnet);
export const HELIUS = `https://misty-wcb8ol-fast-mainnet.helius-rpc.com/`;
import { Toaster } from "react-hot-toast";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// You can use any of the other enpoints here
export const NETWORK = HELIUS;


import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import ActiveLink from "../components/ActiveLink";

const inter = Inter({ subsets: ["latin"] });


export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const ReactUIWalletModalProviderDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
    { ssr: false }
  );

  return (
    <ConnectionProvider endpoint={NETWORK}>
      <ClientWalletProvider wallets={wallets}>
        <ReactUIWalletModalProviderDynamic>
          <Toaster position="bottom-right" reverseOrder={true} />

          <div className={`${inter.className} dark`}>
            <WalletMultiButton className="btn" />
            <div className="w-full px-4 py-2 border-b-2">
              <div className="flex flex-row flex-wrap space-x-4">
                <div className="inline">
                  <ActiveLink href="/">Markets</ActiveLink>
                </div>
                <div className="inline">
                  <ActiveLink href="/create_market">Create Market</ActiveLink>
                </div>
              </div>
            </div>
            <Component {...pageProps} />
          </div>
        </ReactUIWalletModalProviderDynamic>
      </ClientWalletProvider>
    </ConnectionProvider>
  );
}
