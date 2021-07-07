import { createStandaloneToast } from '@chakra-ui/react';

type toastProps = {
	title: string;
	status?: 'error' | 'warning' | 'success';
	description?: string;
	duration: number;
	isClosable: boolean;
};

const useToastAPI = () => (props: toastProps) => {
	const toast = createStandaloneToast();

	return toast({
		...props,
	});
};

export default useToastAPI;
