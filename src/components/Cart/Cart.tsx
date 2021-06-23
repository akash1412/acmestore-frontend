import { FC } from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
import { CartItem as ICartItem } from "../../Interface/Interface";
import CartItem from "./../CartItem/CartItem";
import { useDrawerContext } from "../../context/DrawerContext";
import EmptyCartSVG from "../../assests/svg/empty_cart.svg";

interface Props {
	cartItems: ICartItem[];
}

const Cart: FC<Props> = ({ cartItems }) => {
	const { removeItemFromCart } = useDrawerContext();

	return (
		<Box pos='absolute' zIndex='1' overflow='scroll' w='100%' h='100%' d='grid'>
			{cartItems.length === 0 ? (
				<EmptyCartUI />
			) : (
				<Box d='flex' flexDirection='column'>
					{cartItems.map((item: ICartItem) => (
						<CartItem
							key={item.id}
							{...item}
							removeItemFromCart={removeItemFromCart}
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
			<Heading textAlign='center' fontSize={["1.2rem", "1.4rem"]}>
				Your Cart is Empty, Shop Now!
			</Heading>
		</Box>
	);
};
