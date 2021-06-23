import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerFooter,
	DrawerCloseButton,
	Box,
	Icon,
	Button,
	Heading,
	Text,
} from "@chakra-ui/react";

import Cart from "../Cart/Cart";
import { useDrawerContext } from "./../../context/DrawerContext";
// import Button from "./../button/button";

const DrawerContainer = () => {
	const {
		openDrawer,
		toggleDrawer,
		activeDrawerTab,

		allCartItems,
	} = useDrawerContext();

	return (
		<Drawer
			isOpen={openDrawer}
			placement='right'
			size='md'
			onClose={toggleDrawer}>
			<DrawerOverlay />
			<DrawerContent pos='relative'>
				<DrawerCloseButton />

				<DrawerHeader fontWeight='bold' textAlign='center' fontSize='2rem'>
					{activeDrawerTab === "cart" ? "Your Bag" : "Your liked products"}
				</DrawerHeader>

				<DrawerBody px={["14px", "24px"]}>
					<Cart cartItems={allCartItems} />
				</DrawerBody>
				<DrawerFooter
					bgColor='#fff'
					zIndex='4'
					pos='fixed'
					bottom='0'
					w='100%'
					d='flex'
					flexDir='column'
					alignItems='center'
					justifyContent='center'>
					<Box alignSelf='start'>
						<Heading size='md' color='#ccc'>
							Total:
						</Heading>
						<Text fontWeight='bold' fontSize='1.4rem'>
							${(5000).toFixed(2)}
						</Text>
					</Box>
					<Button
						w='15rem'
						py='1.8rem'
						bgColor='#f9c74f'
						_hover={{
							bgColor: "#ffba08",
						}}
						_active={{
							bgColor: "#ffba08",
						}}
						borderRadius='2rem'
						fontWeight='bold'
						fontSize='1rem'
						leftIcon={
							<Icon fontWeight='bold' fontSize='1rem' as={AiOutlineRight} />
						}
						iconSpacing='2.5rem'>
						CHECKOUT
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerContainer;
