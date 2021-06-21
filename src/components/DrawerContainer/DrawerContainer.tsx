import React from "react";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";

import Cart from "../Cart/Cart";
import { useDrawerContext } from "./../../context/DrawerContext";

const DrawerContainer = () => {
	const {
		openDrawer,
		toggleDrawer,
		activeDrawerTab,
		handleActiveTab,
		allCartItems,
	} = useDrawerContext();

	return (
		<Drawer
			isOpen={openDrawer}
			placement='right'
			size='md'
			onClose={toggleDrawer}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />

				<DrawerHeader>
					{activeDrawerTab === "cart"
						? "Your Cart Items"
						: "Your liked products"}
				</DrawerHeader>

				<DrawerBody px={["14px", "24px"]}>
					<Cart cartItems={allCartItems} />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerContainer;
