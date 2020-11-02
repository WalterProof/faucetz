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

const pickRandomFaucet = (faucets: FaucetAccounts): FaucetAccount => {
    return faucets[(faucets.length * Math.random()) << 0];
};

const faucet = pickRandomFaucet(FAUCETS);
const { email, mnemonic, password, secret } = faucet;

const signer = InMemorySigner.fromFundraiser(
    email,
    password,
    mnemonic.join(" ")
);

const useFaucet = (network: string, balanceRefresh: boolean) => {
    const rpc = NODES[network];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pkh, setPKH] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        let ignore = false;
        const initialize = async () => {
            try {
                setLoading(true);
                setError("");

                Tezos.setProvider({ rpc, signer });
                const pkh = await Tezos.signer.publicKeyHash();
                if (!ignore) setPKH(pkh);

                const balance = await Tezos.tz.getBalance(pkh);
                if (!ignore)
                    setBalance(
                        `${new BigNumber(
                            Tezos.format("mutez", "tz", balance)
                        ).toFixed(2)}`
                    );

                if (!ignore && balance.isZero()) {
                    await Tezos.tz.activate(pkh, secret);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        initialize();
        return () => {
            ignore = true;
        };
    }, [rpc, balanceRefresh]);

    return { loading, pkh, balance, error };
};

export default useFaucet;
