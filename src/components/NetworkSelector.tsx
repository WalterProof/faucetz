import React, { useContext } from "react";
import { NetworkContext } from "../Context";
import { NODES } from "../config";

const NetworkSelector = () => {
    const { network } = useContext(NetworkContext);

    return (
        <div className="g-NetworkSelector">
            <div>
                <span>{NODES[network]}</span>
                <NetworkContext.Consumer>
                    {({ network, setNetwork }) => (
                        <select
                            defaultValue={network}
                            onChange={(e) => setNetwork(e.target.value)}
                            className="form-select"
                        >
                            {Object.keys(NODES).map((network, i) => (
                                <option value={network} key={i}>
                                    {network}
                                </option>
                            ))}
                        </select>
                    )}
                </NetworkContext.Consumer>
            </div>
        </div>
    );
};

export default NetworkSelector;
