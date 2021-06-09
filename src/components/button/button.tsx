import { Button as ChakraBtn } from "@chakra-ui/react";

const Button = ({ ...btnProps }) => {
	return (
		<ChakraBtn
			{...btnProps}
			border='none'
			borderRadius='none'
			_hover={{ bgColor: btnProps.bgColor }}
			_active={{ bgColor: btnProps.bgColor }}
		/>
	);
};

export default Button;
