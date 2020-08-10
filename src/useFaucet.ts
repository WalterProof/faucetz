import {useEffect, useState} from "react";
import {Tezos} from "@taquito/taquito";
import {InMemorySigner} from "@taquito/signer";
import BigNumber from "bignumber.js";
import CARTHAGE_FAUCET from "./faucets/tz1KxuxXF1xu2dH7pkPQaJrUoBbLn8SsijWG.json";
import DALPHA_FAUCET from "./faucets/tz1SobXCTNgZvX6JBgdXnC5yz4J7zXqfFF4C.json";

type Nodes = {[key: string]: string};
export const NODES: Nodes = {
    carthagenet: "https://testnet-tezos.giganode.io",
    dalphanet: "https://35.187.1.13"
};

function useFaucet(rpc: string, balanceRefresh: boolean) {
    const faucet = NODES.carthagenet.includes(rpc)
        ? CARTHAGE_FAUCET
        : DALPHA_FAUCET;
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

    useEffect(() => {
        async function initialize() {
            setIsLoading(true);
            const pkh = await Tezos.signer.publicKeyHash();
            setPKH(pkh);

            const balance = await Tezos.tz.getBalance(pkh);
            setBalance(
                `${new BigNumber(Tezos.format("mutez", "tz", balance)).toFixed(
                    2
                )}`
            );

            if (balance.isZero()) {
                await Tezos.tz.activate(pkh, secret);
            }

            setIsLoading(false);
        }
        initialize();
    }, [balanceRefresh, secret]);

    return {isLoading, pkh, balance};
}

export default useFaucet;
