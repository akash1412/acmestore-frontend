import React from "react";
import { Box, Image, Heading, Text, Icon } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { AiOutlineHeart } from "react-icons/ai";
import { Item } from "../../Interface/Interface";
import { useDrawerContext } from "../../context/DrawerContext";
import { useAuthContext } from "./../../context/AuthContext";

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
		<Box w='260px' h='28rem' pos='relative'>
			<Box
				pos='absolute'
				top='2px'
				right='2px'
				bgColor='#fff'
				borderRadius='100px'
				w='2rem'
				h='2rem'
				p='.5rem'
				d='grid'
				placeItems='center'
				onClick={(e: any) => addItemToCart({ id: _id, title, price, image })}>
				<Icon as={AiOutlineHeart} />
			</Box>

			<Box
				cursor='pointer'
				onClick={() => history.push(`/s/${category}/${slug}`)}>
				<Box w='100%' h='90%'>
					<Image
						width='100%'
						height='100%'
						objectFit='cover'
						transition='transform .5s'
						borderRadius='.8rem'
						src={image}
						alt={title}
					/>
				</Box>

				<Box mt='.2rem' d='flex' fontSize='1.2rem'>
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
