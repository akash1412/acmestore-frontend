import { useState } from "react";
import {
	Flex,
	FormControl,
	Input,
	FormLabel,
	Button,
	Spinner,
} from "@chakra-ui/react";
import PasswordInput from "../PasswordInput/PasswordInput";

import axios from "../../API/API";

import { useAuthContext } from "../../context/AuthContext";

interface User {
	name: string;
	role: string;
	token: string;
}

const SignUp: React.FC<{}> = () => {
	const { handleAuthState } = useAuthContext();

	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "akash123",
		confirmPassword: "akash123",
	});

	const [showSpinner, setShowSpinner] = useState(false);

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;

		setInputs({ ...inputs, [name]: value });
	};

	const SignUpUser = async () => {
		const { name, email, password, confirmPassword: passwordConfirm } = inputs;
		setShowSpinner(true);

		try {
			const res = await axios({
				url: "/users/signup",
				method: "POST",
				data: {
					name,
					email,
					password,
					passwordConfirm,
				},
			});

			const {
				token,
				data: { user },
			} = res.data;

			handleAuthState(token);
		} catch (error) {
			console.log("Error ", error);
		} finally {
			setShowSpinner(false);
			setInputs({ name: "", email: "", password: "", confirmPassword: "" });
		}
	};

	return (
		<Flex w='100%' h='100%' flexDir='column' justifyContent='space-between'>
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input
					borderRadius='none'
					name='name'
					value={inputs.name}
					onChange={handleInputChange}
					placeholder='John Doe'
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input
					borderRadius='none'
					name='email'
					value={inputs.email}
					onChange={handleInputChange}
					placeholder='Email'
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Password</FormLabel>

				<PasswordInput
					name='password'
					value={inputs.password}
					onChange={handleInputChange}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Confirm Password</FormLabel>

				<PasswordInput
					placeholder='Confirm Password'
					name='confirmPassword'
					value={inputs.confirmPassword}
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
				border='1.6px solid black'
				_hover={{
					bgColor: "white",
					color: "black",
					border: "1.6px solid black",
				}}
				opacity={showSpinner ? ".7" : "1"}
				onClick={SignUpUser}>
				{showSpinner ? <Spinner size='sm' /> : "Sign Up"}
			</Button>
		</Flex>
	);
};

export default SignUp;
