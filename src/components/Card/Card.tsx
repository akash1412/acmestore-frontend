import React from "react";
import { Box, Image, Heading, Text, Icon } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { AiOutlineShopping } from "react-icons/ai";
import { Item } from "../../Interface/Interface";
import { useDrawerContext } from "../../context/DrawerContext";

/**
 * @param Interfaces
 
 */

interface CardProps extends Item {
	description?: string;
}

const Card: React.FC<CardProps> = props => {
	const { _id, title, slug, description, price, image, category } = props;

	const { addItemToCart } = useDrawerContext();

	const history = useHistory();

	return (
		<Box w='260px' h='25rem' pos='relative' boxShadow='lg'>
			<Box
				pos='absolute'
				top='2.5px'
				right='2.5px'
				bgColor='#fff'
				borderRadius='100px'
				cursor='pointer'
				w='2rem'
				h='2rem'
				p='.5rem'
				d='grid'
				placeItems='center'
				onClick={(e: any) =>
					addItemToCart({ itemID: _id, title, price, image })
				}>
				<Icon as={AiOutlineShopping} />
			</Box>

			<Box
				w='100%'
				h='100%'
				cursor='pointer'
				onClick={() => history.push(`/s/${category}/${slug}`)}>
				<Box w='100%' h='90%' userSelect='none'>
					<Image
						width='100%'
						height='100%'
						objectFit='cover'
						transition='transform .5s'
						borderRadius='.6rem'
						src={image}
						alt={title}
					/>
				</Box>

				<Box mt='.2rem' d='flex' fontSize={["1rem", "1.2rem"]}>
					<Heading margin='0' fontSize='inherit'>
						{title}
					</Heading>
					<Text marginLeft='auto'>${price}</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default Card;
