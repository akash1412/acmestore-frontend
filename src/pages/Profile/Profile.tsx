import { FC, useState, useEffect } from 'react';
import { Box, Spinner, Divider, Link } from '@chakra-ui/react';
import axios from '../../API/API';
import AxiosAPI from 'axios';
import { useAuthContext } from '../../context/AuthContext';

import ProfilePic from './parts/ProfilePic';

import ProfileDetails from './parts/profileDetails';
import { CartItem, IUpdateProfile } from '../../Interface/Interface';
import useToastAPI from './../../hooks/useToastAPI';
import { RouteComponentProps } from 'react-router-dom';
import MetaHead from '../../components/MetaHead/MetaHead';

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

			console.error(error.response);
		}
	};

	return (
		<Box
			px={['1rem', '2rem']}
			py='2rem'
			w='100%'
			h='100%'
			d='flex'
			justifyContent='center'>
			<MetaHead title={`Profile | ${profile?.name}`} />
			<Box
				p='1.5rem'
				borderRadius='.6rem'
				w={['100%', '100%', '80%', '35rem']}
				bgColor='#fff'
				boxShadow='lg'
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
				<Divider orientation='horizontal' />
				{/* <Link href='/' w='100%' bgColor='black' color='#fff' p='.4rem'>
					update password
				</Link> */}
			</Box>
		</Box>
	);
};

export default ProfilePage;
