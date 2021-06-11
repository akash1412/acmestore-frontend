import React from "react";
import { Link as LinkUI, Flex, Box, Image, Heading } from "@chakra-ui/react";

import { Fragment, useState } from "react";
import { AiOutlineHeart, AiOutlineEdit } from "react-icons/ai";
import { Item } from "../../Interface/Interface";
import { useBucketContext } from "./../../context/BucketContext";
import { useAuthContext } from "./../../context/AuthContext";

import Button from "../button/button";

/**
 * @param Interfaces
 
 */

interface CardProps extends Item {
	description?: string;
}

const Card: React.FC<CardProps> = props => {
	const { _id, title, slug, description, price, image, category } = props;

	const { addItemToCart } = useBucketContext();

	return (
		<Fragment>
			<Box w='260px' h='100%'>
				<Flex flexDir='column' w='100%' h='100%' pos='relative'>
					<LinkUI d='contents' href={`/s/${category}/${slug}`}>
						<Flex role='group' w='100%' h='100%' overflow='hidden'>
							<Image
								width='100%'
								height='100%'
								objectFit='cover'
								transition='transform .5s'
								src={image}
								alt={title}
								_groupHover={{ transform: "scale(1.1)" }}
							/>
						</Flex>
					</LinkUI>
					<Button
						pos='absolute'
						bottom='1rem'
						left='0'
						right='0'
						margin='0 auto'
						zIndex='2'
						padding='.4rem .8rem'
						fontWeight='semibold'
						bgColor='black'
						opacity='.8'
						color='#fff'>
						Add To Cart
					</Button>
				</Flex>
			</Box>
		</Fragment>
	);
};

export default Card;
