/** @jsx jsx */
import { useEffect, useState } from "react";
import { validateAddress, ValidationResult } from "@taquito/utils";
import { Tezos } from "@taquito/taquito";
import {
    Alert,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    Label,
    Slider,
    jsx
} from "theme-ui";
import Header from "./components/Header";
import Network from "./components/Network";
import DisplayAmount from "./components/DisplayAmount";

function App() {
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState(25);
    const [alertMsg, setAlertMsg] = useState("");
    const [transferRequested, setTransferRequested] = useState(false);
    const [balanceRefresh, setBalanceRefresh] = useState(false);

    useEffect(() => {
        async function transfer() {
            try {
                const op = await Tezos.contract.transfer({
                    to: toAddress,
                    amount: amount
                });

                setAlertMsg(`operation ${op.hash} in progress`);

                await op.confirmation(1);

                setAlertMsg(`operation ${op.hash} confirmed`);
                setBalanceRefresh(true);
            } catch (e) {
                setAlertMsg(
                    `oops something bad happened: ${JSON.stringify(e)}`
                );
            }
        }

        if (transferRequested) {
            transfer();
            setTransferRequested(false);
        }

        return () => {
            setBalanceRefresh(false);
        };
    }, [amount, toAddress, transferRequested]);

    return (
        <Container p={1}>
            <Flex sx={{ flexDirection: "column" }}>
                <Header />
                {alertMsg && <Alert my={2}>{alertMsg}</Alert>}
                <Network balanceRefresh={balanceRefresh} />
                <Box
                    as="form"
                    onSubmit={e => {
                        e.preventDefault();
                        if (
                            validateAddress(toAddress) !==
                            ValidationResult.VALID
                        ) {
                            setAlertMsg("Please check the destination address");
                        } else {
                            setTransferRequested(true);
                            setAlertMsg("Transfer operation pending...");
                        }
                    }}
                >
                    <Heading as="h2" my={2}>
                        Select an amount and address
                    </Heading>
                    <Flex sx={{ justifyContent: "space-between" }}>
                        <Label htmlFor="amount" sx={{ width: "auto" }}>
                            Amount
                        </Label>
                        <DisplayAmount amount={amount} />
                    </Flex>
                    <Slider
                        id="amount"
                        defaultValue={amount}
                        onChange={e => setAmount(parseInt(e.target.value))}
                    />
                    <Label htmlFor="toAddress">To Address</Label>
                    <Input
                        placeholder="tz1xxx1234"
                        name="toAddress"
                        id="toAddress"
                        mb={3}
                        onChange={e => setToAddress(e.target.value)}
                    />

                    <Button>Submit</Button>
                </Box>
            </Flex>
        </Container>
    );
}

export default App;
