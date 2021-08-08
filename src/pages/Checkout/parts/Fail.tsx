import { FC } from 'react';
import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import { FcHome } from 'react-icons/fc';

const Fail: FC<{}> = () => {
	return (
		<Box textAlign='center'>
			<Heading fontSize={['1.8rem', '2rem']} color='red.400'>
				Payment Failed 😲
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

export default Fail;
