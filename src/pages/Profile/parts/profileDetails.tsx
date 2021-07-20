import { FC } from 'react';
import { Box, Input, Stack, Button, Spinner } from '@chakra-ui/react';
import { IUpdateProfile } from '../../../Interface/Interface';

import useForm from './../../../hooks/useForm';

interface Props {
	name?: string;
	email?: string;
	lastUpdated?: string;
	UpdateMe: (data: IUpdateProfile) => Promise<void>;
}

interface IFormValues {
	name?: string;
	email?: string;
}

const ProfileDetails: FC<Props> = ({ name, email, lastUpdated, UpdateMe }) => {
	const { inputs, handleChange, clearForm } = useForm<IFormValues>({
		name,
		email,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		UpdateMe(inputs);
	};

	return (
		<Box w='100%' mt='2rem'>
			<form onSubmit={handleSubmit}>
				<Stack flexDir='column' justifyContent='space-between' spacing='1rem'>
					<Input
						type='text'
						name='name'
						border='1px solid #000'
						value={inputs.name}
						placeholder='name'
						onChange={handleChange}
						required
					/>
					<Input
						type='text'
						name='email'
						border='1px solid #000'
						value={inputs.email}
						onChange={handleChange}
						placeholder='email'
						required
					/>

					<Button
						type='submit'
						color='#fff'
						bgColor='black'
						boxShadow='md'
						fontWeight='bold'
						_hover={{ bgColor: 'black', color: '#fff' }}
						_active={{ bgColor: 'black', color: '#fff' }}>
						update
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default ProfileDetails;
