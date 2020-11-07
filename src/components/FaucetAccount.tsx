import React, { FunctionComponent } from "react";
import DisplayAmount from "./DisplayAmount";
import { explore, shortenAddress } from "../Tezos";

type FaucetAccountProps = {
    balance: string;
    pkh: string;
};

const FaucetAccount: FunctionComponent<FaucetAccountProps> = ({
    balance,
    pkh,
}) => {
    return (
        <div className="f-FaucetAccount">
            <div>
                {shortenAddress(pkh)} <DisplayAmount amount={balance} />
                <a
                    href={explore("delphinet", pkh)}
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
