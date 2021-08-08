import { FC, useEffect, useState } from 'react';
import useForm from './../../hooks/useForm';
import { useHistory } from 'react-router-dom';
import {
	FormControl,
	FormLabel,
	Input,
	Box,
	Icon,
	Image,
	Button,
	Stack,
	Textarea,
	Spinner,
	Select,
} from '@chakra-ui/react';
import { RiUploadCloudLine } from 'react-icons/ri';

import placeholder from '../../assets/images/avatar-placeholder.jpg';
import { createImgPreviewUrl, uploadImageToCloud } from '../../utils/upload';
import { Flex } from '@chakra-ui/react';
import axios from './../../API/API';
import useToastAPI from './../../hooks/useToastAPI';

interface ICreateItemValues {
	title: string;
	price: number;
	image: string;
	description: string;
	category: string;
}

const CreateItemForm: FC = () => {
	const { inputs, handleChange, clearForm } = useForm<ICreateItemValues>({
		title: '',
		price: 0,
		image: '',
		description: '',
		category: '',
	});

	const [preview, setPreview] = useState<any>(null);

	const [isCreating, setIsCreating] = useState<boolean>(false);

	const toast = useToastAPI();

	const history = useHistory();

	useEffect(() => {
		if (inputs.image) {
			const reader: any = new FileReader();

			reader.readAsDataURL(inputs.image);

			reader.onloadend = () => {
				setPreview(reader.result);
			};
		}

		return () => setPreview(null);
	}, [inputs.image]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsCreating(true);

		try {
			let imgUrl = '';

			if (inputs.image) {
				imgUrl = await uploadImageToCloud(inputs.image, 'czgq4bpq');
			}

			if (!imgUrl) throw new Error('something went wrong');

			const res = await axios('/store', {
				method: 'POST',
				data: {
					...inputs,
					image: imgUrl,
				},
			});

			const { category, slug } = res.data.data.item;

			history.push(`/s/${category}/${slug}`);

			clearForm();
		} catch (error) {
			toast({
				title: 'Something went wrong',
				description: 'Try again later',
				duration: 1000,
				isClosable: true,
				status: 'error',
			});
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Box
				w='100%'
				maxH='248px'
				overflow='hidden'
				pos='relative'
				d='grid'
				placeItems='center'>
				{!preview && (
					<FormLabel
						htmlFor='fileinput'
						pos='absolute'
						top='50%'
						left='50%'
						transform='translate(-50%,-50%)'
						// top='5px'
						// right='2px'
						zIndex='5'
						m='0'
						bgColor='#fff'
						w='45px'
						h='45px'
						d='grid'
						placeItems='center'
						borderRadius='100px'
						cursor='pointer'>
						<Icon
							as={RiUploadCloudLine}
							mt='.5px'
							fontSize='1.5rem'
							color='#000'
						/>

						<Input
							type='file'
							name='image'
							id='fileinput'
							d='none'
							onChange={handleChange}
						/>
					</FormLabel>
				)}

				<Image
					w='100%'
					h='100%'
					objectFit='cover'
					zIndex='3'
					src={preview || placeholder}
					alt='image-preview'
				/>
			</Box>
			<Stack mt='1rem' direction='column' spacing='1.5rem'>
				<FormControl>
					<FormLabel fontWeight='semibold'>Title</FormLabel>
					<Input
						type='text'
						name='title'
						value={inputs.title}
						onChange={handleChange}
						isRequired
					/>
				</FormControl>
				<FormControl>
					<FormLabel fontWeight='semibold'>Price</FormLabel>
					<Input
						type='number'
						name='price'
						value={inputs.price}
						onChange={handleChange}
						isRequired
					/>
				</FormControl>
				<FormControl>
					<FormLabel fontWeight='semibold'>Description</FormLabel>
					<Textarea
						type='text'
						name='description'
						value={inputs.description}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl>
					<FormLabel fontWeight='semibold'>Category</FormLabel>

					<Select
						variant='outline'
						placeholder='category'
						isRequired
						name='category'
						onChange={handleChange}>
						<option>men</option>
						<option>women</option>
						<option>shoes</option>
						<option>jacket</option>
						<option>beanie</option>
					</Select>
				</FormControl>
				<Flex w='100%'>
					<Button
						type='reset'
						bgColor='red.400'
						color='#fff'
						flexGrow={1}
						_active={{ bgColor: 'red.500' }}
						_hover={{ bgColor: 'red.500' }}
						onClick={clearForm}>
						Clear
					</Button>

					<Button
						type='submit'
						bgColor='black'
						color='#fff'
						flexGrow={1}
						ml='1.2rem'
						isLoading={isCreating}
						loadingText='creating...'
						spinner={<Spinner size='sm' />}
						_active={{ bgColor: 'black' }}
						_hover={{ bgColor: 'black' }}>
						create
					</Button>
				</Flex>
			</Stack>
		</form>
	);
};

export default CreateItemForm;
