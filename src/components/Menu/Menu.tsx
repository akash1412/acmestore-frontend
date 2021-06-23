import React from "react";

import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Avatar,
	Link,
	Button,
} from "@chakra-ui/react";
import SignOut from "../Signout/Signout";

interface Props {
	src: string;
	name: string;
}

const MenuProfile: React.FC<Props> = props => {
	return (
		<React.Fragment>
			<Menu>
				<MenuButton>
					<Avatar size='sm' src={props.src} name={props.name} />
				</MenuButton>
				<MenuList>
					<MenuItem>
						<Link w='100%' href='/profile'>
							profile
						</Link>
					</MenuItem>
					<MenuItem>
						<SignOut />
					</MenuItem>
				</MenuList>
			</Menu>
		</React.Fragment>
	);
};

export default MenuProfile;
