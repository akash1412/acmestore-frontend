import { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
	Box,
	Image,
	Heading,
	Text,
	Icon,
	useToast,
	Spinner,
	Button,
} from "@chakra-ui/react";
import { IoTrashBinOutline } from "react-icons/io5";
import {
	AiOutlineEdit,
	AiOutlineShoppingCart,
	AiOutlineHeart,
} from "react-icons/ai";
import useToastAPI from "../hooks/useToastAPI";

import axios from "../API/API";
import { Item } from "./../Interface/Interface";
import { useAuthContext } from "../context/AuthContext";

interface RouteProps {
	slug: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const ItemPage: FC<Props> = ({ match }) => {
	const { userInfo } = useAuthContext();

	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState<null | Item>(null);

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

	const toast = useToast();

	const [deletingItem, setDeletingItem] = useState(false);

	const deleteItem = () => {
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
			<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
				<Spinner size='xl' />
			</Box>
		);
	}

	return (
		<Box w='100%' h='100%' d='grid' placeItems='center' py='2.5rem'>
			<Box
				py='1rem'
				w='90%'
				m='0 auto'
				h='100%'
				d='flex'
				justifyContent='center'>
				<Box w='260px'>
					<Image
						src={data?.image}
						alt={data?.title}
						w='100%'
						borderRadius='.8rem'
						objectFit='cover'
					/>
				</Box>
				<Box ml='2rem' px='1rem' d='flex' flexDir='column'>
					<Heading fontSize='2rem' mb='1.2rem'>
						{data?.title}
					</Heading>
					<Text fontWeight='semibold' mb='2rem'>
						{data?.description ||
							"psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
					</Text>
					<Text fontWeight='semi-bold' fontSize='1.5rem'>
						${data?.price}
					</Text>
					<Box mt='auto' d='flex'>
						{userInfo?.role === "admin" ? (
							<>
								<Button
									mr='1.2rem'
									border='none'
									borderRadius='none'
									px='3rem'
									bgColor='black'
									_hover={{
										bgColor: "black",
									}}
									_active={{
										bgColor: "black",
									}}
									// onClick={() =>(`/edit/${data.slug}`)}
								>
									<Icon as={AiOutlineEdit} fontSize='1.2rem' color='#fff' />
								</Button>
								<Button
									border='none'
									borderRadius='none'
									px='3rem'
									bgColor='red.500'
									_active={{
										bgColor: "red.500",
									}}
									_hover={{
										bgColor: "red.500",
									}}
									onClick={deleteItem}>
									{deletingItem ? (
										<Spinner color='#fff' />
									) : (
										<Icon
											as={IoTrashBinOutline}
											fontSize='1.2rem'
											color='#fff'
										/>
									)}
								</Button>
							</>
						) : (
							<>
								<Button
									w='8rem'
									bgColor='black'
									color='#fff'
									boxShadow='md'
									_hover={{ bgColor: "black" }}
									_active={{ bgColor: "black" }}>
									<Icon as={AiOutlineShoppingCart} w='1.4rem' h='1.4rem' />
								</Button>
								<Button
									w='8rem'
									border='1.5px solid black'
									color='black'
									bgColor='#fff'
									ml='2rem'
									_hover={{ bgColor: "black", color: "#fff" }}
									_active={{ bgColor: "black", color: "#fff" }}>
									<Icon as={AiOutlineHeart} w='1.4rem' h='1.4rem' />
								</Button>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ItemPage;
