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

const App: React.FC = () => {
	const { user } = useAuthContext();

	//TODOD add 404 route

	return (
		<Main>
			<Switch>
				<Route exact path={['/']} component={Home} />

				<Route exact path='/s/:category/:slug' component={ItemPage} />
				<Route exact path='/auth'>
					{user?.token ? <Redirect to='/' /> : <AuthPage />}
				</Route>
				<PrivateRoute path='/profile' exact Component={ProfilePage} />
				<PrivateRoute path='/create' exact Component={CreateItemPage} />
				<PrivateRoute path='/edit/item/:slug' exact Component={EditPage} />
				<Route path='*' render={() => <div> not found </div>} />
			</Switch>
		</Main>
	);
};

export default App;
