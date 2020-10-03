import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box, Container } from "theme-ui";
import { NetworkContext } from "./Context";
import { DEFAULT_NETWORK } from "./config";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AccountGenerator from "./pages/AccountGenerator";
import Faucet from "./pages/Faucet";

function App() {
  const [network, setNetwork] = useState(DEFAULT_NETWORK);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <BrowserRouter>
          <Header />
          <Container sx={{ flex: 1 }}>
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
          </Container>
        </BrowserRouter>
        <Footer />
      </Box>
    </NetworkContext.Provider>
  );
}

export default App;
