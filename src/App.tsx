import { Route, Switch } from "wouter";
import ResponseAlerts from "./components/ResponseAlerts";

import HomePage from "./pages/home/HomePage";
import DocumentsPage from "./pages/documents/DocumentsPage";

const App = () => (
  <>
    <ResponseAlerts />
    <Switch>
      {/* Default route in a switch */}

      <Route path="/">
        <HomePage />
      </Route>

      <Route path="/documents">
        <DocumentsPage />
      </Route>
      <Route>404: No such page!</Route>
    </Switch>
  </>
);

export default App;
