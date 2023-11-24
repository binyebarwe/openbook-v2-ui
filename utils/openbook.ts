import {
  findAllMarkets,
  MarketAccount,
  BookSideAccount,
  OPENBOOK_PROGRAM_ID,
} from "@openbook-dex/openbook-v2";
import { PublicKey } from "@solana/web3.js";
import {
  useOpenbookClient,
  useConnection,
  useFakeProvider,
} from "../hooks/useOpenbookClient";

export const RPC =
  "https://misty-wcb8ol-fast-mainnet.helius-rpc.com/";

let client = useOpenbookClient();

export const fetchData = async () => {
  const connection = useConnection();
  const provider = useFakeProvider();
  let markets = await findAllMarkets(connection, OPENBOOK_PROGRAM_ID, provider);
  return markets;
};

export const getMarket = async (publicKey: string): Promise<MarketAccount> => {
  let market = await client.getMarketAccount(new PublicKey(publicKey));
  return market ? market : ({} as MarketAccount);
};

export const getBookSide = async (
  publicKey: PublicKey
): Promise<BookSideAccount> => {
  let bookSide = await client.getBookSide(publicKey);
  return bookSide ? bookSide : ({} as BookSideAccount);
};
