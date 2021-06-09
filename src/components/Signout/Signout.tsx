import React from "react";
import { Button } from "@chakra-ui/react";

import { useAuthContext } from "../../context/AuthContext";

const SignOut: React.FC<{}> = () => {
	const { signOut } = useAuthContext();

	return (
		<Button
			p='0'
			border='none'
			bgColor='transparent'
			_hover={{ bgColor: "transparent" }}
			onClick={signOut}>
			logout
		</Button>
	);
};

export default SignOut;
