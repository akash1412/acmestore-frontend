import React from "react";

import axios from "axios";

interface User {
	name: string;
	role: string;
	token: string;
}

interface CreateContext {
	user: null | User;
	setUserDetail: (user: User) => void;
	signOut: () => void;
}

export const AuthContext = React.createContext<CreateContext>({
	user: null,
	setUserDetail: () => {},
	signOut: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

export const useAuthContext = () => React.useContext(AuthContext);

const AuthContextProvider: React.FC<ContextProps> = ({ children }) => {
	const [user, setUser] = React.useState(() => {
		let store = JSON.parse(localStorage.getItem("user") || "{}");

		return store;
		// if (Object.keys(store).length === 0) {
		// 	return null;
		// } else return store;
	});

	React.useEffect(() => {
		window.localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	console.log(user);

	const setUserDetail = (user: User) => {
		setUser(user);
	};

	const signOut = async () => {
		try {
			await axios({
				url: "https://ecom-api-v1.herokuapp.com/api/v1/users/signout",
				headers: {
					authorization: `Bearer ${user.token}`,
				},
				method: "DELETE",
			}).then(() => localStorage.removeItem("token"));

			setUser(null);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<AuthContext.Provider value={{ user, setUserDetail, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
