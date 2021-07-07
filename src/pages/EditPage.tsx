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

interface RouteProps {
	slug: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

const EditPage: FC<Props> = ({ match }) => {
	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState<null | Item>(null);

	const [inputs, setInputs] = useState({
		title: '',
		price: '',
		description: '',
		image: '',
	});

	useEffect(() => {
		setIsLoading(true);
		function GET_ITEM() {
			axios({
				url: `/store/${match.params.slug}`,
			}).then(res => {
				const { title, price, description, image } = res.data.data.item;

				setInputs({ ...inputs, title, price, description, image });

				setIsLoading(false);
			});
		}

		GET_ITEM();
	}, [match.params.slug]);

	return (
		<Box m='auto' w='100%' h='auto' py='1rem' px={['.8rem', '1rem']}>
			<MetaHead title='Edit' />
			<Box
				p='.5rem'
				w={['100%', '90%', '70%', '50%']}
				h='auto'
				m='0 auto'
				bgColor='#fff'
				boxShadow='lg'
				borderRadius='.2rem'>
				{isLoading ? <Text>loading...</Text> : null}
				<form>
					<FormControl isDisabled={isLoading}>
						<Box h='2rem' w='2rem'>
							<Image src={inputs.image} w='100%' h='100%' objectFit='cover' />
						</Box>
						<FormLabel>
							Image
							<Input type='file' mt='.4rem' />
						</FormLabel>
						<FormLabel>
							Name
							<Input value={inputs.title} placeholder='name' mt='.4rem' />
						</FormLabel>
						<FormLabel>
							Price
							<Input
								type='number'
								value={inputs.price}
								placeholder='price'
								mt='.4rem'
							/>
						</FormLabel>
						<FormLabel>
							description
							<Textarea mt='.4rem' value={inputs.description}></Textarea>
						</FormLabel>
					</FormControl>
					<Button>save</Button>
				</form>
			</Box>
		</Box>
	);
};

export default EditPage;
