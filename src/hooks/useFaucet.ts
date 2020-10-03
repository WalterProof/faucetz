import { useEffect, useState } from "react";
import { Tezos } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import BigNumber from "bignumber.js";
import FAUCETS from "../faucets.json";
import { NODES } from "../config";

type FaucetAccounts = Array<FaucetAccount>;
type FaucetAccount = {
  mnemonic: Array<string>;
  password: string;
  email: string;
  secret: string;
};

function pickRandomFaucet(faucets: FaucetAccounts): FaucetAccount {
  return faucets[(faucets.length * Math.random()) << 0];
}

const faucet = pickRandomFaucet(FAUCETS);
const { email, mnemonic, password, secret } = faucet;

const signer = InMemorySigner.fromFundraiser(
  email,
  password,
  mnemonic.join(" ")
);

function useFaucet(network: string, balanceRefresh: boolean) {
  const rpc = NODES[network];
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pkh, setPKH] = useState("");

  useEffect(() => {
    Tezos.setProvider({ rpc, signer });
    async function initialize() {
      setIsLoading(true);
      try {
        const pkh = await Tezos.signer.publicKeyHash();
        setPKH(pkh);

        const balance = await Tezos.tz.getBalance(pkh);
        setBalance(
          `${new BigNumber(Tezos.format("mutez", "tz", balance)).toFixed(2)}`
        );

        if (balance.isZero()) {
          await Tezos.tz.activate(pkh, secret);
        }
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    }
    initialize();
  }, [balanceRefresh, rpc]);

  return { isLoading, pkh, balance, error };
}

export default useFaucet;
