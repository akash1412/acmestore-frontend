import React from 'react';
import {
	CartItems,
	CartItem,
	newCartItem,
	UPDATE_TYPE,
} from '../Interface/Interface';
import { saveItemToCart, updateItem, deleteItem } from '../utils/helper';
import { useAuthContext } from './AuthContext';
import useToastAPI from './../hooks/useToastAPI';
import axios from './../API/API';

interface CreateContext {
	openDrawer: boolean;
	toggleDrawer: () => void;
	activeDrawerTab: string;
	handleActiveTab: (v: string) => void;
	allCartItems: CartItems;
	addItemToCart: (item: newCartItem) => void;
	addingItemToCart: boolean;
	updateItemQuantity: (item: CartItem, type: UPDATE_TYPE) => void;
	deleteItemFromCart: (item: CartItem) => void;
}

const DrawerContext = React.createContext<CreateContext>({
	openDrawer: false,
	toggleDrawer: () => {},
	activeDrawerTab: 'cart',
	handleActiveTab: value => {},
	allCartItems: [],
	addItemToCart: item => {},
	addingItemToCart: false,
	updateItemQuantity: (item, type) => {},
	deleteItemFromCart: item => {},
});

interface Props {
	children: React.ReactNode;
}

const DrawerContextProvider: React.FC<Props> = ({ children }) => {
	const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

	const [activeDrawerTab, setActiveDrawerTab] = React.useState('cart');

	const [allCartItems, setCartItems] = React.useState<CartItems>([]);

	const [addingItemToCart, setAddingItemToCart] =
		React.useState<boolean>(false);

	const { user } = useAuthContext();

	const toast = useToastAPI();

	React.useEffect(() => {
		if (user?.token) {
			const FETCH_CARTITEMS = async () => {
				const response = await axios({
					url: '/cart',
					method: 'GET',
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
				title: 'You are not logged In',
				duration: 1000,
				isClosable: true,
				status: 'error',
			});
		}

		try {
			setAddingItemToCart(true);
			const res = await axios({
				url: '/cart',
				method: 'POST',
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
				data: newItem,
			});

			const { item } = res.data.data;

			setCartItems(saveItemToCart(item, allCartItems));

			setAddingItemToCart(false);
			toast({
				title: 'Item added to Cart',
				duration: 1000,
				isClosable: true,
				status: 'success',
			});
		} catch (error) {
			toast({
				title: 'something went wrong',
				description: 'Try again later.',
				duration: 1000,
				isClosable: true,
				status: 'error',
			});
		}
	};

	const updateItemQuantity = async (item: CartItem, type: UPDATE_TYPE) => {
		try {
			setCartItems(updateItem(item, allCartItems, type));

			await axios({
				url: `/cart/${item.id}`,
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
				method: 'PATCH',
				data: { type },
			});
		} catch (error) {
			console.log(error.response);
			toast({
				title: 'something went wrong',
				description: 'Try again later.',
				duration: 1000,
				isClosable: true,
				status: 'error',
			});
		}
	};

	const deleteItemFromCart = async (item: CartItem) => {
		try {
			setCartItems(deleteItem(item, allCartItems));
			await axios({
				url: `/cart/${item.id}`,
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
				method: 'DELETE',
			});
			toast({
				title: 'Item deleted from cart',
				duration: 1000,
				isClosable: true,
				status: 'warning',
			});
		} catch (error) {
			console.log(error.response);
			toast({
				title: 'something went wrong',
				description: 'Try again later.',
				duration: 1000,
				isClosable: true,
				status: 'error',
			});
		}
	};

	return (
		<DrawerContext.Provider
			value={{
				openDrawer,
				toggleDrawer,
				activeDrawerTab,
				handleActiveTab,
				allCartItems,
				addingItemToCart,
				addItemToCart,
				updateItemQuantity,
				deleteItemFromCart,
			}}>
			{children}
		</DrawerContext.Provider>
	);
};

export const useDrawerContext = () => React.useContext(DrawerContext);

export default DrawerContextProvider;
