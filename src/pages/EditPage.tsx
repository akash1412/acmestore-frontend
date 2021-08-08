import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
	Image,
	Input,
	FormControl,
	Box,
	Text,
	FormLabel,
	Textarea,
	Button,
	Spinner,
} from '@chakra-ui/react';
import MetaHead from '../components/MetaHead/MetaHead';
import axios from './../API/API';
import { Item } from './../Interface/Interface';
import useForm from './../hooks/useForm';
import { useAuthContext } from '../context/AuthContext';
import useToastAPI from '../hooks/useToastAPI';

interface RouteProps {
	slug: string;
}

interface IUpdateItemInput {
	title: string;
	price: string;
	description: string;
	image: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const EditPage: FC<Props> = ({ match }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	const toast = useToastAPI();

	const [data, setData] = useState<IUpdateItemInput>({} as IUpdateItemInput);

	const { inputs, handleChange, clearForm } = useForm<IUpdateItemInput>(data);

	const [formSubmitting, setformSubmitting] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		function GET_ITEM() {
			axios({
				url: `/store/${match.params.slug}`,
			}).then(res => {
				const { title, price, description, image } = res.data.data.item;

				setData({ ...inputs, title, price, description, image });

				setIsLoading(false);
			});
		}

		GET_ITEM();
	}, [match.params.slug]);

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setformSubmitting(true);
			const res = await axios(`/store/${match.params.slug}`, {
				method: 'PATCH',
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
				data: inputs,
			});

			toast({
				title: 'Item Updated Successfully',
				status: 'success',
				isClosable: true,
				duration: 1000,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setformSubmitting(false);
		}
	};

	return (
		<Box
			m='auto'
			position='absolute'
			w='100%'
			h='100%'
			py='1rem'
			px={['.8rem', '1rem']}
			d={['block', 'grid']}
			placeItems={['initial', 'center']}>
			<MetaHead title='Edit' />
			<Box
				py='.5rem'
				px='1rem'
				w={['100%', '90%', '30rem']}
				h='auto'
				m='0 auto'
				bgColor='#fff'
				boxShadow='lg'
				borderRadius='.6rem'>
				{isLoading ? <Text>loading...</Text> : null}
				<form onSubmit={handleFormSubmit}>
					<FormControl isDisabled={isLoading}>
						<Box h='3rem' w='3rem'>
							<Image src={inputs?.image} w='100%' h='100%' objectFit='cover' />
						</Box>

						<FormLabel>
							Name
							<Input
								value={inputs.title}
								placeholder='name'
								name='title'
								onChange={handleChange}
								mt='.4rem'
							/>
						</FormLabel>

						<FormLabel>
							Price
							<Input
								type='number'
								value={inputs?.price}
								name='price'
								placeholder='price'
								onChange={handleChange}
								mt='.4rem'
							/>
						</FormLabel>
						<FormLabel>
							description
							<Textarea
								mt='.4rem'
								value={inputs?.description}
								name='description'
								onChange={handleChange}></Textarea>
						</FormLabel>
					</FormControl>

					<Button
						type='submit'
						bgColor='black'
						color='#fff'
						flexGrow={1}
						width='100%'
						isLoading={formSubmitting}
						loadingText='updating product...'
						spinner={<Spinner size='sm' />}
						_active={{ bgColor: 'black' }}
						_hover={{ bgColor: 'black' }}>
						save
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default EditPage;
