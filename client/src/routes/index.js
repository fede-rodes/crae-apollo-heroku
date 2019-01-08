import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ScrollToTop, LoggedInRoute } from '../components/route-wrappers';
import AuthPage from '../pages/auth-page';
import AuthRoutes from './auth';

/**
 * @summary Entry point for logged in routes.
 */

const Routes = () => (
  <ScrollToTop>
    <Switch>
      <Route
        path="/auth/facebook"
        exact
        component={() => (<div>Hola</div>)}
      />
      <LoggedInRoute
        path="/"
        component={AuthRoutes} // in case user IS logged in, display this component
        authComponent={AuthPage} // in case user is NOT logged in, display the auth component
      />
    </Switch>
  </ScrollToTop>
);

export default Routes;
