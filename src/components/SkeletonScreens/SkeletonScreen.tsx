import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";

const ItemLoadingScreen = () => {
	return (
		<Box d='flex' w='260px' h='22rem'>
			<Skeleton
				w='100%'
				h='100%'
				fadeDuration={0.2}
				startColor='#CCC'
				endColor='#000'
				borderRadius='.6rem'
			/>
		</Box>
	);
};

export const ItemsLoading = () => {
	return (
		<Grid
			justifyContent='center'
			gridTemplateColumns={[
				"repeat(1,1fr)",
				"repeat(1,1fr)",
				"repeat(2,1fr)",
				"repeat(3,1fr)",
			]}
			gridAutoRows='1fr'
			gridGap='1rem'
			gridRowGap={["2rem"]}
			justifyItems='center'>
			{new Array(10).fill(0).map(i => (
				<ItemLoadingScreen />
			))}
		</Grid>
	);
};

export const Item = () => {
	return (
		<Box d='flex'>
			<Skeleton w='260px' h='25rem' />
			<Box d='flex' flexDir='column'>
				<SkeletonText noOfLines={2} />
				<Box d='flex'>
					<Skeleton w='8rem' mr='2rem' /> <Skeleton w='8rem' />
				</Box>
			</Box>
		</Box>
	);
};
