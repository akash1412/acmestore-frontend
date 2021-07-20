import { FC } from 'react';
import { Box } from '@chakra-ui/react';

import CreateItemForm from '../../components/CreateItemForm/CreateItemForm';
import MetaHead from './../../components/MetaHead/MetaHead';

function CreateItemPage() {
	return (
		<Box m='auto' w='100%' h='auto' py='1.2rem' px={['.8rem', '1rem']}>
			<MetaHead title='ACME | Add New ' />
			<Box
				p={['.5rem', '1.2rem']}
				w={['100%', '90%', '30rem']}
				h='auto'
				m='0 auto'
				bgColor='#fff'
				boxShadow='lg'
				borderRadius='.6rem'>
				<CreateItemForm />
			</Box>
		</Box>
	);
}

export default CreateItemPage;
