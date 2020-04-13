import React from 'react';
import {Switch, Route} from 'react-router';

import {NotFound} from '../../shared/components';

export default () => (
  <Switch>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);
