import { FunctionComponent } from 'react';

import { Box } from '@chakra-ui/react';

const CategoryLinks: FunctionComponent<{}> = () => {
	return (
		<Box
			w='100%'
			d='grid'
			justifyContent='center'
			gridTemplateColumns={['repeat(2,1fr)', 'repeat(5,1fr)']}>
			{/* Mens ,womes ,sneakers, jackets,hats */}
			<Box bgColor='pink.400' h='100px'></Box>
			<Box bgColor='red.300' h='100px'></Box>
			<Box bgColor='pink.400' h='100px'></Box>
			<Box bgColor='pink.400' h='100px'></Box>
			<Box gridColumn='1/-1' bgColor='pink.400' maxWidth='50%' h='100px'>
				asds
			</Box>
		</Box>
	);
};

export default CategoryLinks;
