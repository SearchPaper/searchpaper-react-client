import { Route, Switch } from "wouter";

const App = () => (
  <>
    <Switch>
      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
);

export default App;
