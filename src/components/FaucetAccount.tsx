import React from "react";
import DisplayAmount from "./DisplayAmount";

export default function FaucetAccount(props: any) {
  const { balance, pkh } = props;

  return (
    <div className="f-FaucetAccount">
      <div>
        {pkh} <DisplayAmount amount={balance} />
      </div>
    </div>
  );
}
