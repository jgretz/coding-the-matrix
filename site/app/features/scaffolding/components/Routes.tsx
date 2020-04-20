import React from 'react';
import {Switch, Route} from 'react-router';

import {Lab05, Lab1} from '../../exercises/components';
import {NotFound} from '../../shared/components';

export default () => (
  <Switch>
    <Route path="/lab05">
      <Lab05 />
    </Route>
    <Route path="/lab1">
      <Lab1 />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);
