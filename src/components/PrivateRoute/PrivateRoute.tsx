import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

interface Props {
	path: string;
	component: React.FunctionComponent; //JSX.Element
	exact: boolean;
}

const PrivateRoute: FC<Props> = ({ path, component, exact }) => {
	const { user } = useAuthContext();

	return user?.token ? (
		<Route exact={exact} path={path} component={component} />
	) : (
		<Redirect to='/auth' />
	);
};

export default PrivateRoute;
