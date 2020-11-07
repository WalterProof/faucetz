import React, { FunctionComponent, useContext } from "react";
import DisplayAmount from "./DisplayAmount";
import { explore, shortenAddress } from "../Tezos";
import { TezosContext } from "../Context";

type FaucetAccountProps = {
    balance: string;
    pkh: string;
};

const FaucetAccount: FunctionComponent<FaucetAccountProps> = ({
    balance,
    pkh,
}) => {
    const { network } = useContext(TezosContext);

    return (
        <div className="f-FaucetAccount">
            <div>
                {shortenAddress(pkh)} <DisplayAmount amount={balance} />
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
        </div>
    );
};

export default FaucetAccount;
