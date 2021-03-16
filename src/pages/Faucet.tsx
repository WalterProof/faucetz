import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { validateAddress, ValidationResult } from "@taquito/utils";
import { TransferParams } from "@taquito/taquito/dist/types/operations/types";
import { TezosContext } from "../Context";
import FaucetAccount from "../components/FaucetAccount";
import useFaucet from "../hooks/useFaucet";
import useTezosDomains, { NetworkType } from "../hooks/useTezosDomains";
import { Panic, Info } from "../components/Messages";
import NetworkSelector from "../components/NetworkSelector";

const Faucet = () => {
    const { tezos, network } = useContext(TezosContext);
    const [panic, setPanic] = useState("");
    const [refreshFaucetBalance, setRefreshFaucetBalance] = useState(0);
    const [tezosDomainsClient] = useTezosDomains(tezos, network as NetworkType);
    const {
        loading: faucetIsLoading,
        pkh: faucetPKH,
        error: faucetError,
    } = useFaucet(tezos.getTK());
    const [info, setInfo] = useState("");

    const { register, handleSubmit, errors } = useForm<TransferParams>();

    const onSubmit = async (data: TransferParams) => {
        await transfer(data);
    };

    const transfer = async (p: TransferParams) => {
        try {
            if (
                tezosDomainsClient !== undefined &&
                network === "edonet" &&
                p.to.endsWith(".edo")
            ) {
                setInfo(`resolving domain ${p.to}...`);
                const address = await tezosDomainsClient.resolver.resolveNameToAddress(
                    p.to
                );
                if (address) {
                    setInfo(`address resolved: ${address}`);
                    p.to = address;
                }
            }

            setInfo(`preparing new operation...`);
            const op = await tezos.transfer(p);
            setInfo(`operation ${op.hash} in progress`);
            await op.confirmation(1);
            setInfo(`operation ${op.hash} confirmed`);
            setRefreshFaucetBalance(refreshFaucetBalance + 1);
        } catch (e) {
            console.log(e);
            setPanic(`oops something bad happened: ${JSON.stringify(e)}`);
        }
    };

    const showInfo = (message: string) => <Info>{message}</Info>;

    const validateAddressInput = (value: string): boolean =>
        validateAddress(value) === ValidationResult.VALID ||
        (value.endsWith(".edo") && network === "edonet");

    return (
        <div>
            {faucetIsLoading ? (
                <span className="spinner"></span>
            ) : faucetError ? (
                showInfo("Sorry, faucet could not be loaded :(")
            ) : (
                <div>
                    {panic && <Panic title="Operation error">{panic}</Panic>}
                    {info && showInfo(info)}
                    <div className="f-FaucetSettings">
                        <NetworkSelector />
                        <FaucetAccount
                            refresh={refreshFaucetBalance}
                            pkh={faucetPKH}
                        />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block">
                                <span className="text-gray-700">Amount:</span>
                                <input
                                    className="block w-full mt-1 form-input"
                                    defaultValue={25}
                                    name="amount"
                                    ref={register({
                                        validate: (value) => value > 0,
                                    })}
                                    type="number"
                                />
                                {errors.amount && (
                                    <p className="g-FormError" role="alert">
                                        Please enter an amount greater than 0
                                    </p>
                                )}
                            </label>
                        </div>
                        <div>
                            <label className="block">
                                <span className="text-gray-700">
                                    Destination address
                                    {network === "edonet"
                                        ? " (or .edo domain name)"
                                        : ""}
                                    :
                                </span>
                                <input
                                    className="block w-full mt-1 form-input"
                                    aria-invalid={errors.to ? "true" : "false"}
                                    ref={register({
                                        validate: validateAddressInput,
                                    })}
                                    name="to"
                                    placeholder="tz1xxx1234"
                                    type="text"
                                />
                                {errors.to && (
                                    <p className="g-FormError" role="alert">
                                        Please enter a valid address
                                    </p>
                                )}
                            </label>
                        </div>
                        <div className="f-Form_submit">
                            <button className="btn">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Faucet;
