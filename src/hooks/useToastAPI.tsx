import { createStandaloneToast } from "@chakra-ui/react";

const useToastAPI = () => {
	const toast = createStandaloneToast();

	return toast({
		title: "YAY",
		description: "sd",
		isClosable: true,
		duration: 1000,
	});
};

export default useToastAPI;
