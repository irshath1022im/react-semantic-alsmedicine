import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import ItemsHome from './Pages/ItemsHome';
import CreateConsumption from './Components/Consumption/CreateConsumption';

function App() {

  return (
    <div>
        <Header as="h2" block textAlign="center">ALS MEDICINE</Header>
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={ItemsHome} />
              <Route path="/consumption/create" exact component={CreateConsumption} />
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
