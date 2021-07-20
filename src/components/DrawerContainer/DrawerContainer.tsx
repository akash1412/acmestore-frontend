import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
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
} from '@chakra-ui/react';

import Cart from '../Cart/Cart';
import { useDrawerContext } from './../../context/DrawerContext';
import { totalAmount } from '../../utils/helper';
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
			size={'md'}
			onClose={toggleDrawer}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />

				<DrawerHeader
					fontWeight='bold'
					h='100vh'
					textAlign='center'
					fontSize={['1.5rem', '2rem']}>
					{activeDrawerTab === 'cart' ? 'Your Bag' : 'Your liked products'}
				</DrawerHeader>

				<DrawerBody px={['14px', '24px']} pos='relative'>
					<Cart cartItems={allCartItems} />
				</DrawerBody>
				<DrawerFooter pos='relative'>
					<Footer total={totalAmount(allCartItems)} />
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerContainer;

function Footer(props: { total: number }): JSX.Element {
	return (
		<Box
			w='100%'
			zIndex='4'
			d='flex'
			flexDir='column'
			alignItems='center'
			justifyContent='center'>
			<Box alignSelf='start' d='flex' alignItems='center'>
				<Heading size='md' color='#ccc'>
					Total:
				</Heading>
				<Text ml='.5rem' fontWeight='bold' fontSize='1.4rem'>
					${props.total}
				</Text>
			</Box>
			<Button
				maxW='15rem'
				py='1.5rem'
				px='1rem'
				bgColor='#f9c74f'
				_hover={{
					bgColor: '#ffba08',
				}}
				_active={{
					bgColor: '#ffba08',
				}}
				borderRadius='2rem'
				fontWeight='bold'
				fontSize='1rem'
				leftIcon={
					<Icon fontWeight='bold' fontSize='1rem' as={AiOutlineRight} />
				}
				iconSpacing='2rem'>
				CHECKOUT
			</Button>
		</Box>
	);
}
