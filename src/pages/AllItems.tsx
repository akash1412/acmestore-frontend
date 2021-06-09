import { FC, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "../API/API";
import CollectionOverview from "../components/CollectionOverview/CollectionOverview";
import useFetch from "./../hooks/useFetch";

import { Spinner } from "@chakra-ui/react";

const Home: FC<{}> = () => {
	const [data, isLoading] = useFetch("/store", { method: "GET" });

	if (isLoading) {
		return (
			<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
				<Spinner size='xl' />
			</Box>
		);
	}

	return (
		<Box
			pos='absolute'
			w='100%'
			h='100%'
			py='.5rem'
			px='1.5rem'
			d='grid'
			justifyContent='center'>
			{data.map((itemCollection: any) => (
				<CollectionOverview
					key={itemCollection.type}
					collection={itemCollection}
				/>
			))}
		</Box>
	);
};

export default Home;
