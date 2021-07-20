import { FC, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
// import useFetch from '../hooks/useFetch';
import { RouteComponentProps } from 'react-router-dom';
import Collection from '../../components/Collection/Collection';

import { ItemsLoading } from '../../components/SkeletonScreens/SkeletonScreen';
import Button from '../../components/button/button';
import { Item } from '../../Interface/Interface';
import axios from '../../API/API';
import MetaHead from '../../components/MetaHead/MetaHead';
import CategoryLinks from './CategoryLinks';
import useFetch from './../../hooks/useFetch';

interface Props extends RouteComponentProps<{ page: string }> {}

const Home: FC<Props> = ({ match, history }) => {
	const [data, isLoading] = useFetch<{ total: number; items: Item[] }>({
		url: '/store',
	});

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
			<MetaHead title='ACME' />
			{/* <CategoryLinks /> */}
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
