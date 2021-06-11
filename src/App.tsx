import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Main from "./components/Main/Main";
import Home from "./pages/AllItems";
import Category from "./pages/Catergory";

import Item from "./pages/Item";
import AuthPage from "./pages/AuthPage";
import { useAuthContext } from "./context/AuthContext";
import ProfilePage from "./pages/Profile";

const App: React.FC = () => {
	return (
		<Main>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/s/:c' component={Category} />
				<Route exact path='/s/:category/:slug' component={Item} />
				<Route exact path='/auth'>
					<AuthPage />
					{/* {!user?.token ? : <Redirect to='/' />} */}
				</Route>
				<PrivateRoute path='/profile' exact component={ProfilePage} />
			</Switch>
		</Main>
	);
};

export default App;
