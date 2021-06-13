import { Button as ChakraBtn } from "@chakra-ui/react";

const Button = ({ ...btnProps }) => {
	return (
		<ChakraBtn
			{...btnProps}
			_hover={{ bgColor: btnProps.bgColor }}
			_active={{ bgColor: btnProps.bgColor }}
		/>
	);
};

export default Button;
