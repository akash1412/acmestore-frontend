import { FC, useState } from 'react';
import { Box } from '@chakra-ui/react';

import SignIn from './../components/SignIn/SignIn';
import SignUp from './../components/SignUp/SignUp';
import MetaHead from '../components/MetaHead/MetaHead';

const AuthPage: FC = () => {
	const [toggleSignup, setToggleSignup] = useState(false);

	const handleFormToggle = () => {
		setToggleSignup(prevState => !prevState);
	};

	return (
		<Box
			py={['1rem', '.5rem']}
			px={['.4rem', '.4rem', '1.5rem']}
			w='100%'
			m={[0, '0 auto']}
			d={['block', 'grid']}
			placeItems={['initial', 'center']}>
			<MetaHead title={`ACME | ${toggleSignup ? 'Signup' : ' Login'} `} />
			<Box d='flex' flexDir='column' bgColor='#fff' borderRadius='.2rem'>
				<Box px={['0.5rem', '2rem']} py='1rem' textAlign='center'>
					{!toggleSignup ? <SignIn /> : <SignUp />}
				</Box>
				<Box alignSelf='center' justifySelf='flex-end' my='1rem'>
					{!toggleSignup ? (
						<Box
							cursor='pointer'
							fontWeight='bold'
							fontSize='1.2rem'
							onClick={handleFormToggle}>
							or create your account
						</Box>
					) : (
						<Box
							cursor='pointer'
							fontWeight='bold'
							fontSize='1.2rem'
							onClick={handleFormToggle}>
							or login to your account
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;
