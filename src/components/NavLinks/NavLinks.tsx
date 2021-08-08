import { Flex } from '@chakra-ui/react';

import { Link as LinkUI, List, ListItem } from '@chakra-ui/react';

const NavLinks = () => {
	return (
		<Flex ml='1.2rem' fontSize='.8rem' alignItems='center'>
			<List fontSize='1rem'>
				<ListItem d='inline-block' color='black'>
					<LinkUI
						href='/s/men'
						textDecor='none'
						opacity='.6'
						_hover={{ opacity: '1' }}>
						Mens
					</LinkUI>
				</ListItem>

				<ListItem ml='.5rem' d='inline-block'>
					<LinkUI
						href='/s/women'
						color='black'
						opacity='.6'
						_hover={{ opacity: '1' }}>
						Womens
					</LinkUI>
				</ListItem>

				<ListItem ml='.5rem' d='inline-block'>
					<LinkUI
						href='/s/jacket'
						color='black'
						opacity='.6'
						_hover={{ opacity: '1' }}>
						Jackets
					</LinkUI>
				</ListItem>

				<ListItem ml='.5rem' d='inline-block'>
					<LinkUI
						href='/s/sneaker'
						color='black'
						opacity='.6'
						_hover={{ opacity: '1' }}>
						Sneakers
					</LinkUI>
				</ListItem>

				<ListItem ml='.5rem' d='inline-block'>
					<LinkUI
						href='/s/hat'
						color='black'
						opacity='.6'
						_hover={{ opacity: '1' }}>
						Hats
					</LinkUI>
				</ListItem>
			</List>
		</Flex>
	);
};

export default NavLinks;
