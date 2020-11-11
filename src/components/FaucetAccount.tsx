import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import BigNumber from "bignumber.js";
import DisplayAmount from "./DisplayAmount";
import { explore, shortenAddress } from "../Tezos";
import { TezosContext } from "../Context";

type FaucetAccountProps = {
    refresh: number;
    pkh: string;
};

const FaucetAccount: FunctionComponent<FaucetAccountProps> = ({
    refresh,
    pkh,
}) => {
    const { network, tezos } = useContext(TezosContext);
    const [balance, setBalance] = useState("");

    useEffect(() => {
        let mounted = true;

        (async () => {
            const tk = tezos.getTK();

            setTimeout(() => {}, 3000);

            const balance = await tk.tz.getBalance(pkh);
            mounted &&
                setBalance(
                    `${new BigNumber(tk.format("mutez", "tz", balance)).toFixed(
                        2
                    )}`
                );
        })();

        return () => {
            mounted = false;
        };
    }, [pkh, refresh, tezos]);

    return (
        <div>
            <DisplayAmount amount={balance} />
            <br />
            {shortenAddress(pkh)}
            <a
                href={explore(network, pkh)}
                target="_new"
                className="f-FaucetAccount_explorer-link btn"
            >
                <span role="img" aria-label="explorer link to address">
                    🌐
                </span>
            </a>
        </div>
    );
};

export default FaucetAccount;
