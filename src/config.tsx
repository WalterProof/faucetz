import CARTHAGE_FAUCET from "./faucets/tz1KxuxXF1xu2dH7pkPQaJrUoBbLn8SsijWG.json";
import DALPHA_FAUCET from "./faucets/tz1SobXCTNgZvX6JBgdXnC5yz4J7zXqfFF4C.json";
import DELPHI_FAUCET from "./faucets/tz1i974WAADaVHE1P7k9q9pPKA1cq4fdNJTg.json";

type Nodes = { [key: string]: string };

export const NODES: Nodes = {
    carthagenet: "https://testnet-tezos.giganode.io",
    dalphanet: "https://dalphanet-tezos.giganode.io",
    delphinet: "https://delphinet.duckdns.org"
};

export const FAUCETS = {
    [NODES.carthagenet]: CARTHAGE_FAUCET,
    [NODES.dalphanet]: DALPHA_FAUCET,
    [NODES.delphinet]: DELPHI_FAUCET
};

export const REPO_URL = "https://github.com/catsoap/faucetz";
