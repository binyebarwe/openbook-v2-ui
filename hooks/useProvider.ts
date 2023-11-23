import { AnchorProvider } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useConnection } from "./useOpenbookClient";

export function useProvider() {
  const connection = useConnection();
  const wallet = useWallet();

  const provider = useMemo(
    () => new AnchorProvider(connection, wallet as any, {}),
    [connection, wallet]
  );

  return provider;
}
