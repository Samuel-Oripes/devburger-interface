import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';

export default function CheckoutForm() {
	const { cartProducts, clearCart } = useCart();
	const navigate = useNavigate();

	const stripe = useStripe();
	const elements = useElements();

	const {
		state: { dpmCheckerLink },
	} = useLocation();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			console.error('Stripe ou Elements com falha, tente novamente!');
			return;
		}

		setIsLoading(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		});

		if (error) {
			setMessage(error.message);
			toast.error(error.message);
		} else if (paymentIntent && paymentIntent.status === 'succeeded') {
			try {
				const products = cartProducts.map((product) => {
					return {
						id: product.id,
						quantity: product.quantity,
						price: product.price,
					};
				});

				const { status } = await api.post(
					'/orders',
					{ products },
					{
						validateStatus: () => true,
					},
				);

				if (status === 200 || status === 201) {
					setTimeout(() => {
						navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
						clearCart();
					}, 1000);
					toast.success('Pedido realizado com sucesso!');
				} else if (status === 409) {
					toast.error('Falha ao realizar seu pedido!');
				} else {
					throw new Error();
				}
			} catch (error) {
				toast.error('Algo deu errado! Tente novamente mais tarde.');
			}
		} else {
			toast.error('Falha no sistema! Tente novamente');
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'accordion',
	};

	return (
		<div className="container">
			<form id="payment-form" onSubmit={handleSubmit}>
				<PaymentElement id="payment-element" options={paymentElementOptions} />
				<button
					type="submit"
					disabled={isLoading || !stripe || !elements}
					id="submit"
					className="button"
				>
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner" />
						) : (
							'PAGAR AGORA'
						)}
					</span>
				</button>
				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
			<div id="dpm-annotation">
				<p>
					Os métodos de pagamento são exibidos dinamicamente com base na
					localização do cliente, valor do pedido e moeda.&nbsp;
					<a
						href={dpmCheckerLink}
						target="_blank"
						rel="noopener noreferrer"
						id="dpm-integration-checker"
					>
						Visualizar formas de pagamento por transação
					</a>
				</p>
			</div>
		</div>
	);
}
