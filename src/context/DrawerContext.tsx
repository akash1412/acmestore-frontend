import React from "react";
import { CartItem } from "../Interface/Interface";
import { saveItemToCart, deleteItemFromCart } from "../utils/helper";
import { useAuthContext } from "./AuthContext";
import useToastAPI from "./../hooks/useToastAPI";

interface CreateContext {
	openDrawer: boolean;
	toggleDrawer: () => void;
	activeDrawerTab: string;
	handleActiveTab: (v: string) => void;
	allCartItems: CartItem[];
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

	const [allCartItems, setCartItem] = React.useState<CartItem[]>([]);

	const { token } = useAuthContext();

	const toastAPI = useToastAPI();

	const handleActiveTab = (value: string) => {
		setActiveDrawerTab(value);
	};

	const toggleDrawer = () => {
		setOpenDrawer(prevState => !prevState);
	};

	const addItemToCart = (newItem: any) => {
		//1.check if the item exists in the cart
		//2.if yes then increate the qty;
		//3.else add new item with qty property set to 1.

		setCartItem(saveItemToCart(newItem, allCartItems));
		toastAPI({
			title: "yay",
			duration: 3000,
			isClosable: true,
			status: "success",
		});
		// if (!token) {
		// 	// toggleModal();
		// } else {
		// 	setCartItem([newItem, ...allCartItems]);
		// }
	};

	const removeItemFromCart = (item: CartItem) => {
		setCartItem(deleteItemFromCart(item, allCartItems));
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
