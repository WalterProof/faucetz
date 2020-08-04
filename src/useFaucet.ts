import {useEffect, useState} from "react";
import {Tezos} from "@taquito/taquito";
import {InMemorySigner} from "@taquito/signer";
import BigNumber from "bignumber.js";

function useFaucet(
    rpc: string,
    email: string,
    password: string,
    mnemonic: string,
    secret: string
) {
    const signer = InMemorySigner.fromFundraiser(email, password, mnemonic);
    Tezos.setProvider({rpc, signer});

    const [isLoading, setIsLoading] = useState(true);
    const [pkh, setPKH] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        async function initialize() {
            setIsLoading(true);
            const pkh = await Tezos.signer.publicKeyHash();
            setPKH(pkh);

            const balance = await Tezos.tz.getBalance(pkh);
            setBalance(
                `${new BigNumber(Tezos.format("mutez", "tz", balance)).toFixed(
                    2
                )} ꜩ`
            );

            if (balance.isZero()) {
                await Tezos.tz.activate(pkh, secret);
            }

            setIsLoading(false);
        }
        initialize();
    }, [secret]);

    return {isLoading, pkh, balance};
}

export default useFaucet;
