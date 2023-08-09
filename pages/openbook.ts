
import { findAllMarkets } from "openbook-v2";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { WalletAdapter } from "./utils";



const RPC = "http://127.0.0.1:8899";
const opts = {
  preflightCommitment: "processed",
};
const programId = "8qkavBpvoHVYkmPhu6QRpXRX39Kcop9uMXvZorBAz43o";

export const fetchData = async () => {
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
    console.log("Markets:", markets);
    return markets;
  };