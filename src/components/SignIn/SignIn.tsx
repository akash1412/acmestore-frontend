import React from "react";
import axios from "../../API/API";

import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import {
	Flex,
	FormControl,
	Input,
	FormLabel,
	Spinner,
	Stack,
	Heading,
	Icon,
} from "@chakra-ui/react";
import GoogleLoginBtn from "react-google-login";
import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../PasswordInput/PasswordInput";
import useToastAPI from "./../../hooks/useToastAPI";
import Button from "../button/button";

interface User {
	name: string;
	role: string;
	token: string;
}

interface Input {
	email: string;
	password: string;
}

const SignIn: React.FC<{}> = () => {
	const { handleAuthState } = useAuthContext();

	const [inputs, setInputs] = React.useState<Input>({
		email: "",
		password: "",
	});

	const [formError, setFormError] = React.useState<null | string>(null);

	const [showSpinner, setShowSpinner] = React.useState<boolean>(false);

	const history = useHistory();

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const toast = useToastAPI();

	const Login = async (): Promise<void> => {
		setShowSpinner(true);

		try {
			const res = await axios({
				url: "/users/login",
				method: "POST",
				data: inputs,
			});
			const {
				token,
				data: { user },
			} = res.data;
			handleAuthState({ ...user, token });

			history.push("/");
		} catch (error) {
			const title: string = error.response.data.message;
			toast({
				title: title,
				duration: 500,
				isClosable: true,
				status: "error",
			});
		} finally {
			setInputs({ email: "", password: "" });
			setShowSpinner(false);
		}
	};

	const onLoginWithGoogleSuccess = (res: any) => {
		console.log(res);

		toast({
			title: "logged in successfully",
			duration: 1000,
			status: "success",
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
		<Flex flexDir='column' w={["100%", "25rem", "25rem"]}>
			<Heading fontSize={["1.5rem", "2rem"]} mb='1rem'>
				Login in to your account
			</Heading>
			<form style={{ marginTop: "1.4rem" }}>
				<Stack direction='column' spacing='2rem' fontSize={["1rem", "1.2rem"]}>
					<FormControl>
						<FormLabel fontWeight='semibold'>Email address</FormLabel>
						<Input
							borderRadius='none'
							name='email'
							value={inputs.email}
							isRequired
							onChange={handleInputChange}
							placeholder='Email'
						/>
					</FormControl>

					<FormControl>
						<FormLabel fontWeight='semibold'>Password</FormLabel>
						<PasswordInput
							name='password'
							value={inputs.password}
							onChange={handleInputChange}
						/>
					</FormControl>

					<Button
						px='2rem'
						bgColor='black'
						color='white'
						border='1.2px solid black'
						_hover={{
							bgColor: "white",
							color: "black",
							border: "1.2px solid black",
						}}
						opacity={showSpinner ? ".7" : "1"}
						onClick={Login}
						onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {}}>
						{showSpinner ? <Spinner size='sm' /> : "Sign In"}
					</Button>
				</Stack>
			</form>

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
						_hover={{ bgColor: "#000000" }}
						_active={{ bgColor: "#000000" }}
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
