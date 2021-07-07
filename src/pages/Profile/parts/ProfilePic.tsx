import { FC, useState } from 'react';
import { Box, Icon, Avatar, FormLabel, Input } from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import AxiosAPI from 'axios';
import useToastAPI from './../../../hooks/useToastAPI';
import { useAuthContext } from '../../../context/AuthContext';

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

		const reader = new FileReader();

		reader.readAsDataURL(file);

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'x7azl0iw');

		try {
			AxiosAPI('https://api.cloudinary.com/v1_1/dhqp2dd6b/image/upload', {
				method: 'POST',
				data: formData,
			}).then(result => {
				AxiosAPI({
					url: 'https://ecom-api-v1.herokuapp.com/api/v1/users/updateMe',
					method: 'PATCH',
					headers: {
						authorization: `Bearer ${
							JSON.parse(window.localStorage.getItem('user')!).token
						}`,
					},
					data: { photo: result.data.url },
				}).then(() => {
					toast({
						title: 'Profile Pic Updated Successfully',

						status: 'success',
						isClosable: true,
						duration: 800,
					});

					window.location.reload();

					updateUserOverviewData({ photo: result.data.url });
				});
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
		<Box d='flex' flexDir='column'>
			<Avatar size='2xl' name={name} src={previewImg} />
			<FormLabel
				alignSelf='center'
				htmlFor='file'
				cursor='pointer'
				mt='3rem'
				w='4rem'
				p='0.5rem 0'
				textAlign='center'
				bgColor='green.400'
				boxShadow='md'>
				<Icon as={FiEdit2} />
			</FormLabel>
			<Input id='file' type='file' d='none' onChange={onFileChange} />
		</Box>
	);
};

export default ProfilePic;
