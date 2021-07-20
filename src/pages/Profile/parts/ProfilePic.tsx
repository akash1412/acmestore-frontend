import { FC, useState } from 'react';
import { Box, Icon, Avatar, FormLabel, Input, Image } from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import AxiosAPI from 'axios';
import useToastAPI from './../../../hooks/useToastAPI';
import { useAuthContext } from '../../../context/AuthContext';
import avatarPlaceholder from '../../../assets/images/avatar-placeholder.jpg';
import { uploadImageToCloud } from './../../../utils/upload';

interface Props {
	name?: string;
	photo?: string;
}

const ProfilePic: FC<Props> = ({ name, photo }) => {
	const [previewImg] = useState<string | undefined>(photo);

	const { updateUserOverviewData } = useAuthContext();

	const toast = useToastAPI();

	const onFileChange = (e: any) => {
		const file = e.target.files[0];

		if (!file) return;

		try {
			uploadImageToCloud(file, 'x7azl0iw')
				.then(imgUrl => {
					return AxiosAPI({
						url: 'https://ecom-api-v1.herokuapp.com/api/v1/users/updateMe',
						method: 'PATCH',
						headers: {
							authorization: `Bearer ${
								JSON.parse(window.localStorage.getItem('user')!).token
							}`,
						},
						data: { photo: imgUrl },
					});
				})
				.then(res => {
					const { photo } = res.data.data.updatedDetails;

					toast({
						title: 'Profile Pic Updated Successfully',
						status: 'success',
						isClosable: true,
						duration: 800,
					});

					window.location.reload();

					updateUserOverviewData({ photo });
				});
		} catch (error) {
			console.log(error.response);

			toast({
				title: 'something went wrong',
				description: 'please try again later.',
				status: 'error',
				isClosable: true,
				duration: 800,
			});
		}
	};

	return (
		<Box w='10rem' h='10rem' pos='relative'>
			<Avatar w='100%' h='100%' name={name} src={previewImg} />
			<FormLabel
				position='absolute'
				top='2px'
				right='5px'
				htmlFor='file'
				cursor='pointer'
				m='0'
				w='3rem'
				h='3rem'
				borderRadius='50%'
				bgColor='#ffba08'
				d='grid'
				placeItems='center'
				boxShadow='md'>
				<Icon as={FiEdit2} />
			</FormLabel>
			<Input id='file' type='file' d='none' onChange={onFileChange} />
		</Box>
	);
};

export default ProfilePic;
