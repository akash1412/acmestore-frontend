import React from 'react';
import { Grid, Box } from '@chakra-ui/react';
import Card from '../Card/Card';
import { motion } from 'framer-motion';

import { Item } from '../../Interface/Interface';

interface CollectionProps {
	/** expects array of store items */
	items?: Item[];
}

const MotionBox = motion(Box);

const Collection: React.FC<CollectionProps> = ({ items = [] }): JSX.Element => {
	return (
		<MotionBox
			transition={{ duration: 0.3 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<Grid
				m='0 auto'
				maxWidth='1200px'
				justifyContent='center'
				gridTemplateColumns={[
					'repeat(1,1fr)',
					'repeat(1,1fr)',
					'repeat(2,1fr)',
					'repeat(3,1fr)',
					'repeat(4,1fr)',
				]}
				gridColumnGap='1rem'
				gridRowGap={['2rem']}
				justifyItems='center'>
				{items.map(item => (
					<Card key={item._id} {...item} />
				))}
			</Grid>
		</MotionBox>
	);
};

export default Collection;
