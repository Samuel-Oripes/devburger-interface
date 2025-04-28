// Importa o hook useState do React para gerenciamento de estado local
import { useState } from 'react';
// Importa hooks do React Router para acessar o estado passado na navegação e para navegação programática
import { useLocation, useNavigate } from 'react-router-dom';
// Importa os estilos CSS para o formulário de checkout
import '../styles.css';

// Importa componentes e hooks do Stripe para processamento de pagamentos
import {
	PaymentElement,  // Componente que renderiza a interface de pagamento do Stripe
	useElements,     // Hook para acessar os elementos do Stripe
	useStripe,       // Hook para acessar a instância do Stripe
} from '@stripe/react-stripe-js';
// Importa a biblioteca de notificações toast
import { toast } from 'react-toastify';
// Importa o hook personalizado para acesso ao contexto do carrinho
import { useCart } from '../../../hooks/CartContext';
// Importa a instância configurada da API
import { api } from '../../../services/api';

// Define e exporta o componente CheckoutForm para processar pagamentos
export default function CheckoutForm() {
	// Obtém os produtos do carrinho e a função para limpar o carrinho do contexto
	const { cartProducts, clearCart } = useCart();
	// Hook para navegação programática entre rotas
	const navigate = useNavigate();

	// Inicializa a instância do Stripe
	const stripe = useStripe();
	// Inicializa os elementos do Stripe (componentes de UI para pagamento)
	const elements = useElements();

	// Obtém o link do verificador DPM (Dynamic Payment Methods) do estado da localização
	const {
		state: { dpmCheckerLink },
	} = useLocation();

	// Estado para armazenar mensagens de erro/sucesso
	const [message, setMessage] = useState(null);
	// Estado para controlar o estado de carregamento durante o processamento do pagamento
	const [isLoading, setIsLoading] = useState(false);

	// Função para lidar com o envio do formulário de pagamento
	const handleSubmit = async (e) => {
		// Previne o comportamento padrão do formulário
		e.preventDefault();

		// Verifica se o Stripe e os elementos foram carregados corretamente
		if (!stripe || !elements) {
			console.error('Stripe ou Elements com falha, tente novamente!');
			return;
		}

		// Ativa o estado de carregamento
		setIsLoading(true);

		// Confirma o pagamento usando o Stripe
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,              // Elementos do Stripe que contêm os dados de pagamento
			redirect: 'if_required', // Redireciona apenas se necessário (ex: 3D Secure)
		});

		// Tratamento para caso de erro no pagamento
		if (error) {
			// Define a mensagem de erro
			setMessage(error.message);
			// Exibe uma notificação de erro
			toast.error(error.message);
		} 
		// Tratamento para caso de sucesso no pagamento
		else if (paymentIntent && paymentIntent.status === 'succeeded') {
			try {
				// Prepara os dados dos produtos para enviar ao servidor
				const products = cartProducts.map((product) => {
					return {
						id: product.id,
						quantity: product.quantity,
						price: product.price,
					};
				});

				// Envia os dados do pedido para a API
				const { status } = await api.post(
					'/orders',
					{ products },
					{
						validateStatus: () => true, // Aceita qualquer status HTTP como válido para tratar manualmente
					},
				);

				// Verifica o status da resposta da API
				if (status === 200 || status === 201) {
					// Em caso de sucesso, redireciona para a página de conclusão após 1 segundo
					setTimeout(() => {
						navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
						clearCart(); // Limpa o carrinho após o pedido bem-sucedido
					}, 1000);
					// Exibe uma notificação de sucesso
					toast.success('Pedido realizado com sucesso!');
				} 
				// Tratamento para conflito no pedido
				else if (status === 409) {
					toast.error('Falha ao realizar seu pedido!');
				} 
				// Tratamento para outros erros
				else {
					throw new Error();
				}
			} catch (error) {
				// Exibe uma notificação para erros gerais
				toast.error('Algo deu errado! Tente novamente mais tarde.');
			}
		} 
		// Tratamento para outros estados do paymentIntent
		else {
			toast.error('Falha no sistema! Tente novamente');
		}

		// Desativa o estado de carregamento
		setIsLoading(false);
	};

	// Configurações para o componente PaymentElement
	const paymentElementOptions = {
		layout: 'accordion', // Define o layout como acordeão para economizar espaço
	};

	// Retorna a estrutura do componente
	return (
		// Container principal do formulário
		<div className="container">
			{/* Formulário de pagamento que chama handleSubmit quando enviado */}
			<form id="payment-form" onSubmit={handleSubmit}>
				{/* Componente do Stripe que renderiza os campos de pagamento */}
				<PaymentElement id="payment-element" options={paymentElementOptions} />
				{/* Botão para submeter o pagamento */}
				<button
					type="submit"
					disabled={isLoading || !stripe || !elements} // Desativa durante carregamento ou se Stripe não estiver pronto
					id="submit"
					className="button"
				>
					<span id="button-text">
						{/* Mostra um spinner durante o carregamento ou o texto "PAGAR AGORA" */}
						{isLoading ? (
							<div className="spinner" id="spinner" />
						) : (
							'PAGAR AGORA'
						)}
					</span>
				</button>
				{/* Área para exibir mensagens de erro/sucesso */}
				{message && <div id="payment-message">{message}</div>}
			</form>
			{/* Seção de anotação sobre métodos de pagamento dinâmicos */}
			<div id="dpm-annotation">
				<p>
					Os métodos de pagamento são exibidos dinamicamente com base na
					localização do cliente, valor do pedido e moeda.&nbsp;
					{/* Link para o verificador de métodos de pagamento dinâmicos */}
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