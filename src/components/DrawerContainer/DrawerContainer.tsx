import { FC, useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';

const DrawerContainer: FC<{}> = () => {
	const { openDrawer, toggleDrawer, activeDrawerTab, allCartItems } =
		useDrawerContext();

	const { user } = useAuthContext();

	const [stripeCheckingIn, setStripeCheckingIn] = useState(false);

	const handleCheckout = () => {
		setStripeCheckingIn(true);

		const itemForCheckout = allCartItems.map(item => ({
			name: item.title,
			quantity: item.quantity,
			price: item.price,
			image: item.image,
		}));

		fetch('https://ecom-api-v1.herokuapp.com/api/v1/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',

				authorization: `Bearer ${user?.token}`,
			},
			body: JSON.stringify({
				checkoutType: 'cart',
				items: itemForCheckout,
			}),
		})
			.then(data => data.json())
			.then(res => {
				setStripeCheckingIn(false);
				window.location = res.url;
			})
			.catch(err => console.log(err));
	};

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
					<Footer
						total={totalAmount(allCartItems)}
						handleCheckout={handleCheckout}
						stripeCheckingIn={stripeCheckingIn}
					/>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerContainer;

function Footer(props: {
	total: number;
	handleCheckout: () => void;
	stripeCheckingIn: boolean;
}): JSX.Element {
	const history = useHistory();

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
				w='20rem'
				py='1.5rem'
				px='1rem'
				bgColor='#f9c74f'
				_hover={{
					bgColor: '#f9c64fe6',
				}}
				_active={{
					bgColor: '#f9c64fe6',
				}}
				borderRadius='2rem'
				fontWeight='bold'
				fontSize='1rem'
				leftIcon={
					<Icon fontWeight='bold' fontSize='1rem' as={AiOutlineRight} />
				}
				iconSpacing='2rem'
				isLoading={props.stripeCheckingIn}
				loadingText='processing...'
				onClick={props.handleCheckout}>
				CHECKOUT
			</Button>
		</Box>
	);
}
