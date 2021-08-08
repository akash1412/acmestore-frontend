import { FunctionComponent } from 'react';

import { Box, Image } from '@chakra-ui/react';

const CategoryLinks: FunctionComponent<{}> = () => {
	return (
		<Box
			w='100%'
			d='flex'
			my='2rem'
			justifyContent='space-around'
			flexWrap='wrap'>
			<Box
				bgColor='pink.400'
				// mr='10px'
				borderRadius='.6rem'
				maxWidth='150px'
				h='150px'
				overflow='hidden'
				flex='1 1 0px'>
				<Image
					width='100%'
					objectFit='cover'
					src='https://res.cloudinary.com/dhqp2dd6b/image/upload/v1621426641/store/wyoojtb8q5hswm8p7cgb.png'
				/>
			</Box>
			<Box
				bgColor='red.300'
				// mr='10px'
				borderRadius='.6rem'
				maxWidth='150px'
				h='150px'
				overflow='hidden'
				flex='1 1 0px'>
				<Image
					width='100%'
					objectFit='cover'
					src='https://res.cloudinary.com/dhqp2dd6b/image/upload/v1621426640/store/izqwxqbtmldabxqz7rwr.png'
				/>
			</Box>
			<Box
				bgColor='pink.400'
				// mr='10px'
				borderRadius='.6rem'
				maxWidth='150px'
				h='150px'
				overflow='hidden'
				flex='1 1 0px'>
				<Image
					width='100%'
					objectFit='cover'
					src='https://res.cloudinary.com/dhqp2dd6b/image/upload/v1621426640/store/vt2gcd2ximw7jxlaczje.png'
				/>
			</Box>
			<Box
				bgColor='pink.400'
				// mr='10px'
				borderRadius='.6rem'
				maxWidth='150px'
				h='150px'
				overflow='hidden'
				flex='1 1 0px'>
				<Image
					width='100%'
					objectFit='cover'
					src='https://res.cloudinary.com/dhqp2dd6b/image/upload/v1621426640/store/tqprniajydhh9xmxr8xs.png'
				/>
			</Box>
			<Box
				gridColumn='1/-1'
				bgColor='pink.400'
				borderRadius='.6rem'
				maxWidth='150px'
				h='150px'
				overflow='hidden'
				flex='1 1 0px'>
				<Image
					width='100%'
					objectFit='cover'
					src='https://res.cloudinary.com/dhqp2dd6b/image/upload/v1621426641/store/psujduaundvu9ue5cwr6.png'
				/>
			</Box>
		</Box>
	);
};

export default CategoryLinks;
