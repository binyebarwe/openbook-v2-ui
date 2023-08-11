import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import ActiveLink from "../components/ActiveLink";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${inter.className} dark`}>
        <div className="w-full px-4 py-2 border-b-2">
          <div className="flex flex-row flex-wrap space-x-4">
            <div className="inline">
              <ActiveLink href="/">Markets</ActiveLink>
            </div>
            <div className="inline">
              <ActiveLink href="/create_market">Create Market</ActiveLink>
            </div>
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
