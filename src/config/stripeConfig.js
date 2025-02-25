import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	'pk_test_51QudrDE4BI9ACGjORTPW9xC7YXhoLL4z1QEICAz01X5HpQU9RwL3xRjtYIHvzAJ9rqmaTnCsOTst9zP9ncHJvJH60095quDpEr',
);

export default stripePromise;
