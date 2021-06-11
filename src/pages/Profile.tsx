import { FC, useState, useEffect } from "react";
import { Box, Avatar, Spinner, Text, Input, FormLabel } from "@chakra-ui/react";
import axios from "./../API/API";
import AxiosAPI from "axios";
import { useAuthContext } from "../context/AuthContext";
import Button from "./../components/button/button";

interface UserDetail {
	name: string;
	email: string;
	photo?: string;
	createdAt: string;
	updatedAt: string;
}

const ProfilePage: FC<{}> = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [userDetail, setUserDetail] = useState<null | UserDetail>(null);

	const [previewImage, setPreviewImage] = useState<null>(null);

	const { token } = useAuthContext();

	useEffect(() => {
		setIsLoading(true);

		axios({
			url: "/users/me",
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		}).then(res => {
			setUserDetail(res.data.data.user);

			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
				<Spinner size='xl' />
			</Box>
		);
	}

	const onFileChange = (e: any) => {
		const file = e.target.files[0];

		if (!file) return;

		const reader = new FileReader();

		reader.readAsDataURL(file);

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "x7azl0iw");

		AxiosAPI("https://api.cloudinary.com/v1_1/dhqp2dd6b/image/upload", {
			method: "POST",
			data: formData,
		}).then(result => {
			setPreviewImage(result.data.url);

			AxiosAPI({
				url: "https://ecom-api-v1.herokuapp.com/api/v1/users/updateMe",
				method: "PATCH",
				headers: {
					authorization: `Bearer ${token}`,
				},
				data: { photo: result.data.url },
			}).then(() => {
				console.log("image upload succesfully");
			});
		});
	};

	const saveEdit = () => {};

	return (
		<Box
			px='2rem'
			py='1rem'
			pos='absolute'
			w='100%'
			h='100%'
			d='flex'
			justifyContent='center'>
			<Box w='55%' d='flex' justifyContent='center'>
				<Box flexGrow={1} d='flex'>
					<Box mr='1.2rem'>
						<Avatar
							size='2xl'
							name={userDetail?.name}
							src={userDetail?.photo}
						/>
						<FormLabel
							htmlFor='file'
							cursor='pointer'
							mt='3rem'
							px='1.5rem'
							py='.8rem'
							bgColor='green.400'>
							change
						</FormLabel>
						<Input id='file' type='file' d='none' onChange={onFileChange} />
					</Box>

					<form onSubmit={saveEdit}>
						<Input
							placeholder='name'
							defaultValue={userDetail?.name}
							mb='2rem'
						/>

						<Input placeholder='email' defaultValue={userDetail?.email} />
					</form>
				</Box>

				{/* <Box ml='auto' d='flex' flexDir='column' justifyContent='space-between'>
					<Text>last updated:{userDetail?.createdAt}</Text>
					<Button bgColor='green.500'>Edit</Button>
				</Box> */}
			</Box>
		</Box>
	);
};

export default ProfilePage;
