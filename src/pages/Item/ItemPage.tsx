import { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Spinner, Icon } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import useToastAPI from '../../hooks/useToastAPI';

import axios from '../../API/API';
import { Item } from '../../Interface/Interface';
import { useAuthContext } from '../../context/AuthContext';

import ItemContent from './parts/ItemContent';
import MetaHead from '../../components/MetaHead/MetaHead';
import useFetch from '../../hooks/useFetch';
import LoadingUI from '../../components/LoadingUI/LoadingUI';

interface RouteProps {
	slug: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const ItemPage: FC<Props> = ({ match, history }) => {
	const { user } = useAuthContext();

	const { data, isLoading, error } = useFetch<{ item: Item }>({
		url: `https://ecom-api-v1.herokuapp.com/api/v1/store/${match.params.slug}`,
	});

	const toast = useToastAPI();

	const [deletingItem, setDeletingItem] = useState(false);

	const handleDeleteItemAction = () => {
		setDeletingItem(true);

		axios({
			url: `/store/${data?.item.slug}`,
			headers: {
				authorization: `Bearer ${user?.token}`,
			},
			method: 'DELETE',
		})
			.then(() => {
				toast({
					title: 'Item Deleted Successfully',
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
				setDeletingItem(false);
				history.push('/');
			})
			.catch(() => {
				toast({
					title: 'Something went wrong',
					description: 'Try Again Later',
					status: 'error',
					duration: 3000,
					isClosable: true,
				});
				setDeletingItem(false);
			});
	};

	if (isLoading) {
		return <LoadingUI />;
	}

	return (
		<Box w='100%' h='100%'>
			<MetaHead title={`ACME | ${match.params.slug}`} />
			{data && (
				<Icon
					as={BsArrowLeft}
					mt='2rem'
					ml='4rem'
					fontSize='2rem'
					cursor='pointer'
					onClick={() => history.goBack()}
				/>
			)}
			<Box my={['2rem', '4rem']} d='flex' justifyContent='center'>
				{data && (
					<ItemContent
						role={user?.role}
						handleDeleteItemAction={handleDeleteItemAction}
						deletingItem={deletingItem}
						{...data?.item}
					/>
				)}
			</Box>
		</Box>
	);
};

export default ItemPage;
