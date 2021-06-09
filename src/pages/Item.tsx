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
} from "@chakra-ui/react";
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";

import Button from "../components/button/button";
import axios from "../API/API";
import { Item } from "./../Interface/Interface";
import { useAuthContext } from "../context/AuthContext";

interface RouteProps {
	slug: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const ItemPage: FC<Props> = ({ match }) => {
	const { user } = useAuthContext();

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
		<Box px='2rem' py='1rem' w='100%' h='100%' d='flex' justifyContent='center'>
			<Box w='90%' h='80%' d='flex'>
				<Box w='25rem' h='60%'>
					<Image
						src={data?.image}
						alt={data?.title}
						w='100%'
						h='100%'
						objectFit='cover'
					/>
				</Box>
				<Box
					style={{ flexGrow: 1 }}
					ml='2rem'
					px='1rem'
					d='flex'
					flexDir='column'>
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
						{user?.role === "admin" ? (
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
								<Button mr='1.2rem'>Add To Cart</Button>
								<Button>Add To Wishlist</Button>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ItemPage;

// 	return <Box w='100%' d='grid' placeItems='center' px='2rem' py='1rem'>
// 	<Box w='90%' d='flex'>
// 		<Box width='25rem' h='25rem'>
// 			<Image
// 				src={data.image}
// 				alt={data.title}
// 				w='100%'
// 				h='100%'
// 				objectFit='cover'
// 				objectPosition='center'
// 			/>
// 		</Box>
// 		<Box
// 			style={{ flexGrow: 1 }}
// 			ml='2rem'
// 			px='1rem'
// 			d='flex'
// 			flexDir='column'>
// 			<Heading fontSize='2rem' mb='1.2rem'>
// 				{data.title}
// 			</Heading>
// 			<Text fontWeight='semibold' mb='2rem'>
// 				{data?.description ||
// 					"psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
// 			</Text>
// 			<Text fontWeight='semi-bold' fontSize='1.5rem'>
// 				${data.price}
// 			</Text>
// 			<Box mt='auto' d='flex'>
// 				{user?.role === "admin" ? (
// 					<>
// 						<Button
// 							mr='1.2rem'
// 							border='none'
// 							borderRadius='none'
// 							px='3rem'
// 							bgColor='black'
// 							_hover={{
// 								bgColor: "black",
// 							}}
// 							_active={{
// 								bgColor: "black",
// 							}}
// 							onClick={() => router.push(`/edit/${data.slug}`)}>
// 							<Icon as={AiOutlineEdit} fontSize='1.2rem' color='#fff' />
// 						</Button>
// 						<Button
// 							border='none'
// 							borderRadius='none'
// 							px='3rem'
// 							bgColor='red.500'
// 							_active={{
// 								bgColor: "red.500",
// 							}}
// 							_hover={{
// 								bgColor: "red.500",
// 							}}
// 							onClick={deleteItem}>
// 							{deletingItem ? (
// 								<Spinner color='#fff' />
// 							) : (
// 								<Icon
// 									as={IoTrashBinOutline}
// 									fontSize='1.2rem'
// 									color='#fff'
// 								/>
// 							)}
// 						</Button>
// 					</>
// 				) : (
// 					<>
// 						<Button mr='1.2rem'>Add To Cart</Button>
// 						<Button>Add To Wishlist</Button>
// 					</>
// 				)}
// 			</Box>
// 		</Box>
// 	</Box>
// </Box>;
