/**
 * This is the main entry file, which we compile the main JS bundle from. It
 * only contains the client side routing setup.
 */

// Needed for ES6 generators (redux-saga) to work
import 'babel-polyfill';
import 'whatwg-fetch'; // CO-63: polyfill for window.fetch
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import Item from './screens/Item';
import List from './screens/List';
import DefaultHome from './screens/Home';

import store from './store';

import { ActionCreators } from './lmc/actions/actions';
import { setActiveFilters, loadItems } from './screens/List/actions';
import ReactGA from 'react-ga';
import initializeFirebase from '../utils/firebase';

const GA_ID = Keystone.ga && Keystone.ga.property && Keystone.production;
if (GA_ID) ReactGA.initialize(Keystone.ga.property);
function fireGATracking () {
	if (GA_ID) ReactGA.pageview(window.location.pathname);
}

// Loading custom LMC view
import LmcOrganisationScreen from './lmc/screens/Organisation/index.jsx';
import LmcTeamScreen from './lmc/screens/Organisation/components/LmcTeamScreen.jsx';
import LmcShiftPasswordsScreen from './lmc/screens/Organisation/components/LmcShiftPasswordsScreen.jsx';
import LmcOrganisationDocuments from './lmc/screens/Organisation/components/LmcOrganisationDocuments.jsx';

import LmcResidentsScreen from './lmc/screens/Residents/index.jsx';
import LmcResidentProfile from './lmc/screens/Residents/components/LmcResidentProfile.jsx';
import LmcResidentReports from './lmc/screens/Residents/components/LmcResidentReports.jsx';
import LmcResidentToDos from './lmc/screens/Residents/components/LmcResidentToDos.jsx';
import LmcResidentCharts from './lmc/screens/Residents/components/LmcResidentCharts.jsx';
import LmcResidentDocuments from './lmc/screens/Residents/components/LmcResidentDocuments.jsx';

import LmcTodosView from './lmc/screens/Todos/index.jsx';
import LmcReportView from './lmc/screens/Reports/index.jsx';
import LmcFluidsOverview from './lmc/screens/Reports/Charts/charts/LmcFluidsOverview.jsx';
import LmcMealsOverview from './lmc/screens/Reports/Charts/charts/LmcMealsOverview.jsx';
import LmcAdminReportView from './lmc/screens/AdminReports/index.jsx';
import LmcAdminDashboard from './lmc/screens/AdminReports/LmcAdminDashboard.jsx';
import LmcAdminHomeDashboard from './lmc/screens/AdminReports/LmcAdminHomeDashboard.jsx';
import LmcCharts from './lmc/screens/Reports/Charts/index.jsx';
import LmcHome from './lmc/screens/Home/index.jsx';

// Sync the browser history to the Redux store
const history = syncHistoryWithStore(browserHistory, store);

// Load LMC lists
store.dispatch(ActionCreators.initialize());

// Initialise firebase
initializeFirebase();

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

let HomePage = Keystone.user.role === 'carehome-admin'
	? LmcHome
	: DefaultHome;

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={fireGATracking} history={history}>
			<Route path={Keystone.adminPath} component={App}>
				<IndexRoute component={HomePage} />
				<Route path="organisation" component={LmcOrganisationScreen}>
					<IndexRedirect to='/admin/organisation/team' />
					<Route path='team' component={LmcTeamScreen} />
					<Route path='shift-passwords' component={LmcShiftPasswordsScreen} />
					<Route path='documents' component={LmcOrganisationDocuments} />
				</Route>
				<Route path="residents" component={LmcResidentsScreen}>
					<IndexRedirect to='/admin/residents/profile' />
					<Route path='profile' component={LmcResidentProfile} />
					<Route path='daily-report' component={LmcResidentReports} />
					<Route path='to-do' component={LmcResidentToDos} />
					<Route path='charts' component={LmcResidentCharts} />
					<Route path='documents' component={LmcResidentDocuments} />
				</Route>
				<Route path="admin-reports" component={LmcAdminReportView} onChange={onListChange}>
					<Route path="dashboard" component={LmcAdminDashboard} />
					<Route path="home" component={LmcAdminHomeDashboard} />
					<Route path="home/:home_id" component={LmcAdminHomeDashboard} />
				</Route>
				<Route path="todos/dashboard" component={LmcTodosView} onChange={onListChange} />
				<Route path="reports" component={LmcReportView} onChange={onListChange}>
					<Route path="charts" component={LmcCharts} />
					<Route path="charts/:chart_type/:resident_id" component={LmcCharts} />
					<Route path="overview/fluids" component={LmcFluidsOverview} />
					<Route path="overview/meals" component={LmcMealsOverview} />
				</Route>
				<Route path=":listId" component={List} onChange={onListChange} />
				<Route path=":listId/:itemId" component={Item} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('react-root')
);

