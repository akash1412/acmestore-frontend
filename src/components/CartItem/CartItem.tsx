import { FC } from "react";
import { CartItem as ICartItem } from "../../Interface/Interface";
import { Box, Image, Heading, Text, Stack, Icon } from "@chakra-ui/react";
import { IoIosClose } from "react-icons/io";

import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

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
		<Box d='flex' maxW='70%' justifyContent='flex-start' mb='2rem'>
			<Box w='5rem' h='6rem' borderRadius='.6rem' mr='1rem' overflow='hidden'>
				<Image w='100%' h='100%' objectFit='fill' src={image} alt={title} />
			</Box>

			<Stack flexDir='column' justifyContent='space-between' flexGrow={1}>
				<Heading fontSize='1.2rem' mb='.4rem'>
					{title}
				</Heading>
				<Text>${price}</Text>

				<ItemQuantitiy value={quantity} min={1} max={5} />
			</Stack>
			<Stack ml='1rem' direction='column' spacing='1rem'>
				<Box
					cursor='pointer'
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
					<Icon as={IoIosClose} fontSize='2rem' fill='red.500' />
				</Box>
			</Stack>
		</Box>
	);
};
const ItemQuantitiy: FC<{ value: number; min: number; max: number }> =
	props => {
		return (
			<NumberInput
				size='xs'
				maxW={16}
				defaultValue={props.value}
				min={props.min}
				max={props.max}
				keepWithinRange={true}
				onChange={value => {
					console.log(value);
				}}>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		);
	};

export default CartItem;
