import React from "react";

import Avatar from "./../Avatar/Avatar";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const MenuProfile: React.FC<{}> = () => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				p='0'
				border='none'
				borderRadius='none'
				bgColor='transparent'
				_hover={{ bgColor: "transparent" }}>
				<Avatar />
			</MenuButton>
			<MenuList>
				<MenuItem>
					<a href='/profile'>
						<a>profile</a>
					</a>
				</MenuItem>
				<MenuItem>logout</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default MenuProfile;
