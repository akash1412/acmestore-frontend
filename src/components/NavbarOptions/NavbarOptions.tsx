import React from "react";

import { Box, Link as LinkUI, Avatar, Icon } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import AvatarPlaceholder from "../../assests/images/avatar-placeholder.jpg";
import SignOut from "../Signout/Signout";
import { useDrawerContext } from "../../context/DrawerContext";

const NavbarOptions: React.FC<{}> = () => {
	const { user } = useAuthContext();
	const { location } = useHistory();
	const { toggleDrawer, openDrawer } = useDrawerContext();

	return (
		<Box alignSelf='center' justifySelf='flex-end' d='flex' alignItems='center'>
			<Box mr={[".8rem", "1rem"]} onClick={toggleDrawer}>
				<Icon as={AiOutlineShopping} fontSize='1.2rem' cursor='pointer' />
			</Box>

			{user?.role === "admin" && (
				<LinkUI
					href='/add'
					mr={[".8rem", "1rem"]}
					fontWeight='bold'
					textDecoration='none'>
					add
				</LinkUI>
			)}

			{user && location.pathname !== "/profile" && (
				<LinkUI mr={[".8rem", "1rem"]} href='/profile'>
					profile
				</LinkUI>
			)}

			{!user && location.pathname !== "/auth" && (
				<LinkUI mr={[".8rem", "1rem"]} href='/auth'>
					login
				</LinkUI>
			)}

			{user && <SignOut />}

			{!user ? (
				<Avatar size='xs' src={AvatarPlaceholder} name='avatar' />
			) : (
				<Avatar size='sm' src={user?.photo} name={user?.name} />
			)}
		</Box>
	);
};
export default NavbarOptions;
