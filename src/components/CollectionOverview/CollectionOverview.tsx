import React from "react";
import { Box, Heading, Link } from "@chakra-ui/react";
import Collection from "../Collection/Collection";
import { motion } from "framer-motion";

import { Item } from "../../Interface/Interface";
import { CapitalizeLetter } from "./../../utils/helper";

interface CollectionOverviewProps {
	collection: {
		type: string;
		data: Item[];
	};
}

const MotionBox = motion(Box);

const CollectionOverview: React.FC<CollectionOverviewProps> = ({
	collection,
}) => {
	const { type, data } = collection;
	return (
		<MotionBox
			transition={{ duration: 0.5 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<Link href={`/s/${type}`} fontWeight='bold' fontSize='2rem' color='black'>
				{CapitalizeLetter(type)}
			</Link>
			<Collection items={data} />
		</MotionBox>
	);
};

export default CollectionOverview;
