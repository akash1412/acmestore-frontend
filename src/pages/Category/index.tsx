import { Heading, Box, Spinner } from '@chakra-ui/react';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import { Item } from '../../Interface/Interface';
import Collection from './../../components/Collection/Collection';
import { CapitalizeLetter } from './../../utils/helper';

interface Props extends RouteComponentProps<{ category: string }> {}

const Category: FC<Props> = ({ match }) => {
	const { data, isLoading } = useFetch<{ total: number; items: Item[] }>({
		url: `https://ecom-api-v1.herokuapp.com/api/v1/store?category=${match.params.category}`,
	});

	if (isLoading) {
		return (
			<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
				<Spinner size='xl' />
			</Box>
		);
	}

	return (
		<Box
			m={[0, '0 auto']}
			w={['100%', '95%']}
			py='1rem'
			px={['.5rem', 0]}
			d='flex'
			flexDir='column'>
			<Heading>{CapitalizeLetter(match.params.category)}</Heading>
			<Collection items={data?.items} />
		</Box>
	);
};

export default Category;
