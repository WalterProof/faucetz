import React, { useContext } from "react";
import { TezosContext } from "../Context";
import { NODES } from "../config";
import Tezos from "../Tezos";

const NetworkSelector = () => {
    const { network } = useContext(TezosContext);

    return (
        <div className="g-NetworkSelector">
            <div>
                <span>{NODES[network]}</span>
                <TezosContext.Consumer>
                    {({ tezos, setTezos, network, setNetwork }) => (
                        <select
                            defaultValue={network}
                            onChange={(e) => {
                                setNetwork(e.target.value);
                                setTezos(Tezos(NODES[e.target.value]));
                            }}
                            className="form-select"
                        >
                            {Object.keys(NODES).map((network, i) => (
                                <option value={network} key={i}>
                                    {network}
                                </option>
                            ))}
                        </select>
                    )}
                </TezosContext.Consumer>
            </div>
        </div>
    );
};

export default NetworkSelector;
