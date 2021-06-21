import { FC, useState, useEffect, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Box, Spinner, Icon } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import useToastAPI from "../../hooks/useToastAPI";

import axios from "../../API/API";
import { Item } from "../../Interface/Interface";
import { useAuthContext } from "../../context/AuthContext";

import { useDrawerContext } from "./../../context/DrawerContext";

import ItemContent from "./parts/ItemContent";

interface RouteProps {
	slug: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const ItemPage: FC<Props> = ({ match, history }) => {
	const { user } = useAuthContext();

	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState<null | Item>(null);

	const { addItemToCart } = useDrawerContext();

	const toast = useToastAPI();

	useEffect(() => {
		setIsLoading(true);
		function GET_ITEM() {
			axios({
				url: `/store/${match.params.slug}`,
			}).then(res => {
				setData(res.data.data.item);

				setIsLoading(false);
			});
		}

		GET_ITEM();
	}, [match.params.slug]);

	const [deletingItem, setDeletingItem] = useState(false);

	const handleDeleteItemAction = () => {
		setDeletingItem(true);

		axios({
			url: `/store/${data?.slug}`,
			method: "DELETE",
		})
			.then(() => {
				toast({
					title: "Item Deleted Successfully",
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch(() => {
				toast({
					title: "Something went wrong",
					description: "Try Again Later",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			})
			.finally(() => {
				setDeletingItem(false);
			});
	};

	if (isLoading) {
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
	}

	const handleAddToCartItemAction = () => {
		addItemToCart(data);
	};

	return (
		<Fragment>
			<Box py='2.5rem'>
				<Icon
					as={BsArrowLeft}
					ml='1rem'
					fontSize='2rem'
					onClick={() => history.goBack()}
				/>
				<Box w='100%' h='100%' d='grid' placeItems='center'>
					<ItemContent
						{...data}
						role={user?.role}
						handleDeleteItemAction={handleDeleteItemAction}
						handleAddToCartItemAction={handleAddToCartItemAction}
						deletingItem={deletingItem}
					/>
				</Box>
			</Box>
		</Fragment>
	);
};

export default ItemPage;
