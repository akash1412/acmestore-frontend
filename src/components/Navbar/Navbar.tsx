import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

const Navbar: React.FC<{
	toggleSidebar: () => void;
}> = ({ toggleSidebar }) => {
	return (
		<Flex
			bgColor='white'
			position='fixed'
			top='0'
			zIndex='5'
			h='4.5rem'
			w='100%'
			px={['1rem', '1.4rem']}
			alignItems='center'
			justifyContent='space-between'
			boxShadow='md'>
			<Flex>
				<Heading size='md'>ACME</Heading>
			</Flex>

			<NavbarOptions />
		</Flex>
	);
};

export default Navbar;
