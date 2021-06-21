import { FC } from "react";
import { Box, Button, Icon, Spinner } from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineShopping } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";

interface Props {
	role: string | undefined;
	handleDeleteItemAction: () => void;
	deletingItem: boolean;
	handleAddToCartItemAction: () => void;
}

const ItemActions: FC<Props> = ({
	role,
	handleDeleteItemAction,
	deletingItem,
	handleAddToCartItemAction,
}) => {
	return (
		<Box mt={["1rem", "1rem", "auto"]} d='flex'>
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
						onClick={handleAddToCartItemAction}>
						<Icon as={AiOutlineShopping} w='1.4rem' h='1.4rem' />
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
