import React, { useState } from "react";
import { crypto } from "sotez";

const AccountGenerator = () => {
    const [keypair, setKeypair] = useState();

    const generateKey = async () => {
        const mnemonic = crypto.generateMnemonic();
        const keypair = await crypto.generateKeys(mnemonic, "");
        setKeypair(keypair);
    };

    return (
        <div>
            {keypair && (
                <dl className="ag-Keys">
                    <dt>Mnemonic</dt>
                    <dd>{keypair.mnemonic}</dd>
                    <dt>Public key</dt>
                    <dd>{keypair.pk}</dd>
                    <dt>Public key hash</dt>
                    <dd>{keypair.pkh}</dd>
                    <dt>Secret key</dt>
                    <dd>{keypair.sk}</dd>
                </dl>
            )}
            <button onClick={generateKey}>
                {!keypair ? "Get fresh keypair" : "Gimme another one!"}
            </button>
        </div>
    );
};

export default AccountGenerator;
