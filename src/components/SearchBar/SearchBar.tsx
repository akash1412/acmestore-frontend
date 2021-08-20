import { FC } from 'react';
import { Box, Icon, Input, Button } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';

interface IProps {
	searchInput: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleFormSubmit: (e: React.FormEvent) => void;
}

const SearchBar: FC<IProps> = ({
	searchInput,
	handleInputChange,
	handleFormSubmit,
}) => {
	return (
		<Box
			as='form'
			mt='2rem'
			mb='4rem'
			d='flex'
			alignSelf='center'
			w={['100%', '25rem', '30rem', '40rem']}
			onSubmit={handleFormSubmit}>
			<Input
				variant='filled'
				_hover={{ curosr: 'pointer' }}
				borderRightRadius='0'
				placeholder='search items ...'
				required
				value={searchInput}
				onChange={handleInputChange}
			/>

			<Button type='submit' borderLeftRadius='0' bgColor='#080808d1'>
				<Icon as={BiSearchAlt2} color='#fff' />
			</Button>
		</Box>
	);
};

export default SearchBar;
