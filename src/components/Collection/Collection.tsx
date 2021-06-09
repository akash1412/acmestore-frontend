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
			mt='.4rem'
			gridTemplateColumns={[
				"repeat(1,1fr)",
				"repeat(2,1fr)",
				"repeat(3,1fr)",
				"repeat(4,1fr)",
			]}
			gridGap='1rem'>
			{items.map(item => (
				<Card key={item._id} {...item} />
			))}
		</Grid>
	);
};

export default Collection;
