import React, { FunctionComponent, useState } from "react";
import { crypto } from "sotez";
import Store from "store";
import { shortenAddress } from "../Tezos";

type Keypair = {
    mnemonic: string;
    pk: string;
    pkh: string;
    sk: string;
};

const mapStoreKeys = (): string[] => {
    let list: string[] = [];
    Store.each((_, k) => list.push(k));
    return list;
};

const AccountGenerator: FunctionComponent<{
    initialGenerated?: Keypair;
    initialSelectedStoreKey?: string;
    initialStoreKeys?: string[];
}> = ({
    initialGenerated,
    initialSelectedStoreKey = undefined,
    initialStoreKeys = mapStoreKeys(),
}) => {
    const [generated, setGenerated] = useState(initialGenerated);
    const [storeKeys, setStoreKeys] = useState(initialStoreKeys);
    const [selectedStoreKey, setSelectedStoreKey] = useState(
        initialSelectedStoreKey
    );

    if (!selectedStoreKey && storeKeys.length > 0) {
        let sliced: string[] = storeKeys.slice(0, 1);
        setSelectedStoreKey(sliced[0]);
    }

    const storeClear = () => {
        Store.clearAll();
        setStoreKeys([]);
        setSelectedStoreKey(undefined);
    };
    const storeGet = (k: string): Keypair => Store.get(k);
    const storeSet = (kp: Keypair) => {
        Store.set(shortenAddress(kp.pkh), kp);
        setStoreKeys(mapStoreKeys());
    };

    const generateKey = async () => {
        const mnemonic = crypto.generateMnemonic();
        const g = await crypto.generateKeys(mnemonic, "");
        setGenerated(g);
    };

    return (
        <div className="ag">
            <div className="ag-Generated">
                <h2>
                    {!generated
                        ? "Please generate a new account"
                        : "New keypair!"}
                </h2>
                {generated && <Account kp={generated} />}
                {generated && (
                    <button className="btn" onClick={() => storeSet(generated)}>
                        Store
                    </button>
                )}
                <button className="btn" onClick={generateKey}>
                    {!generated ? "Get fresh keypair" : "Gimme another one!"}
                </button>
            </div>
            {storeKeys.length > 0 && (
                <div className="ag-Stored">
                    <h2>Your stored accounts</h2>
                    <div>
                        <ul>
                            {storeKeys.map((k: string, i) => (
                                <li
                                    key={i}
                                    className={
                                        selectedStoreKey === k
                                            ? "ag-Stored_selected"
                                            : ""
                                    }
                                >
                                    <button
                                        onClick={() => setSelectedStoreKey(k)}
                                    >
                                        {k}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div>
                            {selectedStoreKey && (
                                <Account kp={storeGet(selectedStoreKey)} />
                            )}
                        </div>
                    </div>
                    <button className="btn" onClick={storeClear}>
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
};

const Account: FunctionComponent<{ kp: Keypair }> = ({ kp }) => (
    <dl className="ag-Account">
        <dt>Mnemonic</dt>
        <dd>{kp.mnemonic}</dd>
        <dt>Public key</dt>
        <dd>{kp.pk}</dd>
        <dt>Public key hash</dt>
        <dd>{kp.pkh}</dd>
        <dt>Secret key</dt>
        <dd>{kp.sk}</dd>
    </dl>
);

export default AccountGenerator;
