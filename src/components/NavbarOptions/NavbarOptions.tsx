import React from "react";

import { Box, Link as LinkUI, Avatar, Icon } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import AvatarPlaceholder from "../../assests/avatar-placeholder.jpg";
import SignOut from "../Signout/Signout";
import { useDrawerContext } from "../../context/DrawerContext";

const NavbarOptions: React.FC<{}> = () => {
	const { userInfo, token, isLoggedIn } = useAuthContext();

	const { toggleDrawer, openDrawer } = useDrawerContext();

	return (
		<Box alignSelf='center' justifySelf='flex-end' d='flex' alignItems='center'>
			<Box mr='1rem' onClick={toggleDrawer}>
				<Icon as={AiOutlineShoppingCart} fontSize='1.2rem' cursor='pointer' />
			</Box>
			<Box mr='1rem'>
				<Icon as={AiOutlineHeart} fontSize='1.2rem' cursor='pointer' />
			</Box>

			{userInfo?.role === "admin" && (
				<LinkUI href='/add' mr='1rem' fontWeight='bold' textDecoration='none'>
					add
				</LinkUI>
			)}

			{token && (
				<LinkUI mr='1rem' href='/profile'>
					profile
				</LinkUI>
			)}

			{!token && (
				<LinkUI mr='1rem' href='/auth'>
					login
				</LinkUI>
			)}

			{token && <SignOut />}

			{!token ? (
				<Avatar size='sm' src={AvatarPlaceholder} name='avatar' />
			) : (
				<Avatar size='sm' src={userInfo?.photo} name={userInfo?.name} />
			)}
		</Box>
	);
};
export default NavbarOptions;
