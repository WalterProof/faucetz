import React from "react";
import DisplayAmount from "./DisplayAmount";
import { shortenAddress } from "../Tezos";

const FaucetAccount = (props: any) => {
    const { balance, pkh } = props;

    return (
        <div className="f-FaucetAccount">
            <div>
                {shortenAddress(pkh)} <DisplayAmount amount={balance} />
            </div>
        </div>
    );
};

export default FaucetAccount;
