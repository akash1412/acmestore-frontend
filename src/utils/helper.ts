import { CartItem, CartItems } from "../Interface/Interface";

export const CapitalizeLetter = (string: string) => {
	const [FirstLetter, ...restLetter] = string.split("");

	return [FirstLetter.toUpperCase(), ...restLetter].join("");
};

export const saveItemToCart = (
	newItemToAdd: CartItem,
	CartItems: CartItems
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
	itemToRemove: CartItem,
	CartItems: CartItems
) => {
	const getItemToRemoveFromCart = CartItems.find(
		cartItem => cartItem.id === itemToRemove.id
	)!;

	console.log(getItemToRemoveFromCart?.quantity > 1);

	if (getItemToRemoveFromCart?.quantity > 1) {
		return CartItems.map((cartItem: CartItem) => {
			return cartItem.id === itemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem;
		});
	}

	return CartItems.filter(
		(cartItem: CartItem) => cartItem.id !== itemToRemove.id
	);
};

export const totalAmount = (allCartItems: CartItems) =>
	allCartItems.reduce(
		(acc, item: CartItem) => item.price * item.quantity + acc,
		0
	);



	