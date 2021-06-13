import { CartItem as ICartItem } from "../Interface/Interface";

export const CapitalizeLetter = (string: string) => {
	const [FirstLetter, ...restLetter] = string.split("");

	return [FirstLetter.toUpperCase(), ...restLetter].join("");
};

export const saveItemToCart = (
	newItemToAdd: ICartItem,
	CartItems: ICartItem[]
) => {
	const existingCartItem = CartItems.find(
		cartItem => cartItem.id === newItemToAdd.id
	);

	if (existingCartItem) {
		return CartItems.map(cartItem =>
			cartItem.id === newItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...CartItems, { ...newItemToAdd, quantity: 1 }];
};

export const deleteItemFromCart = (
	itemToRemove: ICartItem,
	CartItems: ICartItem[]
) => {
	const getItemToRemoveFromCart = CartItems.find(
		cartItem => cartItem.id === itemToRemove.id
	)!;

	console.log(getItemToRemoveFromCart?.quantity > 1);

	if (getItemToRemoveFromCart?.quantity > 1) {
		return CartItems.map((cartItem: ICartItem) => {
			return cartItem.id === itemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem;
		});
	}

	return CartItems.filter(
		(cartItem: ICartItem) => cartItem.id !== itemToRemove.id
	);
};
