import { findAllMarkets, MarketAccount } from "openbook-v2";
import { PublicKey } from "@solana/web3.js";
import {
  useOpenbookClient,
  useConnection,
  useProvider,
} from "../hooks/useOpenbookClient";

const RPC = "http://127.0.0.1:8899";
const programId = new PublicKey("8qkavBpvoHVYkmPhu6QRpXRX39Kcop9uMXvZorBAz43o");

export const fetchData = async () => {
  const connection = useConnection();
  const provider = useProvider();
  let markets = await findAllMarkets(connection, programId, provider);
  console.log("Markets:", markets);

  let client = useOpenbookClient();
  client.getMarket(
    new PublicKey("6vRZYS4zXHeQS7tayyTSVxGfUwFfppoSkb5AsfhRc4f4")
  );

  return markets;
};

export const getMarket = async (
  publicKey: string
): Promise<MarketAccount | null> => {
  let client = useOpenbookClient();
  let market = await client.getMarket(new PublicKey(publicKey));
  return market ? market : ({} as MarketAccount);
};
