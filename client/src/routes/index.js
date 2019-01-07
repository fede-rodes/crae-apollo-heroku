import React from 'react';
import { Switch } from 'react-router-dom';
import { ScrollToTop, LoggedInRoute } from '../components/route-wrappers';
import AuthPage from '../pages/auth-page';
import AuthRoutes from './auth';

/**
 * @summary Renders log in screen to all unauthorized users.
 */

const Routes = () => (
  <ScrollToTop>
    <Switch>
      <LoggedInRoute
        path="/"
        component={AuthRoutes} // in case user IS logged in, display this component
        authComponent={AuthPage} // in case user is NOT logged in, display the auth component
      />
    </Switch>
  </ScrollToTop>
);

export default Routes;
