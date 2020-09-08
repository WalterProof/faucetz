import {useEffect, useState} from "react";
import {Tezos} from "@taquito/taquito";
import {InMemorySigner} from "@taquito/signer";
import BigNumber from "bignumber.js";
import CARTHAGE_FAUCET from "./faucets/tz1KxuxXF1xu2dH7pkPQaJrUoBbLn8SsijWG.json";
import DALPHA_FAUCET from "./faucets/tz1SobXCTNgZvX6JBgdXnC5yz4J7zXqfFF4C.json";
import DELPHI_FAUCET from "./faucets/tz1i974WAADaVHE1P7k9q9pPKA1cq4fdNJTg.json";

type Nodes = {[key: string]: string};
export const NODES: Nodes = {
    carthagenet: "https://testnet-tezos.giganode.io",
    dalphanet: "https://dalphanet-tezos.giganode.io",
    delphinet: "https://delphinet.duckdns.org"
};

const faucets = {
    [NODES.carthagenet]: CARTHAGE_FAUCET,
    [NODES.dalphanet]: DALPHA_FAUCET,
    [NODES.delphinet]: DELPHI_FAUCET
};

function useFaucet(rpc: string, balanceRefresh: boolean) {
    const faucet = faucets[rpc];
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
