import { FC, useState } from "react";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { IUpdateProfile } from "../../../Interface/Interface";
import Button from "../../../components/button/button";

interface Props {
	name?: string;
	email?: string;
	lastUpdated?: string;
	UpdateMe: (data: IUpdateProfile) => Promise<void>;
}

const ProfileDetails: FC<Props> = ({ name, email, lastUpdated, UpdateMe }) => {
	const [detailInputs, setDetailsInputs] = useState<{
		name: string | undefined;
		email: string | undefined;
	}>({
		name,
		email,
	});

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;

		setDetailsInputs({ ...detailInputs, [name]: value });
	};

	const saveEdit = (e: any) => {
		e.preventDefault();
		UpdateMe(detailInputs);
	};

	return (
		<Box w='90%' mt='2rem' py='1rem'>
			<Text fontWeight='bold' mb='1rem'>
				last updated: {new Date(lastUpdated || "").toDateString()}
			</Text>
			<form onSubmit={saveEdit}>
				<Stack flexDir='column' spacing='1rem'>
					<Input
						type='text'
						name='name'
						border='2px solid #000'
						value={detailInputs.name}
						placeholder='name'
						onChange={handleInputChange}
						required
					/>
					<Input
						type='text'
						name='email'
						border='2px solid #000'
						value={detailInputs.email}
						onChange={handleInputChange}
						placeholder='email'
						required
					/>

					<Button
						type='submit'
						w='8rem'
						color='#fff'
						bgColor='green.300'
						boxShadow='md'
						fontWeight='bold'
						_hover={{ bgColor: "green.300", color: "#fff" }}
						_active={{ bgColor: "green.300", color: "#fff" }}
						onClick={saveEdit}>
						save
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default ProfileDetails;
