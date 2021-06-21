import { FC } from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import ItemActions from "./ItemActions";
import { Item } from "../../../Interface/Interface";

interface Props extends Partial<Item> {
	role: string | undefined;
	handleDeleteItemAction: () => void;
	handleAddToCartItemAction: () => void;
	deletingItem: boolean;
}

const ItemContent: FC<Props> = ({
	role,
	handleAddToCartItemAction,
	handleDeleteItemAction,
	deletingItem,
	...data
}) => {
	return (
		<Box
			py={[".8rem", ".8rem", "1rem"]}
			w={["100%", "100%", "90%"]}
			m={[0, "0 auto"]}
			h='100%'
			d='flex'
			flexDir={["column", "column", "row"]}
			justifyContent='center'
			alignItems={["center", "center", "unset"]}>
			<Box w='260px'>
				<Image
					src={data?.image}
					alt={data?.title}
					w='100%'
					borderRadius='.8rem'
					objectFit='cover'
				/>
			</Box>
			<Box ml={[0, "2rem"]} px='1rem' d='flex' flexDir='column'>
				<Heading
					fontSize={["1.5rem", "1.5rem", "2rem"]}
					mt={["1rem", "1rem", "0rem"]}
					mb='1.2rem'
					textAlign={["center"]}>
					{data?.title}
				</Heading>
				<Text fontWeight='semibold' mb='2rem'>
					{data?.description ||
						"psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
				</Text>
				<Text fontWeight='bold' fontSize='1.5rem'>
					${data?.price}
				</Text>

				<ItemActions
					role={role}
					handleDeleteItemAction={handleDeleteItemAction}
					deletingItem={deletingItem}
					handleAddToCartItemAction={handleAddToCartItemAction}
				/>
			</Box>
		</Box>
	);
};

export default ItemContent;
