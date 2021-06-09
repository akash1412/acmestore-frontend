import React from "react";

import { Box, Button, Link as LinkUI } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import SignOut from "../Signout/Signout";
import MenuProfile from "./../Menu/Menu";

const NavbarOptions: React.FC<{}> = () => {
	const { pathname } = useHistory().location;

	const { user } = useAuthContext();

	return (
		<Box alignSelf='center' justifySelf='flex-end' d='flex' alignItems='center'>
			{user?.role === "admin" && (
				<LinkUI href='/add' mr='1rem' fontWeight='bold' textDecoration='none'>
					add
				</LinkUI>
			)}
			<LinkUI href='/profile'>profile</LinkUI>

			{!user?.token ? (
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
			<MenuProfile />
		</Box>
	);
};
export default NavbarOptions;
