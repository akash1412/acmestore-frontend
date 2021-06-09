import { FC, useState, useEffect } from "react";
import axios from "./../API/API";

import MetaHead from "./../components/MetaHead/MetaHead";
import { RouteComponentProps } from "react-router-dom";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Collection from "./../components/Collection/Collection";

import { Item } from "./../Interface/Interface";
import useFetch from "./../hooks/useFetch";
import { CapitalizeLetter } from "./../utils/helper";

interface RouteProps {
	c: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const Category: FC<Props> = ({ match }): JSX.Element => {
	const [data, isLoading] = useFetch(`/store/category/${match.params.c}`, {
		method: "GET",
	});

	const MotionBox = motion(Box);

	if (isLoading) {
		return (
			<Box pos='absolute' top='50%' left='50%' transform='translate(-50%,-50%)'>
				<Spinner w='50px' h='50px' />
			</Box>
		);
	}

	return (
		<MotionBox
			width='100%'
			transition={{ duration: 0.5 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<Box
				py='.5rem'
				px='1.5rem'
				d='grid'
				justifyContent='center'
				gridAutoColumns='repeat(auto-fit,1fr)'>
				<MetaHead title={match.params.c} />

				<Heading fontSize='1.6rem' mb='.6rem'>
					{CapitalizeLetter(match.params.c)} "({data.length}) items"
				</Heading>
				<Collection items={data} />
			</Box>
		</MotionBox>
	);
};

export default Category;
