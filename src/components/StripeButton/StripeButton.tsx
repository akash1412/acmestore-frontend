import StripeCheckout, { Token } from 'react-stripe-checkout';
import { FC } from 'react';
import { Button } from '@chakra-ui/react';

export const StripeCheckoutButton: FC<{ price: number }> = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_TC4vt5NaGy9te0n5YqNRQ9RR00nSjEGDbf';

	const onToken = (token: Token) => {
		console.log(token);
		alert('Payment succesfull');
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='ACME'
			billingAddress
			shippingAddress
			description={`Your total is ${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}>
			<Button
				w='100%'
				mt='2rem'
				bgColor='#000'
				_hover={{ bgColor: '#000' }}
				color='#fff'>
				pay now 💵
			</Button>
		</StripeCheckout>
	);
};

export default StripeCheckoutButton;
