import { OpenBookV2Client, IDL, type OpenbookV2 } from "openbook-v2";
import { useMemo } from "react";
import { Connection, PublicKey, Cluster } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { WalletAdapter } from "../pages/utils";

const RPC = "http://127.0.0.1:8899";
const programId = new PublicKey("8qkavBpvoHVYkmPhu6QRpXRX39Kcop9uMXvZorBAz43o");

export function useOpenbookClient(): OpenBookV2Client {
  const provider = useProvider();

  let program = new Program<OpenbookV2>(IDL, programId, provider);
  let client = new OpenBookV2Client(program, programId, "devnet");
  return client;
}

export function useConnection(): Connection {
  return new Connection(RPC);
}

export function useProvider(): AnchorProvider {
  return new AnchorProvider(
    useConnection(),
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
}
