import React, { useContext, useEffect, useState } from "react";
import { validateAddress, ValidationResult } from "@taquito/utils";
import { Tezos } from "@taquito/taquito";
import { NetworkContext } from "../Context";
import FaucetAccount from "../components/FaucetAccount";
import useFaucet from "../hooks/useFaucet";

export default function Faucet() {
  const { network } = useContext(NetworkContext);
  const { isLoading, pkh, balance, error } = useFaucet(network, true);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(25);
  const [alertMsg, setAlertMsg] = useState("");
  const [transferRequested, setTransferRequested] = useState(false);
  const [balanceRefresh, setBalanceRefresh] = useState(false);

  if (error) {
    setAlertMsg(error);
  }

  useEffect(() => {
    async function transfer() {
      try {
        const op = await Tezos.contract.transfer({
          to: toAddress,
          amount: amount,
        });

        setAlertMsg(`operation ${op.hash} in progress`);

        await op.confirmation(1);

        setAlertMsg(`operation ${op.hash} confirmed`);
        setBalanceRefresh(true);
      } catch (e) {
        setAlertMsg(`oops something bad happened: ${JSON.stringify(e)}`);
      }
    }

    if (transferRequested) {
      transfer();
      setTransferRequested(false);
    }

    return () => {
      setBalanceRefresh(false);
    };
  }, [amount, balanceRefresh, toAddress, transferRequested]);

  return isLoading ? (
    <span className="spinner"></span>
  ) : (
    <div>
      <FaucetAccount balance={balance} pkh={pkh} />
      {alertMsg && <p>{alertMsg}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateAddress(toAddress) !== ValidationResult.VALID) {
            setAlertMsg("Please check the destination address");
          } else {
            setTransferRequested(true);
            setAlertMsg("Transfer operation pending...");
          }
        }}
      >
        <div>
          <label className="block">
            <span className="text-gray-700">Amount:</span>
            <input
              className="form-input mt-1 block w-full"
              id="amount"
              defaultValue={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(parseInt(e.target.value))
              }
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Destination address:</span>
            <input
              className="form-input mt-1 block w-full"
              name="toAddress"
              placeholder="tz1xxx1234"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToAddress(e.target.value)
              }
            />
          </label>
        </div>
        <div className="f-Form_submit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
