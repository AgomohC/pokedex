import React from "react";
import { Switch, Route } from "react-router-dom";
import Pokemon from "./pokemon";
import Pokedex from "./pokedex";

const App = () => {
   return (
      <Switch>
         <Route exact path="/" render={(props) => <Pokedex {...props} />} />
         <Route
            exact
            path="/:pokemonId"
            render={(props) => <Pokemon {...props} />}
         />
      </Switch>
   );
};

export default App;
