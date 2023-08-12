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
import { fetchData, getMarket } from "./openbook";

import { LinkIcon } from "@heroicons/react/24/outline";
import { MarketAccount, nameToString } from "openbook-v2";

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
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fetchMarket = async (key: string) => {
    const market = await getMarket(key);
    setMarket(market);


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
        <div className="flex flex-col gap-3 pb-2.5">
          <p>Name </p>
          {market.asks ? nameToString(market.name) : ""}
          <p>Base Mint </p>
          {market.asks ? market.asks.toString() : ""}
          <p>Quote Mint </p>
          {market.asks ?  market.asks.toString() : ""}
          <p>Bids </p>
          {market.asks ? market.asks.toString() : ""}
          <p>Asks </p>
          {market.asks ? market.asks.toString() : ""}
          <p>Event Queue </p>
          {market.asks ? market.asks.toString() : ""}
        </div>

        <footer className="bottom-0 w-full h-2.5 absolute">
          <a
            href="https://github.com/openbook-dex/openbook-v2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by OPENBOOK Team
          </a>
        </footer>
      </div>
    </div>
  );
}
