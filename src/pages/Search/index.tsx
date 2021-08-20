import { Box, Heading } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import qs from 'query-string';
import useFetch from './../../hooks/useFetch';
import { Item } from './../../Interface/Interface';
import LoadingUI from '../../components/LoadingUI/LoadingUI';
import Collection from '../../components/Collection/Collection';
import SearchBar from '../../components/SearchBar/SearchBar';
import MetaHead from '../../components/MetaHead/MetaHead';

const SearchPage: FC<RouteComponentProps> = ({ history }) => {
	const { search_query } = qs.parse(history.location.search);

	const { data, isLoading } = useFetch<{ searchResults: Item[] }>({
		url: `https://ecom-api-v1.herokuapp.com/api/v1/search?q=${search_query}`,
		dep: search_query,
	});

	const [searchInput, setSearchInput] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
			<MetaHead title='search' />
			<SearchBar
				searchInput={searchInput}
				handleInputChange={handleInputChange}
				handleFormSubmit={handleFormSubmit}
			/>
			<Heading mb='2rem' fontSize={['1.4rem', '1.6rem']}>
				results for term "{search_query}"
			</Heading>
			{<Collection items={data?.searchResults} />}
		</Box>
	);
};

export default SearchPage;
