import { FC, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
// import useFetch from '../hooks/useFetch';
import { RouteComponentProps } from 'react-router-dom';
import Collection from '../components/Collection/Collection';

import { ItemsLoading } from '../components/SkeletonScreens/SkeletonScreen';
import Button from '../components/button/button';
import { Item } from '../Interface/Interface';
import axios from '../API/API';

interface Props extends RouteComponentProps<{ page: string }> {}

const Home: FC<Props> = ({ match, history }) => {
	// const [data, isLoading] = useFetch(
	// 	"/store",
	// 	{ method: "GET" },
	// 	match.params.page
	// );

	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState<{ total: number; items: Item[] } | null>(
		null
	);

	if (match.params) {
		console.log(match);
	}
	useEffect(() => {
		setIsLoading(true);
		function FETCH() {
			axios({
				url: `/store/?page=${history.location.search.split('=')[1] || 1}`,
				method: 'GET',
			}).then(res => {
				console.log(res);
				setData(res.data.data);

				setIsLoading(false);
			});
		}

		FETCH();
	}, [history.location.search]);

	if (isLoading) {
		return (
			<Box mt='1.5rem' w='100%' h='100%' d='grid' placeItems='center'>
				<ItemsLoading />
			</Box>
		);
	}

	return (
		<Box
			m={[0, '0 auto']}
			w={['100%', '50%']}
			py='1rem'
			px={['.5rem', '1.5rem']}
			d='flex'
			flexDir='column'>
			<Collection items={data?.items} />

			<Box mt='1rem' d='flex' justifyContent={['space-around', 'center']}>
				<Button
					mr={[0, '1.5rem']}
					bgColor='black'
					colorScheme='ghost'
					color='#fff'
					boxShadow='sm'
					leftIcon={<BsArrowLeft />}
					onClick={() =>
						history.push({
							pathname: '/',
							search: 'page=1',
						})
					}>
					prev
				</Button>
				<Button
					bgColor='black'
					color='#fff'
					boxShadow='sm'
					rightIcon={<BsArrowRight />}>
					next
				</Button>
			</Box>
		</Box>
	);
};

export default Home;

// sm: "30em", ==> 480px
// md: "48em", ==> 768px
// lg: "62em", ==> 992px
// xl: "80em", ==> 1280px
// "2xl": "96em", ==> 1536px
