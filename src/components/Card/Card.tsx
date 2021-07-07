import React, { Fragment } from 'react';
import { Box, Image, Heading, Text, Icon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineEdit } from 'react-icons/ai';
import { Item } from '../../Interface/Interface';
import { useDrawerContext } from '../../context/DrawerContext';
import { useAuthContext } from '../../context/AuthContext';

/**
 * @param Interfaces
 
 */

interface CardProps extends Item {
	description?: string;
}

const Card: React.FC<CardProps> = props => {
	const { _id, title, slug, price, image, category } = props;

	const { addItemToCart } = useDrawerContext();

	const { user } = useAuthContext();

	const history = useHistory();

	const iconAction = () => {
		if (user?.role === 'admin') {
			history.push(`/edit/item/${slug}`);
		} else {
			addItemToCart({ itemID: _id, title, price, image });
		}
	};

	return (
		<Box
			boxSizing='border-box'
			w='280px'
			h='100%'
			pos='relative'
			boxShadow='lg'
			borderRadius='.6rem'>
			<CardIcon isAdmin={user?.role === 'admin'} iconAction={iconAction} />

			<Box
				p='.4rem'
				w='100%'
				h='100%'
				cursor='pointer'
				d='flex'
				flexDirection='column'
				onClick={() => history.push(`/s/${category}/${slug}`)}>
				<Box height='90%' userSelect='none'>
					<Image
						width='100%'
						height='100%'
						objectFit='cover'
						objectPosition='center center'
						transition='transform .5s'
						borderRadius='.6rem'
						src={image}
						alt={title}
					/>
				</Box>

				<Box mt='auto' d='flex' fontSize={['1rem', '1.2rem']}>
					<Heading margin='0' fontSize='inherit'>
						{title}
					</Heading>
					<Text marginLeft='auto' fontWeight='semibold'>
						${price}
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default Card;

function CardIcon({
	isAdmin,
	iconAction,
}: {
	isAdmin?: boolean;
	iconAction: () => void;
}) {
	return (
		<Fragment>
			{isAdmin ? (
				<Box
					pos='absolute'
					top='10px'
					right='10px'
					bgColor='#fff'
					borderRadius='100px'
					cursor='pointer'
					w='2rem'
					h='2rem'
					p='.5rem'
					d='grid'
					placeItems='center'
					onClick={iconAction}>
					<Icon as={AiOutlineEdit} />
				</Box>
			) : (
				<Box
					pos='absolute'
					top='10px'
					right='10px'
					bgColor='#fff'
					borderRadius='100px'
					cursor='pointer'
					w='2rem'
					h='2rem'
					p='.5rem'
					d='grid'
					placeItems='center'
					onClick={iconAction}>
					<Icon as={AiOutlineShopping} />
				</Box>
			)}
		</Fragment>
	);
}
