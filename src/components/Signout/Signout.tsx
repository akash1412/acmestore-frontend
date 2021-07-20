import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useAuthContext } from '../../context/AuthContext';

const SignOut: React.FC<{}> = () => {
	const { signOut, user } = useAuthContext();

	return (
		<Button
			isDisabled={!!!user}
			w='100%'
			justifyContent='flex-start'
			p='0'
			border='none'
			color='#e0370d'
			bgColor='transparent'
			_hover={{ bgColor: 'transparent' }}
			_active={{ bgColor: 'transparent' }}
			onClick={signOut}
			leftIcon={
				<Icon
					as={AiOutlineLogout}
					w='1.2em'
					h='1.2em'
					fill='#d62828'
					mr='.2rem'
				/>
			}>
			Logout
		</Button>
	);
};

export default SignOut;
