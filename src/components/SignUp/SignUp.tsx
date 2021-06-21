import { useState } from "react";
import {
	Flex,
	FormControl,
	Input,
	FormLabel,
	Spinner,
	Heading,
	Stack,
} from "@chakra-ui/react";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../button/button";

import axios from "../../API/API";

import { useAuthContext } from "../../context/AuthContext";

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

			handleAuthState({
				name: user.name,
				token: token,
				role: user.role,
				photo: user.photo || null,
			});
		} catch (error) {
			console.log("Error ", error);
		} finally {
			setShowSpinner(false);
			setInputs({ name: "", email: "", password: "", confirmPassword: "" });
		}
	};

	return (
		<Flex flexDir='column' w={["100%", "25rem"]}>
			<Heading fontSize={["1.5rem", "2rem"]} mb='1rem'>
				Create your account
			</Heading>
			<form style={{ marginTop: "1.4rem" }}>
				<Stack direction='column' spacing='2rem' fontSize={["1rem", "1.2rem"]}>
					<FormControl>
						<FormLabel fontSize='inherit' fontWeight='semibold'>
							Name
						</FormLabel>
						<Input
							borderRadius='none'
							name='name'
							value={inputs.name}
							required
							onChange={handleInputChange}
							placeholder='John Doe'
						/>
					</FormControl>
					<FormControl>
						<FormLabel fontSize='inherit' fontWeight='semibold'>
							Email
						</FormLabel>
						<Input
							borderRadius='none'
							name='email'
							value={inputs.email}
							required
							onChange={handleInputChange}
							placeholder='Email'
						/>
					</FormControl>
					<FormControl>
						<FormLabel fontSize='inherit' fontWeight='semibold'>
							Password
						</FormLabel>

						<PasswordInput
							name='password'
							value={inputs.password}
							onChange={handleInputChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel fontSize='inherit' fontWeight='semibold'>
							Confirm Password
						</FormLabel>

						<PasswordInput
							placeholder='Confirm Password'
							name='confirmPassword'
							value={inputs.confirmPassword}
							onChange={handleInputChange}
						/>
					</FormControl>
					<Button
						px='2rem'
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
				</Stack>
			</form>
		</Flex>
	);
};

export default SignUp;
