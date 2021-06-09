import { FC, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Button from "../components/button/button";
import SignIn from "./../components/SignIn/SignIn";
import SignUp from "./../components/SignUp/SignUp";

const AuthPage: FC = () => {
	const [toggleSignup, setToggleSignup] = useState(false);

	const handleFormToggle = () => {
		setToggleSignup(prevState => !prevState);
	};

	return (
		<Box
			py='.5rem'
			px='1.5rem'
			w='100%'
			h='100%'
			pos='absolute'
			d='grid'
			placeItems='center'>
			<Box d='flex' flexDir='column' boxShadow='lg'>
				<Box p='2rem' textAlign='center'>
					{!toggleSignup ? (
						<Heading fontSize='2rem'>Login in to your account</Heading>
					) : (
						<Heading fontSize='2rem'>Create your account</Heading>
					)}
					<SignIn />
				</Box>
				<Box alignSelf='center' justifySelf='flex-end'>
					{!toggleSignup ? (
						<Box
							cursor='pointer'
							fontWeight='bold'
							fontSize='1.2rem'
							onClick={handleFormToggle}>
							SignUp
						</Box>
					) : (
						<Box
							cursor='pointer'
							fontWeight='bold'
							fontSize='1.2rem'
							onClick={handleFormToggle}>
							Login
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;
