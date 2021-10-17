import { TezosToolkit } from "@taquito/taquito";
import { TransferParams } from "@taquito/taquito/dist/types/operations/types";
import { TransactionOperation } from "@taquito/taquito/dist/types/operations/transaction-operation";

export type TezosWrapper = {
    getTK(): TezosToolkit;
    transfer(params: TransferParams): Promise<TransactionOperation>;
};

export const shortenAddress = (addr: string) =>
    addr.slice(0, 6) + "..." + addr.slice(addr.length - 6);

export const explore = (network: string, address: string): string => {
    switch (network) {
        case "florencenet":
            return `https://florencenet.tzkt.io/${address}`;
        case "granadanet":
            return `https://granadanet.tzkt.io/${address}`;
        default:
            return "";
    }
};

const Tezos = (rpc: string): TezosWrapper => {
    const tk = new TezosToolkit(rpc);

    return {
        getTK: (): TezosToolkit => tk,

        transfer: async (params: TransferParams) =>
            tk.contract.transfer(params),
    };
};

export default Tezos;
