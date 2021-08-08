import { FC } from 'react';
import { Box } from '@chakra-ui/react';

import Collection from '../../components/Collection/Collection';

import { ItemsLoading } from '../../components/SkeletonScreens/SkeletonScreen';

import { Item } from '../../Interface/Interface';

import MetaHead from '../../components/MetaHead/MetaHead';

import useFetch from './../../hooks/useFetch';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingUI from '../../components/LoadingUI/LoadingUI';

interface Props {}

const Home: FC<Props> = () => {
	const { data, isLoading } = useFetch<{ total: number; items: Item[] }>({
		url: 'https://ecom-api-v1.herokuapp.com/api/v1/store/',
	});

	if (isLoading) {
		return <LoadingUI />;
	}

	return (
		<Box
			m={[0, '0 auto']}
			w={['100%', '95%']}
			py='1rem'
			px={['.5rem', 0]}
			d='flex'
			flexDir='column'>
			<MetaHead title='ACME' />

			<SearchBar />
			{data && <Collection items={data?.items} />}
		</Box>
	);
};

export default Home;
