import React from "react";

import axios from "axios";
import { useToast } from "@chakra-ui/react";
interface User {
	name: string;
	role: string;
	token: string;
	photo?: string;
}

interface CreateContext {
	token: string | null;
	userInfo: null | User;
	isLoggedIn: boolean;
	handleAuthState: (a: string) => void;
	signOut: () => void;
}

export const AuthContext = React.createContext<CreateContext>({
	token: null,
	userInfo: null,
	isLoggedIn: false,
	handleAuthState: () => {},
	signOut: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

export const useAuthContext = () => React.useContext(AuthContext);

const AuthContextProvider: React.FC<ContextProps> = ({ children }) => {
	const [token, setToken] = React.useState<string | null>((): any => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("token"));
	});

	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const [userInfo, setUserInfo] = React.useState<User | null>(null);

	React.useEffect(() => {
		window.localStorage.setItem("token", JSON.stringify(token));
	}, [token]);

	React.useEffect(() => {
		const fetchUserInfo = () => {
			axios({
				url: "https://ecom-api-v1.herokuapp.com/api/v1/users/me",
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
				},
			}).then(res => {
				setUserInfo(res.data.data.user);
			});
		};

		if (token?.length! >= 0) {
			fetchUserInfo();
		}
	}, [token]);

	const handleAuthState = (token: string) => {
		setToken(token);
		setIsLoggedIn(true);
	};

	const signOut = async () => {
		try {
			await axios({
				url: "https://ecom-api-v1.herokuapp.com/api/v1/users/signout",
				headers: {
					authorization: `Bearer ${token}`,
				},
				method: "DELETE",
			}).then(() => localStorage.removeItem("token"));

			setToken(null);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<AuthContext.Provider
			value={{ token, userInfo, isLoggedIn, handleAuthState, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
