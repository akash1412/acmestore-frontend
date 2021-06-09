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
import Cart from "./../Cart/Cart";

const BucketContainer = () => {
	return (
		<Drawer isOpen={true} placement='right' onClose={() => {}}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Create your account</DrawerHeader>

				<DrawerBody>
					<Cart />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default BucketContainer;
