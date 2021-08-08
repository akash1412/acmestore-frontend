import React from 'react';

import { Box, Link as LinkUI, Icon } from '@chakra-ui/react';
import { useAuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';
import AvatarPlaceholder from '../../assets/images/avatar-placeholder.jpg';
import { FiMenu } from 'react-icons/fi';
import { useDrawerContext } from '../../context/DrawerContext';
import Menu from '../Menu/Menu';

const NavbarOptions: React.FC<{
	toggleSidebar: () => void;
	showMenu: boolean;
}> = ({ toggleSidebar, showMenu }) => {
	const { user, signOut } = useAuthContext();
	const { location } = useHistory();
	const { toggleDrawer } = useDrawerContext();

	return (
		<Box alignSelf='center' justifySelf='flex-end' d='flex' alignItems='center'>
			{!user && location.pathname !== '/auth' && showMenu && (
				<LinkUI mr={['.8rem', '1.2rem']} href='/auth'>
					login
				</LinkUI>
			)}

			{user && user.role !== 'admin' && (
				<Box
					mr={['.8rem', '1.2rem']}
					onClick={toggleDrawer}
					borderRadius='50%'
					w={['2rem', '3rem']}
					h={['2rem', '3rem']}
					d='grid'
					placeItems='center'
					cursor='pointer'>
					<Icon as={AiOutlineShopping} fontSize={['1.5rem', '1.4rem']} />
				</Box>
			)}

			{user?.role === 'admin' && (
				<LinkUI
					href='/create'
					mr={['.8rem', '1.2rem']}
					fontWeight='bold'
					textDecoration='none'>
					create
				</LinkUI>
			)}

			<Menu
				src={user?.photo || AvatarPlaceholder}
				name={user?.name || ''}
				handleSignout={signOut}
				disableToggleBtn={!!!user}
			/>
			{!showMenu && (
				<Icon
					as={FiMenu}
					ml='1rem'
					cursor='pointer'
					fontSize='1.5rem'
					onClick={toggleSidebar}
				/>
			)}
		</Box>
	);
};
export default NavbarOptions;
