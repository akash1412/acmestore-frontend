import { FC } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';
import { CartItem as ICartItem } from '../../Interface/Interface';
import CartItem from './../CartItem/CartItem';
import { useDrawerContext } from '../../context/DrawerContext';
import EmptyCartSVG from '../../assets/svg/empty_cart.svg';

interface Props {
	cartItems: ICartItem[];
}

const Cart: FC<Props> = ({ cartItems }) => {
	const { updateItemQuantity, deleteItemFromCart } = useDrawerContext();

	return (
		<Box zIndex='1' w='100%' h='100%' d='grid'>
			{cartItems.length === 0 ? (
				<EmptyCartUI />
			) : (
				<Box d='flex' flexDirection='column' overflowY='scroll'>
					{cartItems.map((item: ICartItem) => (
						<CartItem
							key={item.id}
							{...item}
							updateItemQuantity={updateItemQuantity}
							deleteItem={deleteItemFromCart}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default Cart;

const EmptyCartUI = () => {
	return (
		<Box alignSelf='center' justifySelf='center'>
			<Image src={EmptyCartSVG} w='20rem' h='20rem' />
			<Heading textAlign='center' fontSize={['1.2rem', '1.4rem']}>
				Your Cart is Empty, Shop Now!
			</Heading>
		</Box>
	);
};
