import React from "react";
import { CartItems, CartItem } from "../Interface/Interface";
import { saveItemToCart, deleteItemFromCart } from "../utils/helper";
import { useAuthContext } from "./AuthContext";
import useToastAPI from "./../hooks/useToastAPI";
import axios from "./../API/API";

interface newCartItem {
	itemID: string;
	title: string;
	price: number;
	image: string;
}
interface CreateContext {
	openDrawer: boolean;
	toggleDrawer: () => void;
	activeDrawerTab: string;
	handleActiveTab: (v: string) => void;
	allCartItems: CartItems;
	addItemToCart: (item: any) => void;
	removeItemFromCart: (item: CartItem) => void;
}

const DrawerContext = React.createContext<CreateContext>({
	openDrawer: false,
	toggleDrawer: () => {},
	activeDrawerTab: "cart",
	handleActiveTab: value => {},
	allCartItems: [],
	addItemToCart: item => {},
	removeItemFromCart: item => {},
});

interface Props {
	children: React.ReactNode;
}

const DrawerContextProvider: React.FC<Props> = ({ children }) => {
	const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

	const [activeDrawerTab, setActiveDrawerTab] = React.useState("cart");

	const [allCartItems, setCartItems] = React.useState<CartItems>([]);

	const { user } = useAuthContext();

	const toast = useToastAPI();

	React.useEffect(() => {
		if (user?.token) {
			const FETCH_CARTITEMS = async () => {
				const response = await axios({
					url: "/cart",
					method: "GET",
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				});

				setCartItems(response.data.data.cartItems);
			};
			FETCH_CARTITEMS();
		}
	}, [user?.token]);

	const handleActiveTab = (value: string) => {
		setActiveDrawerTab(value);
	};

	const toggleDrawer = () => {
		setOpenDrawer(prevState => !prevState);
	};

	const addItemToCart = async (newItem: newCartItem) => {
		//1.check if the item exists in the cart
		//2.if yes then increate the qty;
		//3.else add new item with qty property set to 1.

		if (!user?.token) {
			return toast({
				title: "You are not logged In",
				duration: 1000,
				isClosable: true,
				status: "error",
			});
		}

		try {
			const res = await axios({
				url: "/cart",
				method: "POST",
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
				data: newItem,
			});

			// console.log(res.data.data.item);

			// setCartItems(saveItemToCart(newItem, allCartItems));

			toast({
				title: "Item added to Cart",
				duration: 1000,
				isClosable: true,
				status: "success",
			});
		} catch (error) {
			toast({
				title: "something went wrong",
				description: "Try again later.",
				duration: 1000,
				isClosable: true,
				status: "error",
			});
		}

		// if (!token) {
		// 	// toggleModal();
		// } else {
		// 	setCartItems([newItem, ...allCartItems]);
		// }
	};

	const removeItemFromCart = (item: CartItem) => {
		setCartItems(deleteItemFromCart(item, allCartItems));
	};

	return (
		<DrawerContext.Provider
			value={{
				openDrawer,
				toggleDrawer,
				activeDrawerTab,
				handleActiveTab,
				allCartItems,
				addItemToCart,
				removeItemFromCart,
			}}>
			{children}
		</DrawerContext.Provider>
	);
};

export const useDrawerContext = () => React.useContext(DrawerContext);

export default DrawerContextProvider;
