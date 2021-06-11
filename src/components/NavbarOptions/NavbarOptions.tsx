import React from "react";

import { Box, Link as LinkUI, Avatar } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import SignOut from "../Signout/Signout";

const NavbarOptions: React.FC<{}> = () => {
	const { pathname } = useHistory().location;

	const { userInfo, token } = useAuthContext();

	return (
		<Box alignSelf='center' justifySelf='flex-end' d='flex' alignItems='center'>
			{userInfo?.role === "admin" && (
				<LinkUI href='/add' mr='1rem' fontWeight='bold' textDecoration='none'>
					add
				</LinkUI>
			)}
			<LinkUI href='/profile'>profile</LinkUI>

			{token ? (
				<>
					{pathname === "/auth" ? (
						<LinkUI href='/'>Back</LinkUI>
					) : (
						<LinkUI href='/auth'>login</LinkUI>
					)}
				</>
			) : (
				<SignOut />
			)}

			<Avatar src={userInfo?.photo} name={userInfo?.name} />
		</Box>
	);
};
export default NavbarOptions;
