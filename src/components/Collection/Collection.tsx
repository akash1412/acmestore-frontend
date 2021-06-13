import React from "react";
import { Grid } from "@chakra-ui/react";
import Card from "../Card/Card";

import { Item } from "../../Interface/Interface";

interface CollectionProps {
	/** expects array of store items */
	items: Item[];
}

const Collection: React.FC<CollectionProps> = ({ items }): JSX.Element => {
	return (
		<Grid
			justifyContent='center'
			gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]}
			gridGap='1rem'
			justifyItems='center'>
			{items.map(item => (
				<Card key={item._id} {...item} />
			))}
		</Grid>
	);
};

export default Collection;
