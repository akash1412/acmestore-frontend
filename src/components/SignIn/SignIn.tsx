import React from "react";
import axios from "../../API/API";

import {
	Flex,
	FormControl,
	Input,
	FormLabel,
	Button,
	Spinner,
} from "@chakra-ui/react";

import { useAuthContext } from "../../context/AuthContext";
import PasswordInput from "../PasswordInput/PasswordInput";

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
	const { setUserDetail } = useAuthContext();

	const [inputs, setInputs] = React.useState<Input>({
		email: "",
		password: "",
	});

	const [formError, setFormError] = React.useState<null | string>(null);

	const [showSpinner, setShowSpinner] = React.useState<boolean>(false);

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

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

			setUserDetail({ name: user.name, role: user.role, token });
		} catch (error) {
			console.log(error.message);
		} finally {
			setShowSpinner(false);
		}
	};

	return (
		<Flex flexDir='column' justifyContent='space-evenly' w='25rem' minH='25rem'>
			<FormControl>
				<FormLabel>First name</FormLabel>
				<Input
					borderRadius='none'
					name='email'
					value={inputs.email}
					isRequired
					onChange={handleInputChange}
					placeholder='Email'
				/>
			</FormControl>

			<FormControl mt={2}>
				<FormLabel>Password</FormLabel>
				<PasswordInput
					name='password'
					value={inputs.password}
					onChange={handleInputChange}
				/>
			</FormControl>
			<Button
				alignSelf='center'
				w='10rem'
				mt='2rem'
				px='2rem'
				borderRadius='none'
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
				onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
					console.log("sda");
					// e.key === "13" && Login();
				}}>
				{showSpinner ? <Spinner size='sm' /> : "Sign In"}
			</Button>
		</Flex>
	);
};

export default SignIn;
