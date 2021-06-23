export interface Item {
	_id?: string | undefined;
	title: string;
	slug: string;
	description?: string;
	price: number;
	image: string;
	category: string;
	createdAt: string;
	updatedAt: string;
}

export interface newCartItem {
	itemID: string;
	title: string;
	price: number;
	image: string;
}

export type CartItem = {
	id: string;
	title: string;
	price: number;
	image: string;
	quantity: number;
	itemID: string;
	user: string;
};

export type CartItems = CartItem[];

export interface IUpdateProfile {
	name?: string;
	email?: string;
	photo?: string;
}
