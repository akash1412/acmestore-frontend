import { FC } from 'react';
import { CartItem as ICartItem, UPDATE_TYPE } from '../../Interface/Interface';
import {
	Box,
	Image,
	Heading,
	Text,
	Stack,
	Button,
	HStack,
} from '@chakra-ui/react';

interface Props extends ICartItem {
	updateItemQuantity: (item: ICartItem, type: UPDATE_TYPE) => void;
	deleteItem: (item: ICartItem) => void;
}

const CartItem: FC<Props> = props => {
	const { updateItemQuantity, deleteItem, ...itemProps } = props;

	return (
		<Box d='flex' w='100%' justifyContent='flex-start' mb='2rem'>
			<Box w='5rem' borderRadius='.4rem' mr='1rem' overflow='hidden'>
				<Image
					w='100%'
					h='100%'
					objectFit='cover'
					src={itemProps.image}
					alt={itemProps.title}
				/>
			</Box>

			<Stack flexDir='column' justifyContent='space-between' flexGrow={1}>
				<Heading fontSize='1.2rem' mb='.4rem'>
					{itemProps.title}
				</Heading>
				<Text>${itemProps.price}</Text>

				<ItemQuantitiy
					updateQuantity={updateItemQuantity}
					deleteItem={deleteItem}
					itemProps={itemProps}
				/>
			</Stack>
		</Box>
	);
};
const ItemQuantitiy: FC<{
	itemProps: any;
	deleteItem: any;
	updateQuantity: any;
}> = ({ deleteItem, updateQuantity, itemProps }) => {
	return (
		<Stack direction='row'>
			<HStack maxW='120px'>
				<Button
					variant='outline'
					p='0'
					disabled={itemProps.quantity === 5}
					onClick={() => updateQuantity(itemProps, 'INC')}>
					+
				</Button>

				<Text>{itemProps.quantity}</Text>
				<Button
					variant='outline'
					p='0'
					disabled={itemProps.quantity === 1}
					onClick={() => updateQuantity(itemProps, 'DEC')}>
					-
				</Button>
			</HStack>
			<Button
				variant='outline'
				_hover={{ bgColor: '#000', color: '#fff' }}
				onClick={() => deleteItem(itemProps)}>
				Delete
			</Button>
		</Stack>
	);
};

export default CartItem;
