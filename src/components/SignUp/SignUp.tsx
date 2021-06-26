import React from "react";
import {
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	FormLabel,
	Spinner,
	Heading,
	Stack,
} from "@chakra-ui/react";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../button/button";
import { useHistory } from "react-router";
import axios from "../../API/API";
import { Form, Formik, FormikProps, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import useToastAPI from "./../../hooks/useToastAPI";

interface valueProps {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required()
		.min(5, "should be a min of 5 characters")
		.max(20, "should not exceed 20 characters limit"),
	email: Yup.string().email("Invalid email").required(),
	password: Yup.string()
		.required("please enter your password")
		.min(5, "should be a min of 5 characters")
		.max(20, "should not exceed 20 characters limit"),
	confirmPassword: Yup.string()
		.required("please enter your password")
		.min(5, "should be a min of 5 characters")
		.max(20, "should not exceed 20 characters limit"),
});

const SignUp: React.FC<{}> = () => {
	const { handleAuthState } = useAuthContext();

	const history = useHistory();
	const toast = useToastAPI();

	const SignUpUser = async (
		values: valueProps,
		actions: FormikHelpers<valueProps>
	) => {
		actions.setSubmitting(true);

		try {
			const res = await axios({
				url: "/users/signup",
				method: "POST",
				data: {
					name: values.name,
					email: values.email,
					password: values.password,
					passwordConfirm: values.confirmPassword,
				},
			});

			const {
				token,
				data: { user },
			} = res.data;

			handleAuthState({
				name: user.name,
				token: token,
				role: user.role,
				photo: user.photo || null,
			});
			actions.resetForm();

			history.push("/");
		} catch (error) {
			console.log("Error ", error.response);

			//@ts-ignore
			toast({
				title: error.response.data.message,
				status: "error",
				duration: 1000,
				isClosable: true,
			});
		} finally {
			actions.setSubmitting(false);
		}
	};

	return (
		<Flex flexDir='column' w={["100%", "25rem"]}>
			<Heading fontSize={["1.5rem", "2rem"]} mb='1rem'>
				Create your account
			</Heading>
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "akash123",
					confirmPassword: "akash123",
				}}
				onSubmit={(values, actions) => SignUpUser(values, actions)}
				validationSchema={validationSchema}>
				{({
					isSubmitting,

					errors,
				}: FormikProps<valueProps>) => (
					<Form>
						<Stack>
							<Field name='name'>
								{({ field, form }: any) => (
									<FormControl
										isInvalid={form.errors.name && form.touched.name}>
										<FormLabel fontWeight='semibold'>Name</FormLabel>
										<Input
											{...field}
											borderRadius='none'
											placeholder='John Doe'
										/>
										<FormErrorMessage>{errors.name}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name='email'>
								{({ field, form }: any) => (
									<FormControl
										isInvalid={form.errors.email && form.touched.email}>
										<FormLabel fontWeight='semibold'>Email address</FormLabel>
										<Input
											{...field}
											borderRadius='none'
											placeholder='John Doe'
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
										<PasswordInput {...field} placeholder='Password' />
										<FormErrorMessage>{errors.password}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name='confirmPassword'>
								{({ field, form }: any) => (
									<FormControl
										isInvalid={
											form.errors.confirmPassword &&
											form.touched.confirmPassword
										}>
										<FormLabel fontWeight='semibold'>
											Confirm Password
										</FormLabel>
										<PasswordInput {...field} placeholder='Confirm Password' />
										<FormErrorMessage>
											{errors.confirmPassword}
										</FormErrorMessage>
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
									bgColor: "white",
									color: "black",
									border: "1.2px solid black",
								}}
								opacity={isSubmitting ? ".7" : "1"}
								isLoading={isSubmitting}
								spinner={<Spinner size='sm' />}
								loadingText='creating account...'>
								Sign Up
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default SignUp;
