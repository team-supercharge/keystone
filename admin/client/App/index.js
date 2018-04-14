/**
 * This is the main entry file, which we compile the main JS bundle from. It
 * only contains the client side routing setup.
 */

// Needed for ES6 generators (redux-saga) to work
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import Item from './screens/Item';
import List from './screens/List';

import store from './store';

import { setActiveFilters, loadItems } from './screens/List/actions';


// Loading custom LMC view
import LmcReportView from './lmc/screens/Report/index.jsx';
import Daily from './lmc/screens/Report/Daily/index.jsx';
import ItemDashboard from './lmc/screens/Report/ItemDashboard/ItemDashboard';
import Home from './lmc/screens/Home/index.jsx';

// Sync the browser history to the Redux store
const history = syncHistoryWithStore(browserHistory, store);

// Initialise Keystone.User list
import { listsByKey } from '../utils/lists';
Keystone.User = listsByKey[Keystone.userList];

function onListChange (prevState, { location }) {
	Object.keys(location.query).forEach((key) => {
		try {
			const filters = JSON.parse(location.query[key]);
			store.dispatch(setActiveFilters(filters));
			store.dispatch(loadItems());
		} catch (e) {
			console.warn('Invalid filter provided', e);
		}
	});
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path={Keystone.adminPath} component={App}>
				<IndexRoute component={Home} />
				<Route path="reports" component={LmcReportView}>
					<Route path="daily" component={Daily} />
					<Route path="item-dashboard" component={ItemDashboard} />
				</Route>
				<Route path=":listId" component={List} onChange={onListChange} />
				<Route path=":listId/:itemId" component={Item} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('react-root')
);

