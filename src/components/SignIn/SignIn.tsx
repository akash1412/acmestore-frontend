import { useState } from 'react';

import axios from '../../API/API';

import { FcGoogle } from 'react-icons/fc';
import { useHistory } from 'react-router-dom';
import {
	Flex,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	Spinner,
	Stack,
	Heading,
	Icon,
} from '@chakra-ui/react';
import GoogleLoginBtn from 'react-google-login';
import { useAuthContext } from '../../context/AuthContext';
import PasswordInput from '../PasswordInput/PasswordInput';
import useToastAPI from './../../hooks/useToastAPI';
import Button from '../button/button';

import { Form, Formik, FormikProps, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useForm from './../../hooks/useForm';

interface values {
	email: string;
	password: string;
}

const SignIn: React.FC<{}> = () => {
	const { inputs, handleChange, clearForm } = useForm<values>({
		email: '',
		password: '',
	});

	const [isSubmitting, setSubmitting] = useState(false);

	const { handleAuthState } = useAuthContext();

	const history = useHistory();

	const toast = useToastAPI();

	const Login = async (inputs: values) => {
		setSubmitting(true);

		try {
			const res = await axios({
				url: '/users/login',
				method: 'POST',
				data: inputs,
			});
			const {
				token,
				data: { user },
			} = res.data;
			handleAuthState({ ...user, token });
			console.log(res);
			clearForm();
			history.push('/');
		} catch (error) {
			const title: string = error.response.data.message;
			toast({
				title: title,
				duration: 500,
				isClosable: true,
				status: 'error',
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Flex flexDir='column' w={['100%', '25rem', '25rem']}>
			<Heading fontSize={['1.5rem', '2rem']} mb='1rem'>
				Login in to your account
			</Heading>

			<form
				onSubmit={(e: React.FormEvent) => {
					e.preventDefault();

					Login(inputs);
				}}>
				<Stack direction='column' spacing='2rem' fontSize={['1rem', '1.2rem']}>
					<FormLabel fontWeight='semibold'>Email address</FormLabel>
					<Input
						name='email'
						value={inputs.email}
						onChange={handleChange}
						borderRadius='none'
						isRequired
						placeholder='Email'
					/>

					<FormLabel fontWeight='semibold'>Password</FormLabel>
					<PasswordInput
						value={inputs.password}
						name='password'
						onChange={handleChange}
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
						loadingText='loging in...'
						spinner={<Spinner size='sm' />}>
						Sign In
					</Button>
				</Stack>
			</form>
		</Flex>
	);
};

export default SignIn;

{
	/* <Formik
				initialValues={{
					email: '',
					password: '',
				}}
				onSubmit={(values, actions) => Login(values, actions)}
				validationSchema={validationSchema}>
				{({
					values,
					handleChange,
					errors,

					isSubmitting,
				}: FormikProps<values>) => (
					<Form>
						<Stack
							direction='column'
							spacing='2rem'
							fontSize={['1rem', '1.2rem']}>
							<Field name='email'>
								{({ field, form }: any) => (
									<FormControl
										isInvalid={form.errors.email && form.touched.email}>
										<FormLabel fontWeight='semibold'>Email address</FormLabel>
										<Input
											{...field}
											borderRadius='none'
											isRequired
											placeholder='Email'
										/>
										<FormErrorMessage>{errors.email}</FormErrorMessage>
									</FormControl>
								)}
							</Field>

							<Field name='password'>
								{({ field, form }: any) => (
									<FormControl
										isInvalid={form.errors.password && form.touched.password}>
										<FormLabel fontWeight='semibold'>Password</FormLabel>
										<PasswordInput {...field} />
										<FormErrorMessage>{errors.password}</FormErrorMessage>
									</FormControl>
								)}
							</Field>

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
								loadingText='loging in...'
								spinner={<Spinner size='sm' />}>
								Sign In
							</Button>
						</Stack>
					</Form>
				)}
			</Formik> */
}
