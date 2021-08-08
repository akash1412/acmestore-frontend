import { FC } from 'react';
import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import { FcHome } from 'react-icons/fc';

const Success: FC<{}> = () => {
	return (
		<Box textAlign='center'>
			<Heading fontSize={['1.8rem', '2rem']} color='green.400'>
				Payment Successfull 🎉
			</Heading>
			<Button
				mt='4rem'
				variant='link'
				href='/'
				as='a'
				cursor='pointer'
				fontSize={['1.25rem']}
				rightIcon={<Icon as={FcHome} />}>
				Redirect To Home
			</Button>
		</Box>
	);
};

export default Success;
