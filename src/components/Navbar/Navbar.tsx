import React from 'react';
import { Flex } from '@chakra-ui/react';
import NavbarOptions from '../NavbarOptions/NavbarOptions';
import NavLinks from '../NavLinks/NavLinks';
import { useMediaQuery } from '@chakra-ui/react';
import Logo from '../Logo/Logo';

const Navbar: React.FC<{
	toggleSidebar: () => void;
}> = ({ toggleSidebar }) => {
	const [matches] = useMediaQuery('(min-width:607px)');

	const [addBorder, setAddBorder] = React.useState(false);

	React.useEffect(() => {
		document.addEventListener('scroll', () => {
			if (window.scrollY >= 12) {
				setAddBorder(true);
			} else {
				setAddBorder(false);
			}
		});

		return () =>
			document.removeEventListener('scroll', () => {
				setAddBorder(true);
			});
	}, []);

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
			boxShadow={addBorder ? 'md' : 'none'}>
			<Flex>
				<Logo />
				{matches && <NavLinks />}
			</Flex>
			<NavbarOptions toggleSidebar={toggleSidebar} showMenu={matches} />
		</Flex>
	);
};

export default Navbar;
