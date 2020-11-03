import React, { useContext } from "react";
import DisplayAmount from "./DisplayAmount";
import { shortenAddress, explore } from "../Tezos";
import { NetworkContext } from "../Context";

const FaucetAccount = (props: any) => {
    const { balance, pkh } = props;
    const { network } = useContext(NetworkContext);

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
