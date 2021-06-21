import { FC } from "react";
import { Box } from "@chakra-ui/react";

import useFetch from "./../hooks/useFetch";

import Collection from "./../components/Collection/Collection";

import { ItemsLoading } from "./../components/SkeletonScreens/SkeletonScreen";

const Home: FC<{}> = () => {
	const [data, isLoading] = useFetch("/store", { method: "GET" });

	if (isLoading) {
		return (
			<Box mt='1.5rem' w='100%' h='100%' d='grid' placeItems='center'>
				<ItemsLoading />
			</Box>
		);
	}

	return (
		<Box
			m={[0, "0 auto"]}
			w={["100%", "70%"]}
			py='.5rem'
			px={[".5rem", "1.5rem"]}
			d='flex'
			flexDir='column'
			mt='1.5rem'>
			<Box
				alignSelf='center'
				d='flex'
				flexWrap='wrap'
				gridRowGap='1rem'
				gridColumnGap='.5rem'></Box>

			<Collection items={data.slice(0, 10)} />
		</Box>
	);
};

export default Home;
