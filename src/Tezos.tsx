import { Tezos } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import BigNumber from "bignumber.js";
import FAUCETS from "./faucets.json";

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

export async function useFaucet(rpc: string): Promise<[string, string]> {
  Tezos.setProvider({ rpc, signer });
  const pkh = await Tezos.signer.publicKeyHash();
  const balance = await Tezos.tz.getBalance(pkh);
  const balanceHR = `${new BigNumber(
    Tezos.format("mutez", "tz", balance)
  ).toFixed(2)}`;

  if (balance.isZero()) {
    await Tezos.tz.activate(pkh, secret);
  }
  return [pkh, balanceHR];
}
