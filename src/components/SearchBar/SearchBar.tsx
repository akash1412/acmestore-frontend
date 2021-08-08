import { FC } from 'react';
import { Box, Icon, Input, Button } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';

const SearchBar: FC<{}> = () => {
	return (
		<Box
			as='form'
			mt='2rem'
			mb='4rem'
			d='flex'
			alignSelf='center'
			w={['100%', '25rem', '30rem', '40rem']}>
			<Input
				variant='filled'
				_hover={{ curosr: 'pointer' }}
				borderRightRadius='0'
				placeholder='search items ...'
			/>

			<Button borderLeftRadius='0' bgColor='#080808d1'>
				<Icon as={BiSearchAlt2} color='#fff' />
			</Button>
		</Box>
	);
};

export default SearchBar;
