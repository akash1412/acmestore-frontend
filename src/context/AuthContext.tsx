import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt, { JwtPayload } from 'jwt-decode';

import { IUpdateProfile } from '../Interface/Interface';
interface User {
	name: string;
	role: string;
	token: string;
	photo?: string;
}

interface CreateContext {
	user: User | null;

	handleAuthState: (data: User) => void;
	signOut: () => void;
	updateUserOverviewData: (a: IUpdateProfile) => void;
}

export const AuthContext = React.createContext<CreateContext>({
	user: null,

	handleAuthState: () => {},
	signOut: () => {},
	updateUserOverviewData: data => {},
});

interface ContextProps {
	children: React.ReactNode;
}

export const useAuthContext = () => React.useContext(AuthContext);

const AuthContextProvider: React.FC<ContextProps> = ({ children }) => {
	const [user, setUser] = React.useState<any | null>((): any => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem('user'));
	});

	React.useEffect(() => {
		if (user) {
			//@ts-ignore
			const payload: number = jwt<JwtPayload>(user?.token).exp;
			const isTokenExpired = Date.now() > new Date(payload * 1000).getTime();

			isTokenExpired && setUser(null);
		}
	}, [user]);

	React.useEffect(() => {
		window.localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	const handleAuthState = (data: User) => {
		setUser(data);
	};

	const updateUserOverviewData = (updatedData: IUpdateProfile) => {
		setUser({ ...user, ...updatedData });
	};

	const signOut = async () => {
		try {
			setUser(null);

			window.location.reload();
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, handleAuthState, signOut, updateUserOverviewData }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
