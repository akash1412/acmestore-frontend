import { FC, useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import axios from '../../API/API';
import AxiosAPI from 'axios';
import { useAuthContext } from '../../context/AuthContext';

import ProfilePic from './parts/ProfilePic';

import ProfileDetails from './parts/profileDetails';
import { CartItem, IUpdateProfile } from '../../Interface/Interface';
import useToastAPI from './../../hooks/useToastAPI';
import { RouteComponentProps } from 'react-router-dom';

interface ICartItem extends CartItem {
	itemID: string;
	user: string;
}

interface Profile {
	name: string;
	email: string;
	photo?: string;
	createdAt: string;
	updatedAt: string;
	cartItems: ICartItem[] | [];
}

const ProfilePage: FC<RouteComponentProps> = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [profile, setProfile] = useState<null | Profile>(null);

	const { user, updateUserOverviewData } = useAuthContext();

	const toast = useToastAPI();

	useEffect(() => {
		setIsLoading(true);

		axios({
			url: '/users/me',
			method: 'GET',
			headers: {
				authorization: `Bearer ${user?.token}`,
			},
		}).then(res => {
			setProfile(res.data.data.user);

			setIsLoading(false);
		});
	}, [user?.token]);

	console.log(profile?.cartItems);

	if (isLoading) {
		return (
			<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
				<Spinner size='xl' />
			</Box>
		);
	}

	const UpdateMe = async (data: IUpdateProfile) => {
		try {
			await AxiosAPI({
				url: 'https://ecom-api-v1.herokuapp.com/api/v1/users/updateMe',
				method: 'PATCH',
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
				data: data,
			});
			updateUserOverviewData(data);

			toast({
				title: 'proifle updated succesfully',
				duration: 800,
				status: 'success',
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: 'something went wrong',
				description: 'please try again later',
				duration: 800,
				status: 'error',
				isClosable: true,
			});

			console.log(error.response);
		}
	};

	return (
		<Box
			px={['1rem', '2rem']}
			py='1rem'
			w='100%'
			h='100%'
			d='flex'
			justifyContent='center'>
			<Box
				w={['100%', '100%', '80%', '50%']}
				d='flex'
				flexDir='column'
				alignItems='center'>
				<ProfilePic name={profile?.name} photo={profile?.photo} />

				<ProfileDetails
					name={profile?.name}
					email={profile?.email}
					lastUpdated={profile?.updatedAt}
					UpdateMe={UpdateMe}
				/>

				{/* <CartItems cartItems={profile?.cartItems} /> */}
			</Box>
		</Box>
	);
};

export default ProfilePage;
