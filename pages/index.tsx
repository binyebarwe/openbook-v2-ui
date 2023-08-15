import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

import React from "react";
import { fetchData, getBookSide, getMarket } from "../utils/openbook";

import { LinkIcon } from "@heroicons/react/24/outline";
import {
  MarketAccount,
  nameToString,
  LeafNode,
  AnyNode,
} from "@openbook-dex/openbook-v2";

function keyForFixedPrice(key, priceData) {
  const upper = BigInt(priceData) << BigInt(64);
  const lower = BigInt(key) & BigInt("0xFFFFFFFFFFFFFFFF");
  return upper | lower;
}

function priceData(key) {
  return key >> 64;
}

export default function Home() {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [markets, setMarkets] = useState([
    { market: "", baseMint: "", quoteMint: "", name: "" },
  ]);
  const [market, setMarket] = useState({} as MarketAccount);

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "market",
      label: "Pubkey",
    },
    {
      key: "baseMint",
      label: "Base Mint",
    },
    {
      key: "quoteMint",
      label: "Quote Mint",
    },
  ];

  useEffect(() => {
    fetchData()
      .then((res) => {
        setMarkets(res);
        fetchMarket(res[0].market);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fetchMarket = async (key: string) => {
    const market = await getMarket(key);
    setMarket(market);
    // const bids = await getBookSide(market.bids);

    // const asks = await getBookSide(market.asks);
    // const leafNodes: LeafNode[] = asks.nodes.nodes.filter(
    //   (x: AnyNode) => x.tag == 2
    // );
    // console.log(leafNodes[0].clientOrderId)
    // for (let node of leafNodes) {
    //   console.log('leafnode: ',node, node.ownerSlot, node.owner, node.key, priceData(node.key));
    // }
  };

  const linkedPk = (pk: string) => (
    <div>
      {pk}
      <a
        href={`https://solscan.io/account/${pk}`}
        target="_blank"
        className="pl-2"
      >
        <LinkIcon className="w-4 h-4 inline" />
      </a>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Openbook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-full relative">
        <div className="flex flex-col gap-3 pb-2.5">
          <Table
            isStriped
            selectionMode="single"
            aria-label="Markets"
            onRowAction={async (key) => fetchMarket(key.toString())}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={markets}>
              {(item) => (
                <TableRow key={item.market}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey == "name"
                        ? getKeyValue(item, columnKey)
                        : linkedPk(getKeyValue(item, columnKey))}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <p>Name </p>
            {market.asks ? nameToString(market.name) : ""}
            <p>Base Mint </p>
            {market.asks ? market.baseMint.toString() : ""}
            <p>Quote Mint </p>
            {market.asks ? market.quoteMint.toString() : ""}
            <p>Bids </p>
            {market.asks ? market.bids.toString() : ""}
            <p>Asks </p>
            {market.asks ? market.asks.toString() : ""}
            <p>Event Queue </p>
            {market.asks ? market.eventQueue.toString() : ""}
          </div>

          <div className="">
            <p>Base Deposits </p>
            {market.asks ? market.baseDepositTotal.toString() : ""}
            <p>Quote Deposits </p>
            {market.asks ? market.quoteDepositTotal.toString() : ""}
            <p>Taker Fees </p>
            {market.asks ? market.takerFee.toString() : ""}
            <p>Maker Fees </p>
            {market.asks ? market.makerFee.toString() : ""}
            <p>Base Lot Size </p>
            {market.asks ? market.baseLotSize.toString() : ""}
            <p>Quote Lot Size </p>
            {market.asks ? market.quoteLotSize.toString() : ""}
            <p>Base Decimals </p>
            {market.asks ? market.baseDecimals : ""}
            <p>Quote Decimals </p>
            {market.asks ? market.quoteDecimals : ""}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>{market.asks ? market.baseDepositTotal.toString() : ""}</div>

          <div></div>
        </div>

        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Openbook Team
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}
