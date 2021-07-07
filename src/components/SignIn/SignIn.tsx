import React from 'react';
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

interface values {
	email: string;
	password: string;
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required(),
	password: Yup.string()
		.required('please enter your password')
		.min(8, 'Password length must be minimum of 8 characters')
		.max(25, 'Password length shall not excced than 25 characters '),
});

const SignIn: React.FC<{}> = () => {
	const { handleAuthState } = useAuthContext();

	const history = useHistory();

	const toast = useToastAPI();

	const Login = async (
		values: { email: string; password: string },
		actions: FormikHelpers<{ email: string; password: string }>
	) => {
		actions.setSubmitting(true);

		try {
			const res = await axios({
				url: '/users/login',
				method: 'POST',
				data: values,
			});
			const {
				token,
				data: { user },
			} = res.data;
			handleAuthState({ ...user, token });
			actions.resetForm();
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
			actions.setSubmitting(false);
		}
	};

	const onLoginWithGoogleSuccess = (res: any) => {
		console.log(res);

		toast({
			title: 'logged in successfully',
			duration: 1000,
			status: 'success',
			isClosable: true,
		});
	};
	const onLoginWithGoogleFailure = (res: any) => {
		console.log(res);

		// toast({
		// 	title: "something went wrong!",
		// 	description: "Pleas try again later",
		// 	duration: 1000,
		// 	status: "success",
		// 	isClosable: true,
		// });
	};

	return (
		<Flex flexDir='column' w={['100%', '25rem', '25rem']}>
			<Heading fontSize={['1.5rem', '2rem']} mb='1rem'>
				Login in to your account
			</Heading>
			<Formik
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
			</Formik>

			<GoogleLoginBtn
				clientId='363929442264-d4fn1djchejclqrkcv28uqd04jnq1gpd.apps.googleusercontent.com'
				render={btnProps => (
					<Button
						mt='1.5rem'
						disabled={btnProps.disabled}
						onClick={btnProps.onClick}
						boxShadow='md'
						bgColor='#000000'
						color='#fff'
						_hover={{ bgColor: '#000000' }}
						_active={{ bgColor: '#000000' }}
						leftIcon={<Icon as={FcGoogle} />}>
						Login with Google
					</Button>
				)}
				onSuccess={onLoginWithGoogleSuccess}
				onFailure={onLoginWithGoogleFailure}
				cookiePolicy='single_host_origin'
			/>
		</Flex>
	);
};

export default SignIn;
