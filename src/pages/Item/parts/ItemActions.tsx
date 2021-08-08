import { FC } from 'react';
import { Box, Button, Icon, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineShopping } from 'react-icons/ai';
import { IoTrashBinOutline } from 'react-icons/io5';
// import { CartItem, newCartItem } from '../../../Interface/Interface';
import { useDrawerContext } from '../../../context/DrawerContext';

interface Props {
	data: any;
	role: string | undefined;
	handleDeleteItemAction: () => void;
	deletingItem: boolean;
}

const ItemActions: FC<Props> = ({
	data,
	role,
	handleDeleteItemAction,
	deletingItem,
}) => {
	const { addItemToCart, addingItemToCart } = useDrawerContext();

	const history = useHistory();

	return (
		<Box
			w='100%'
			mt={['1rem', '1rem', 'auto']}
			d='flex'
			justifyContent={['center', 'center', 'flex-start']}>
			{role === 'admin' ? (
				<>
					<Button
						mr='1.2rem'
						border='none'
						px='3rem'
						bgColor='black'
						_hover={{
							bgColor: 'black',
						}}
						_active={{
							bgColor: 'black',
						}}
						color='#fff'
						leftIcon={
							<Icon as={AiOutlineEdit} fontSize='1.2rem' color='#fff' />
						}
						iconSpacing='1rem'
						onClick={() => history.push(`/edit/item/${data.slug}`)}>
						Edit
					</Button>
					<Button
						border='none'
						px='3rem'
						bgColor='red.500'
						_active={{
							bgColor: 'red.500',
						}}
						_hover={{
							bgColor: 'red.500',
						}}
						onClick={handleDeleteItemAction}
						leftIcon={
							<Icon as={IoTrashBinOutline} fontSize='1.2rem' color='#fff' />
						}
						isLoading={deletingItem}
						spinner={<Spinner color='#fff' size='sm' />}></Button>
				</>
			) : (
				<>
					<Button
						w='8rem'
						bgColor='black'
						color='#fff'
						border='1.5px solid transparent'
						boxShadow='md'
						_hover={{ bgColor: 'black' }}
						_active={{ bgColor: 'black' }}
						opacity={addingItemToCart ? '.8' : '1'}
						onClick={() =>
							addItemToCart({
								itemID: data._id,
								title: data.title,
								price: data.price,
								image: data.image,
							})
						}>
						{!addingItemToCart ? (
							<Icon as={AiOutlineShopping} w='1.4rem' h='1.4rem' />
						) : (
							<Spinner size='sm' />
						)}
					</Button>
					<Button
						w='8rem'
						border='1.5px solid black'
						color='black'
						bgColor='#fff'
						boxShadow='md'
						fontWeight='bold'
						ml='2rem'
						_hover={{ bgColor: 'black', color: '#fff' }}
						_active={{ bgColor: 'black', color: '#fff' }}
						onClick={() => history.push(`/checkout/item/${data.slug}`)}>
						Buy Now
					</Button>
				</>
			)}
		</Box>
	);
};

export default ItemActions;
