export interface Item {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	price: number;
	image: string;
	category: string;
	createdAt: string;
	updatedAt: string;
}

export type CartItem = {
	id: string;
	title: string;
	price: number;
	image: string;
	quantity: number;
};
