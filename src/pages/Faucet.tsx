import React, { useContext, useEffect, useState } from "react";
import { validateAddress, ValidationResult } from "@taquito/utils";
import { Tezos } from "@taquito/taquito";
import {
  Alert,
  Box,
  Button,
  Field,
  Flex,
  Label,
  Slider,
  Spinner,
} from "theme-ui";
import { NetworkContext } from "../Context";
import DisplayAmount from "../components/DisplayAmount";
import FaucetAccount from "../components/FaucetAccount";
import useFaucet from "../hooks/useFaucet";

function Faucet() {
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
    <Spinner />
  ) : (
    <Flex sx={{ flexDirection: "column" }}>
      <FaucetAccount balance={balance} pkh={pkh} />
      {alertMsg && <Alert my={2}>{alertMsg}</Alert>}
      <Box
        as="form"
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
        <Flex sx={{ justifyContent: "space-between" }}>
          <Label htmlFor="amount" sx={{ width: "auto" }}>
            Amount
          </Label>
          <DisplayAmount amount={amount} />
        </Flex>
        <Slider
          id="amount"
          defaultValue={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(parseInt(e.target.value))
          }
        />
        <Field
          label="To Address"
          name="toAddress"
          placeholder="tz1xxx1234"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToAddress(e.target.value)
          }
        />

        <Button>Submit</Button>
      </Box>
    </Flex>
  );
}

export default Faucet;
