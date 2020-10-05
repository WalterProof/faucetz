import React, { useContext, useEffect, useState } from "react";
import { validateAddress, ValidationResult } from "@taquito/utils";
import { Tezos } from "@taquito/taquito";
import { NetworkContext } from "../Context";
import FaucetAccount from "../components/FaucetAccount";
import useFaucet from "../hooks/useFaucet";
import { Warning, Info } from "../components/Messages";

export default function Faucet() {
  const { network } = useContext(NetworkContext);
  const { isLoading, pkh, balance, error } = useFaucet(network, true);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(25);
  const [transferRequested, setTransferRequested] = useState(false);
  const [balanceRefresh, setBalanceRefresh] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [formErrors, setFormErrors] = useState([] as string[]);
  const [info, setInfo] = useState("");

  const showFormErrors = (e: Array<string>) =>
    e.map((message, i) => (
      <Warning title="Validation error" key={i}>
        {message}
      </Warning>
    ));

  const showInfo = (message: string) => <Info>{message}</Info>;

  if (error) {
    setAlertMsg(error);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors([]);

    const errors = [];
    if (validateAddress(toAddress) !== ValidationResult.VALID) {
      errors.push("Please check the destination address");
    }

    if (isNaN(amount)) {
      errors.push("Please enter a valid amount");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
    } else {
      setTransferRequested(true);
      setInfo("Transfer operation pending...");
    }
  };

  useEffect(() => {
    async function transfer() {
      try {
        const op = await Tezos.contract.transfer({
          to: toAddress,
          amount: amount,
        });
        setInfo(`operation ${op.hash} in progress`);
        await op.confirmation(1);
        setInfo(`operation ${op.hash} confirmed`);
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
      {formErrors.length > 0 && showFormErrors(formErrors)}
      {info && showInfo(info)}
      {alertMsg && <p>{alertMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block">
            <span className="text-gray-700">Amount:</span>
            <input
              className="form-input mt-1 block w-full"
              id="amount"
              defaultValue={25}
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
