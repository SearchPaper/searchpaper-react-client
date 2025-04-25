import { Route, Switch } from "wouter";
import ResponseAlerts from "./components/ResponseAlerts";

const App = () => (
  <>
    <ResponseAlerts />
    <Switch>
      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
);

export default App;
