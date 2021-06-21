import { FC } from "react";
import { Box, ListItem } from "@chakra-ui/react";
import { CartItem } from "../../../Interface/Interface";

interface ICartItem extends CartItem {
	itemID: string;
	user: string;
}

interface Props {
	cartItems: ICartItem[] | [] | undefined;
}

const CartItems: FC<Props> = ({ cartItems }) => {
	return (
		<Box>
			{cartItems?.map(item => (
				<Box>{item.title}</Box>
			))}
		</Box>
	);
};

export default CartItems;
