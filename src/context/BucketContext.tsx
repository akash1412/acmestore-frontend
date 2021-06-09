import React from "react";
import { Item } from "../Interface/Interface";
import { useAuthContext } from "./AuthContext";
import { useModalContext } from "./ModalContext";

interface CreateContext {
	allCartItems: Item[];
	addItemToCart: (item: Item) => void;
}

const BucketContext = React.createContext<CreateContext>({
	allCartItems: [],
	addItemToCart: item => {},
});

export const useBucketContext = () => React.useContext(BucketContext);

interface Props {
	children: React.ReactNode;
}

const BucketContextProvider: React.FC<Props> = ({ children }) => {
	const [allCartItems, setCartItem] = React.useState<Item[]>([]);

	const { user } = useAuthContext();

	const { toggleModal } = useModalContext();

	const addItemToCart = (newItem: Item) => {
		if (!user) {
			toggleModal();
		} else {
			setCartItem([...allCartItems, newItem]);
		}
	};

	return (
		<BucketContext.Provider value={{ allCartItems, addItemToCart }}>
			{children}
		</BucketContext.Provider>
	);
};

export default BucketContextProvider;
