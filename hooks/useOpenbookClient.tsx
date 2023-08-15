import { OpenBookV2Client } from "@openbook-dex/openbook-v2";
import { Connection } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { WalletAdapter } from "../utils/utils";
import { RPC, programId } from "../utils/openbook";

export function useOpenbookClient(): OpenBookV2Client {
  const provider = useProvider();

  let client = new OpenBookV2Client(programId, provider);
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
