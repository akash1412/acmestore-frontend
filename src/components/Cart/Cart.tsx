import { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { CartItem as ICartItem } from "../../Interface/Interface";
import CartItem from "./../CartItem/CartItem";
import { useDrawerContext } from "../../context/DrawerContext";

interface Props {
	cartItems: ICartItem[];
}

const Cart: FC<Props> = ({ cartItems }) => {
	const { removeItemFromCart } = useDrawerContext();

	if (cartItems.length === 0) {
		return (
			<Box w='100%' h='100%' d='grid' placeItems='center'>
				<Heading>Your Cart Is Empty</Heading>
			</Box>
		);
	}

	return (
		<Box>
			{cartItems.map((item: ICartItem) => (
				<CartItem
					key={item.id}
					{...item}
					removeItemFromCart={removeItemFromCart}
				/>
			))}
		</Box>
	);
};

export default Cart;
