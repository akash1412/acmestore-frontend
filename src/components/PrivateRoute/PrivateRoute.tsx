import React, { FC } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';

interface Props {
	path: string | string[];
	Component: any; //JSX.Element
	exact: boolean;
}

const PrivateRoute: FC<Props> = ({ path, Component, exact }) => {
	const { user } = useAuthContext();

	return user?.token ? (
		<Route
			exact={exact}
			path={path}
			render={(props: RouteComponentProps) => <Component {...props} />}
		/>
	) : (
		<Redirect to='/auth' />
	);
};

export default PrivateRoute;
