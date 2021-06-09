import { Box, Flex } from "@chakra-ui/react";

import { Link as LinkUI } from "@chakra-ui/react";

const NavLinks = () => {
	return (
		<Flex ml='1.2rem' fontSize='.8rem' alignItems='center'>
			<LinkUI href='/' color='black' opacity='.5' _hover={{ opacity: "1" }}>
				All
			</LinkUI>

			<LinkUI
				href='/s/men'
				ml='.5rem'
				color='black'
				opacity='.5'
				_hover={{ opacity: "1" }}>
				Mens
			</LinkUI>

			<LinkUI
				href='/s/women'
				ml='.5rem'
				color='black'
				opacity='.5'
				_hover={{ opacity: "1" }}>
				Womens
			</LinkUI>

			<LinkUI
				href='/s/jacket'
				ml='.5rem'
				color='black'
				opacity='.5'
				_hover={{ opacity: "1" }}>
				Jackets
			</LinkUI>

			<LinkUI
				href='/s/sneaker'
				ml='.5rem'
				color='black'
				opacity='.5'
				_hover={{ opacity: "1" }}>
				Sneakers
			</LinkUI>

			<LinkUI
				href='/s/hat'
				ml='.5rem'
				color='black'
				opacity='.5'
				_hover={{ opacity: "1" }}>
				Hats
			</LinkUI>
		</Flex>
	);
};

export default NavLinks;
