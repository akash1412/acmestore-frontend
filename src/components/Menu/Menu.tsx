import React from 'react';

import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Avatar,
	Link,
	Icon,
} from '@chakra-ui/react';

import { RiAccountPinBoxLine } from 'react-icons/ri';
import { AiOutlineLogout } from 'react-icons/ai';
interface Props {
	src: string;
	name: string;
	handleSignout: () => void;
	disableToggleBtn: boolean;
}

const MenuProfile: React.FC<Props> = props => {
	return (
		<React.Fragment>
			<Menu>
				<MenuButton
					borderRadius='50%'
					w={['2rem', '3rem']}
					h={['2rem', '3rem']}
					border='1px solid #e5e5e5'
					_hover={{
						bgColor: '#e5e5e5',
					}}>
					<Avatar size='sm' src={props.src} name={props.name} />
				</MenuButton>
				<MenuList px='1rem'>
					<Link href='/profile'>
						<MenuItem
							icon={<Icon as={RiAccountPinBoxLine} w='1.2em' h='1.2em' />}
							alignItems='center'
							borderRadius='.5rem'
							_hover={{ bgColor: '#e5e5e5' }}
							_active={{ bgColor: '#e5e5e5' }}>
							Profile
						</MenuItem>
					</Link>
					<MenuItem
						onClick={props.handleSignout}
						isDisabled={props.disableToggleBtn}
						color='#e0370d'
						icon={
							<Icon
								as={AiOutlineLogout}
								w='1.2em'
								h='1.2em'
								fill='#d62828'
								mr='.2rem'
							/>
						}>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>
		</React.Fragment>
	);
};

export default MenuProfile;
