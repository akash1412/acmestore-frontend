import React from "react";
import { Button } from "@chakra-ui/react";

import { useAuthContext } from "../../context/AuthContext";

const SignOut: React.FC<{}> = () => {
	const { signOut } = useAuthContext();

	return (
		<Button
			mr='1rem'
			p='0'
			fontWeight='bold'
			border='none'
			bgColor='transparent'
			_hover={{ bgColor: "transparent" }}
			_active={{ bgColor: "transparent" }}
			onClick={signOut}>
			logout
		</Button>
	);
};

export default SignOut;
