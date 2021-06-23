import { FC } from "react";
import { Box, Button, Icon, Spinner } from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineShopping } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { CartItem, newCartItem } from "../../../Interface/Interface";
import { useContext } from "react";
import { useDrawerContext } from "../../../context/DrawerContext";
import { Item } from "./../../../Interface/Interface";

interface Props {
	data: any;
	role: string | undefined;
	handleDeleteItemAction: () => void;
	deletingItem: boolean;
}

const ItemActions: FC<Props> = ({
	data,
	role,
	handleDeleteItemAction,
	deletingItem,
}) => {
	const { addItemToCart, addingItemToCart } = useDrawerContext();

	return (
		<Box
			w='100%'
			mt={["1rem", "1rem", "auto"]}
			d='flex'
			justifyContent={["center", "center", "flex-start"]}>
			{role === "admin" ? (
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
						onClick={handleDeleteItemAction}>
						{deletingItem ? (
							<Spinner color='#fff' />
						) : (
							<Icon as={IoTrashBinOutline} fontSize='1.2rem' color='#fff' />
						)}
					</Button>
				</>
			) : (
				<>
					<Button
						w='8rem'
						bgColor='black'
						color='#fff'
						border='1.5px solid transparent'
						boxShadow='md'
						_hover={{ bgColor: "black" }}
						_active={{ bgColor: "black" }}
						opacity={addingItemToCart ? ".8" : "1"}
						onClick={() =>
							addItemToCart({
								itemID: data._id,
								title: data.title,
								price: data.price,
								image: data.image,
							})
						}>
						{!addingItemToCart ? (
							<Icon as={AiOutlineShopping} w='1.4rem' h='1.4rem' />
						) : (
							<Spinner size='sm' />
						)}
					</Button>
					<Button
						w='8rem'
						border='1.5px solid black'
						color='black'
						bgColor='#fff'
						boxShadow='md'
						fontWeight='bold'
						ml='2rem'
						_hover={{ bgColor: "black", color: "#fff" }}
						_active={{ bgColor: "black", color: "#fff" }}>
						Buy Now
					</Button>
				</>
			)}
		</Box>
	);
};

export default ItemActions;
