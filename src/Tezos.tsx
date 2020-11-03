export const shortenAddress = (addr: string) =>
    addr.slice(0, 6) + "..." + addr.slice(addr.length - 6);

export const explore = (network: string, address: string) => {
    switch (network) {
        case "carthagenet":
            return `https://carthage.tzkt.io/${address}`;
        case "dalphanet":
            return `https://dalpha.tzstats.com/${address}`;
        case "delphinet":
            return `https://delphi.tzkt.io/${address}`;
    }
};
