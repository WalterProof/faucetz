import {useEffect, useState} from "react";
import {Tezos} from "@taquito/taquito";
import {InMemorySigner} from "@taquito/signer";
import BigNumber from "bignumber.js";
import {FAUCETS} from "./config";

function useFaucet(rpc: string, balanceRefresh: boolean) {
    const faucet = FAUCETS[rpc];
    const {email, password, mnemonic, secret} = faucet;

    const signer = InMemorySigner.fromFundraiser(
        email,
        password,
        mnemonic.join(" ")
    );
    Tezos.setProvider({rpc, signer});
    const [isLoading, setIsLoading] = useState(true);
    const [pkh, setPKH] = useState("");
    const [balance, setBalance] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function initialize() {
            setIsLoading(true);
            try {
                const pkh = await Tezos.signer.publicKeyHash();
                setPKH(pkh);

                const balance = await Tezos.tz.getBalance(pkh);
                setBalance(
                    `${new BigNumber(
                        Tezos.format("mutez", "tz", balance)
                    ).toFixed(2)}`
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
    }, [balanceRefresh, secret]);

    return {isLoading, pkh, balance, error};
}

export default useFaucet;
