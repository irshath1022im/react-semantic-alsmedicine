import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import ItemsHome from './Pages/ItemsHome';
import CreateConsumption from './Components/Consumption/CreateConsumption';
import Receivings from './Pages/Receivings';
import NavigationMenu from './Components/Shared/NavigationMenu';
import Consumptions from './Pages/Consumptions';

function App() {

  return (
    <div>
        <Header as="h2" block textAlign="center">ALS MEDICINE</Header>
      
        <BrowserRouter>
            <NavigationMenu />
            <Switch>
              <Route path="/" exact component={ItemsHome} />
              <Route path="/receivings" component={Receivings} />
              <Route path="/consumptions" component={Consumptions} />
              <Route path="/consumption/create" exact component={CreateConsumption} />
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
