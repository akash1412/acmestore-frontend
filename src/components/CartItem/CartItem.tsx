import { FC } from "react";
import { CartItem as ICartItem } from "../../Interface/Interface";
import { Box, Image, Heading, Text, Stack, Icon } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "./../button/button";

interface Props extends ICartItem {
	removeItemFromCart: (item: ICartItem) => void;
}

const CartItem: FC<Props> = props => {
	const {
		removeItemFromCart,
		id,
		title,
		price,
		image,
		quantity,
		itemID,
		user,
	} = props;

	return (
		<Box d='flex' justifyContent='flex-start' mb='2rem'>
			<Box w='5rem' h='5rem' borderRadius='.2rem' mr='1rem'>
				<Image
					w='100%'
					h='100%'
					objectFit='cover'
					borderRadius='.2rem'
					src={image}
					alt={title}
				/>
			</Box>
			<Box d='flex'>
				<Stack flexDir='column' spacing='2px'>
					<Heading fontSize='1.2rem' mb='.4rem'>
						{title}
					</Heading>
					<Text>${price}</Text>
				</Stack>
				<Stack ml='1rem' spacing='1rem'>
					<Text>qty:{quantity}</Text>
					<Button
						alignSelf='flex-end'
						bgColor='red.400'
						onClick={() =>
							removeItemFromCart({
								id,
								title,
								price,
								image,
								quantity,
								itemID,
								user,
							})
						}>
						<Icon as={RiDeleteBinLine} color='#fff' />
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};

export default CartItem;
