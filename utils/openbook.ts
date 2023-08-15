import {
  findAllMarkets,
  MarketAccount,
  BookSideAccount,
} from "@openbook-dex/openbook-v2";
import { PublicKey } from "@solana/web3.js";
import {
  useOpenbookClient,
  useConnection,
  useProvider,
} from "../hooks/useOpenbookClient";

// export const RPC = "http://127.0.0.1:8899";
export const RPC = "https://mango.devnet.rpcpool.com/";
export const programId = new PublicKey(
  "opnbkNkqux64GppQhwbyEVc3axhssFhVYuwar8rDHCu"
);
let client = useOpenbookClient();

export const fetchData = async () => {
  const connection = useConnection();
  const provider = useProvider();
  let markets = await findAllMarkets(connection, programId, provider);

  return markets;
};

export const getMarket = async (publicKey: string): Promise<MarketAccount> => {
  let market = await client.getMarket(new PublicKey(publicKey));
  return market ? market : ({} as MarketAccount);
};

export const getBookSide = async (
  publicKey: PublicKey
): Promise<BookSideAccount> => {
  let bookSide = await client.getBookSide(publicKey);
  return bookSide ? bookSide : ({} as BookSideAccount);
};
