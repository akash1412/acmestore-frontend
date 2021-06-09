import React from "react";
import { Box } from "@chakra-ui/react";

const Avatar: React.FC<{ image?: string }> = () => {
	return (
		<Box
			ml='1.2rem'
			className='gradient'
			cursor='pointer'
			borderRadius='50%'
			py='.2rem'
			px='.6rem'>
			&nbsp;
		</Box>
	);
};

export default Avatar;
