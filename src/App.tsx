import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { DEFAULT_NETWORK } from "./config";
import { TezosContext } from "./Context";
import AccountGenerator from "./pages/AccountGenerator";
import Faucet from "./pages/Faucet";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { NODES } from "./config";
import Tezos from "./Tezos";

function App() {
    const [tezos, setTezos] = useState(Tezos(NODES[DEFAULT_NETWORK]));
    const [network, setNetwork] = useState(DEFAULT_NETWORK);

    return (
        <TezosContext.Provider value={{ tezos, setTezos, network, setNetwork }}>
            <div className="container g-MainContent">
                <BrowserRouter>
                    <Header />
                    <main>
                        <Switch>
                            <Route exact path="/">
                                <Faucet />
                            </Route>
                            <Route path="/account-generator">
                                <AccountGenerator />
                            </Route>
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
            <Footer />
        </TezosContext.Provider>
    );
}

export default App;
