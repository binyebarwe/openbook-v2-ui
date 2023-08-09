import Head from "next/head";
import styles from "../styles/Home.module.css";
import { findAllMarkets } from "openbook-v2";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { useEffect, useState } from "react";
import EventEmitter from "eventemitter3";

const RPC = "http://127.0.0.1:8899";
const opts = {
  preflightCommitment: "processed",
};
const programId = "8qkavBpvoHVYkmPhu6QRpXRX39Kcop9uMXvZorBAz43o";

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

export default function Home() {
  const [data, setData] = useState([
    ["Setting up the ledger", "Engineering", 400],
  ]);
  const [markets, setMarkets] = useState([
    { market: "sss", baseMint: "xxx", quoteMint: "xxx", name: "xxx" },
  ]);

  const FetchData = async () => {
    const connection = new Connection(RPC);
    const provider = new AnchorProvider(
      connection,
      { wallet: "wallet" } as WalletAdapter,
      {
        /** disable transaction verification step */
        skipPreflight: true,
        /** desired commitment level */
        commitment: "commited",
        /** preflight commitment level */
        preflightCommitment: "commited",
        /** Maximum number of times for the RPC node to retry sending the transaction to the leader. */
        maxRetries: 3,
        /** The minimum slot that the request can be evaluated at */
        minContextSlot: 10,
      }
    );
    let markets = await findAllMarkets(
      connection,
      new PublicKey(programId),
      provider
    );
    console.log("xxxx", markets);
    return markets;
  };

  useEffect(() => {
    FetchData()
      .then((res) => {
        console.log("doing it");
        setMarkets(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div></div>
      <table>
        <caption>{markets[0].market}</caption>
        <thead>
          <tr>
            <th>Items</th>
            <th scope="col">Expenditure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Donuts</th>
            <td>3,000</td>
          </tr>
          <tr>
            <th scope="row">Stationery</th>
            <td>18,000</td>
          </tr>
        </tbody>
      </table>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
