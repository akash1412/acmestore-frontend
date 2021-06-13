import { FC } from "react";
import { CartItem as ICartItem } from "../../Interface/Interface";
import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";

interface Props extends ICartItem {
	removeItemFromCart: (item: ICartItem) => void;
}

const CartItem: FC<Props> = props => {
	const { removeItemFromCart, id, title, price, image, quantity } = props;

	return (
		<Box d='flex' mb='2rem'>
			<Box w='6rem' h='6rem' borderRadius='.4rem'>
				<Image
					d='block'
					maxW='100%'
					maxH='100%'
					borderRadius='.4rem'
					src={image}
					alt={title}
				/>
			</Box>

			<Box flexGrow={1}>
				<Heading size='md' mb='.4rem'>
					{title}
				</Heading>
				<Text>${price}</Text>
				<Text>{quantity}</Text>

				<Stack />
				<Box
					onClick={() =>
						removeItemFromCart({ id, title, price, image, quantity })
					}>
					remove
				</Box>
			</Box>
		</Box>
	);
};

export default CartItem;
