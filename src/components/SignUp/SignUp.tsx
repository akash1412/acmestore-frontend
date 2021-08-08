import { useState } from 'react';
import {
	Flex,
	Input,
	FormLabel,
	Spinner,
	Heading,
	Stack,
	FormControl,
} from '@chakra-ui/react';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../button/button';
import { useHistory } from 'react-router';
import axios from '../../API/API';

import { useAuthContext } from '../../context/AuthContext';
import useToastAPI from './../../hooks/useToastAPI';
import useForm from './../../hooks/useForm';

interface IInputValue {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUp: React.FC<{}> = () => {
	const { handleAuthState } = useAuthContext();

	const history = useHistory();
	const toast = useToastAPI();

	const { inputs, clearForm, handleChange } = useForm<IInputValue>({
		name: '',
		email: '',
		password: 'akash123',
		confirmPassword: 'akash123',
	});

	const [isSubmitting, setSubmitting] = useState(false);

	const SignUpUser = async (e: React.FormEvent) => {
		e.preventDefault();

		setSubmitting(true);

		try {
			// const res = await axios({
			// 	url: '/users/signup',
			// 	method: 'POST',
			// 	data: {
			// 		name: inputs.name,
			// 		email: inputs.email,
			// 		password: inputs.password,
			// 		passwordConfirm: inputs.confirmPassword,
			// 	},
			// });

			// const {
			// 	token,
			// 	data: { user },
			// } = res.data;

			// handleAuthState({
			// 	name: user.name,
			// 	token: token,
			// 	role: user.role,
			// 	photo: user.photo || null,
			// });

			console.log(inputs);
			clearForm();

			history.push('/');
		} catch (error) {
			console.log('Error ', error.response);

			//@ts-ignore
			toast({
				title: error.response.data.message,
				status: 'error',
				duration: 1000,
				isClosable: true,
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Flex flexDir='column' w={['100%', '25rem']}>
			<Heading fontSize={['1.5rem', '2rem']} mb='1rem'>
				Create your account
			</Heading>

			<form onSubmit={SignUpUser}>
				<FormControl isDisabled={isSubmitting} aria-disabled={isSubmitting}>
					<Stack>
						<FormLabel fontWeight='semibold'>Name</FormLabel>
						<Input
							id='name'
							name='name'
							value={inputs.name}
							onChange={handleChange}
							borderRadius='none'
							placeholder='John Doe'
						/>

						<FormLabel fontWeight='semibold'>Email address</FormLabel>
						<Input
							id='email'
							name='email'
							value={inputs.email}
							onChange={handleChange}
							borderRadius='none'
							placeholder='john@gmail.com'
						/>

						<FormLabel fontWeight='semibold'>Password</FormLabel>
						<PasswordInput
							name='password'
							value={inputs.password}
							onChange={handleChange}
							placeholder='Password'
						/>

						<FormLabel fontWeight='semibold'>Confirm Password</FormLabel>
						<PasswordInput
							name='confirmPassword'
							value={inputs.confirmPassword}
							onChange={handleChange}
							placeholder='Confirm Password'
						/>

						<Button
							type='submit'
							px='2rem'
							bgColor='black'
							color='white'
							border='1.2px solid black'
							_hover={{
								bgColor: 'white',
								color: 'black',
								border: '1.2px solid black',
							}}
							opacity={isSubmitting ? '.7' : '1'}
							isLoading={isSubmitting}
							spinner={<Spinner size='sm' />}
							loadingText='creating account...'>
							Sign Up
						</Button>
					</Stack>
				</FormControl>
			</form>
		</Flex>
	);
};

export default SignUp;
