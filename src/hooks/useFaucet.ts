import { useEffect, useState } from "react";
import { InMemorySigner } from "@taquito/signer";
import FAUCETS from "../faucets.json";
import { TezosToolkit } from "@taquito/taquito";

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

const useFaucet = (tezos: TezosToolkit) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pkh, setPKH] = useState("");

    useEffect(() => {
        const initialize = async () => {
            try {
                setLoading(true);
                setError("");

                tezos.setSignerProvider(signer);

                const pkh = await tezos.signer.publicKeyHash();
                setPKH(pkh);

                const balance = await tezos.tz.getBalance(pkh);
                if (balance.isZero()) await tezos.tz.activate(pkh, secret);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        initialize();
    }, [tezos]);

    return { loading, pkh, error };
};

export default useFaucet;
