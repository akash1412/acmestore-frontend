import { Box, Spinner } from '@chakra-ui/react';

const LoadingUI = () => {
	return (
		<Box
			pos='absolute'
			w='100%'
			h='100%'
			d='flex'
			justifyContent='center'
			alignItems='center'>
			<Spinner size='xl' />
		</Box>
	);
};

export default LoadingUI;
