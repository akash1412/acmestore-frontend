import React from 'react';
import { Box, Heading, Link } from '@chakra-ui/react';
import Collection from '../Collection/Collection';
import { motion } from 'framer-motion';

import { Item } from '../../Interface/Interface';
import { CapitalizeLetter } from './../../utils/helper';

interface CollectionOverviewProps {
	type: string;
	data: Item[];
}

const MotionBox = motion(Box);

const CollectionOverview: React.FC<CollectionOverviewProps> = ({
	type,
	data,
}) => {
	return (
		<MotionBox
			transition={{ duration: 0.5 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<Box mb='2rem'>
				<Link
					href={`/s/${type}`}
					fontWeight='bold'
					fontSize='2rem'
					ml='1.8rem'
					color='black'
					textDecor='underline'>
					{`${CapitalizeLetter(type)}(${data.length})`}
				</Link>
				<Box mt='1.2rem'>
					<Collection items={data} />
				</Box>
			</Box>
		</MotionBox>
	);
};

export default CollectionOverview;
