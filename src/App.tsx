import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Main from './components/Main/Main';
import Home from './pages/Home/index';
// import Category from "./pages/Catergory";

import ItemPage from './pages/Item/ItemPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/Profile/Profile';
import { useAuthContext } from './context/AuthContext';
import EditPage from './pages/EditPage';
import CreateItemPage from './pages/CreateItem/CreateItemPage';
import PageNotFound from './pages/PageNotFound/index';
import Category from './pages/Category/index';
import Checkout from './pages/Checkout/index';
import Search from './pages/Search/index';

const App: React.FC = () => {
	const { user } = useAuthContext();

	return (
		<Main>
			<Switch>
				<Route exact path={['/']} component={Home} />
				<Route exact path={'/s/:category'} component={Category} />
				<Route exact path='/s/:category/:slug' component={ItemPage} />
				<Route exact path='/auth'>
					{user?.token ? <Redirect to='/' /> : <AuthPage />}
				</Route>
				<Route exact path='/search' component={Search} />
				<PrivateRoute path='/profile' exact Component={ProfilePage} />
				<PrivateRoute path='/create' exact Component={CreateItemPage} />
				<PrivateRoute path='/checkout/:status' exact Component={Checkout} />
				<PrivateRoute path='/edit/item/:slug' exact Component={EditPage} />
				<Route path='*' component={PageNotFound} />
			</Switch>
		</Main>
	);
};

export default App;
