import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import ItemsHome from './Pages/ItemsHome';
import CreateConsumption from './Components/Consumption/CreateConsumption';
import Receivings from './Pages/Receivings';
import NavigationMenu from './Components/Shared/NavigationMenu';
import Consumptions from './Pages/Consumptions';
import CreateItems from './Pages/Items/CreateItems';
import Login from './Pages/Auth/Login';
import ShowItem from './Pages/Items/ShowItem';

function App() {

  return (
    <div>
        <Header as="h2" block textAlign="center">ALS MEDICINE</Header>
      
        <BrowserRouter>
            <NavigationMenu />
            <Switch>
              <Route path="/" exact component={ItemsHome} />
              <Route path="/items" exact component={ItemsHome} />
              <Route path="/items/create"  exact component={CreateItems} />
              <Route path="/items/:id"  exact component={ShowItem} />
              <Route path="/receivings" component={Receivings} />
              <Route path="/consumptions" exact component={Consumptions} />
              <Route path="/consumptions/create" exact component={CreateConsumption} />
              <Route path="/login" exact component={Login} />
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
