import Head from "next/head";
import styles from "../styles/Home.module.css";
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

import React from "react";
import { fetchData } from "./openbook";

export default function Home() {
  const [selectedColor, setSelectedColor] = React.useState("default");

  const [markets, setMarkets] = useState([
    { market: "", baseMint: "", quoteMint: "", name: "" },
  ]);

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
        console.log(e.message);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Table isStriped aria-label="All Markets">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={markets}>
          {(item) => (
            <TableRow key={item.market}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <br></br>
      <footer>
        <a
          href="https://github.com/openbook-dex/openbook-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by OPENBOOK Team
        </a>
      </footer>
    </div>
  );
}
