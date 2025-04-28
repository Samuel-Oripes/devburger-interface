// Importação da biblioteca Stripe para processamento de pagamentos
import { Elements } from '@stripe/react-stripe-js'; // Componente wrapper do Stripe que fornece contexto para elementos de pagamento
import { useLocation } from 'react-router-dom'; // Hook para acessar o objeto de localização atual e seus parâmetros de estado
import CheckoutForm from '../../components/Stripe/CheckoutForm'; // Componente de formulário de checkout personalizado
import stripePromise from '../../config/stripeConfig'; // Configuração e inicialização da API do Stripe

// Componente funcional principal para a página de checkout/pagamento
export function Checkout() {
	// Extrai o clientSecret dos parâmetros de estado da navegação
	// O clientSecret é necessário para processar pagamentos com o Stripe
	const {
		state: { clientSecret },
	} = useLocation();

	// Verifica se o clientSecret está disponível
	// Se não estiver disponível, exibe mensagem de erro
	if (!clientSecret) {
		return <div>Erro! Volte e tente novamente.</div>;
	}

	// Renderiza o formulário de checkout dentro do contexto Stripe
	return (
		// Elements é um provedor de contexto do Stripe que dá acesso às funcionalidades do Stripe
		// stripe: instância da API Stripe inicializada
		// options: configuração com o clientSecret para autorizar a transação
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			{/* Renderiza o formulário de pagamento personalizado */}
			<CheckoutForm />
		</Elements>
	);
}