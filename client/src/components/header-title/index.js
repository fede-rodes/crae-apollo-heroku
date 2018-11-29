import React from 'react';
import { Switch, Route } from 'react-router-dom';

// TODO: if the user isn't logged in, display Welcome at home page
const HeaderTitle = () => (
  <Switch>
    <Route path="/" exact render={() => <span>Home</span>} />
    <Route render={() => <span>Not Found</span>} />
  </Switch>
);

export default HeaderTitle;
