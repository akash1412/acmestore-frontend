import { FC } from 'react';
import { Box } from '@chakra-ui/react';

import Collection from '../../components/Collection/Collection';

import { ItemsLoading } from '../../components/SkeletonScreens/SkeletonScreen';

import { Item } from '../../Interface/Interface';

import MetaHead from '../../components/MetaHead/MetaHead';
import { useState } from 'react';
import useFetch from './../../hooks/useFetch';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingUI from '../../components/LoadingUI/LoadingUI';
import CollectionOverview from './../../components/CollectionOverview/CollectionOverview';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = ({ history }) => {
	const { data: res, isLoading } = useFetch<{ type: string; items: Item[] }[]>({
		url: 'https://ecom-api-v1.herokuapp.com/api/v1/store/',
	});

	const [searchInput, setSearchInput] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		history.push(`/search?search_query=${searchInput}`);
		setSearchInput('');
	};

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

			<SearchBar
				searchInput={searchInput}
				handleInputChange={handleInputChange}
				handleFormSubmit={handleFormSubmit}
			/>
			{res &&
				res.map((data, idx) => (
					<CollectionOverview key={idx} type={data.type} data={data.items} />
				))}
		</Box>
	);
};

export default Home;
