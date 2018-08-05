import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './graphql/user/fragment/user';
import {
  ScrollToTop,
  RouteWithProps,
} from './components/route-wrappers';

import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';

const Routes = props => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <RouteWithProps
        exact
        path="/"
        component={HomePage}
        {...props}
      />
      {/* NOT FOUND */}
      <Route
        component={NotFoundPage}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
