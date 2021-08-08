import { FC } from 'react';
import { Box, Button, Center, Image, Icon } from '@chakra-ui/react';
import { RouteComponentProps } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import NoFoundUI from '../../assets/svg/not-found.svg';

interface Props extends RouteComponentProps {}

const PageNotFound: FC<Props> = ({ history }) => {
	return (
		<Center flexDirection='column' px={['1rem', 0]}>
			<Box w={['100%', '80%', '65%', '45rem', '50%']} mt='2rem'>
				<Image w='100%' h='100%' src={NoFoundUI} />
			</Box>
			<Button
				as='a'
				href='/'
				alignSelf='center'
				mt='1rem'
				bgColor='#000'
				_hover={{
					bgColor: '#000',
				}}
				_active={{
					bgColor: '#000',
				}}
				color='#fff'
				rightIcon={<Icon as={FcHome} />}
				maxWidth={['120px', '200px']}
				w='100%'>
				Home
			</Button>
		</Center>
	);
};

export default PageNotFound;
