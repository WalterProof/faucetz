import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { DEFAULT_NETWORK } from "./config";
import { NetworkContext } from "./Context";
import AccountGenerator from "./pages/AccountGenerator";
import Faucet from "./pages/Faucet";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    const [network, setNetwork] = useState(DEFAULT_NETWORK);

    return (
        <NetworkContext.Provider value={{ network, setNetwork }}>
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
        </NetworkContext.Provider>
    );
}

export default App;
