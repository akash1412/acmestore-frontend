import { FC, useState } from "react";
import { Box } from "@chakra-ui/react";

import useFetch from "./../hooks/useFetch";

import { Spinner } from "@chakra-ui/react";
import Collection from "./../components/Collection/Collection";

const Home: FC<{}> = () => {
	const [data, isLoading] = useFetch("/store", { method: "GET" });

	const [categoryOptions] = useState(() => [
		{ key: "mens", value: "men" },
		{ key: "womens", value: "women" },
		{ key: "jackets", value: "jacket" },
		{ key: "hats", value: "hat" },
		{ key: "sneakers", value: "sneaker" },
	]);

	if (isLoading) {
		return (
			<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
				<Spinner size='xl' />
			</Box>
		);
	}

	return (
		<Box
			m='0 auto'
			w='70%'
			h='100%'
			py='.5rem'
			px='1.5rem'
			d='flex'
			flexDir='column'>
			{/* <Box
				alignSelf='center'
				d='grid'
				// justifyContent='center'
				justifyItems='center'
				gridTemplateColumns='repeat(5,1fr)'
				gridColumnGap='1.2rem'>
				{categoryOptions.map((category: { key: string; value: string }) => (
					<Box
						borderRadius='1.2rem'
						py='.2rem'
						px='.6rem'
						bgColor='#ccc'
						textAlign='center'>
						{category.key}
					</Box>
				))}
			</Box> */}

			<Collection items={data.slice(0, 10)} />
		</Box>
	);
};

export default Home;
