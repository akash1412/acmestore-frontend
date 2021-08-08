import { FC, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { RouteComponentProps } from 'react-router-dom';
import Success from './parts/Success';
import Fail from './parts/Fail';
import { useDrawerContext } from './../../context/DrawerContext';

const Checkout: FC<RouteComponentProps<{ status?: string }>> = ({ match }) => {
	const { clearAllCartItem } = useDrawerContext();

	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());

	const istriggeredOnlyOnce = useRef(false);

	useEffect(() => {
		if (!istriggeredOnlyOnce.current) {
			if (params.type === 'cart') {
				console.log('clearing...');
				clearAllCartItem();
			}

			istriggeredOnlyOnce.current = true;
		} else {
			return;
		}
	}, [params]);

	return (
		<Box pos='absolute' w='100%' h='100%' d='grid' placeItems='center'>
			{match.params.status === 'success' && <Success />}
			{match.params.status === 'fail' && <Fail />}
			checkout page
		</Box>
	);
};

export default Checkout;
