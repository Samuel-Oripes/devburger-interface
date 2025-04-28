// Importa hooks do React para gerenciamento de estado e efeitos
import { useEffect, useState } from 'react';
// Importa hook de navegação do React Router
import { useNavigate } from 'react-router-dom';
// Importa biblioteca de notificações toast
import { toast } from 'react-toastify';

// Importa o hook personalizado que fornece acesso ao contexto do carrinho
import { useCart } from '../../hooks/CartContext';
// Importa a instância configurada da API
import { api } from '../../services/api';
// Importa função utilitária para formatação de preços
import { formatPrice } from '../../utils/formatPrice';

// Importa o componente Button para ações
import { Button } from '../Button';
// Importa o componente de estilo Container
import { Container } from './styles';

// Define o componente CartResume que mostra o resumo do pedido e valores
export function CartResume() {
	// Estado para armazenar o preço total dos itens (sem taxa de entrega)
	const [finalPrice, setFinalPrice] = useState(0);
	// Estado para armazenar a taxa de entrega fixa (500 centavos = R$ 5,00)
	const [deliveryTax] = useState(500);

	// Hook para navegação programática entre rotas
	const navigate = useNavigate();

	// Obtém os produtos do carrinho e a função para limpar o carrinho do contexto
	const { cartProducts, clearCart } = useCart();

	// Efeito que recalcula o preço total sempre que os produtos do carrinho mudam
	useEffect(() => {
		// Calcula a soma de todos os itens (preço * quantidade)
		const sumAllItems = cartProducts.reduce((acc, current) => {
			return current.price * current.quantity + acc;
		}, 0);

		// Atualiza o estado com o valor total calculado
		setFinalPrice(sumAllItems);
	}, [cartProducts]);

	// Função assíncrona para enviar o pedido ao servidor
	const submitOrder = async () => {
		// Mapeia os produtos do carrinho para o formato esperado pela API
		const products = cartProducts.map((product) => {
			return {
				id: product.id,
				quantity: product.quantity,
				price: product.price,
			};
		});

		try {
			// Faz uma requisição POST para criar a intenção de pagamento
			const { data } = await api.post('/create-payment-intent', { products });

			// Navega para a página de checkout passando os dados da API como estado
			navigate('/checkout', {
				state: data,
			});
		} catch (err) {
			// Exibe uma notificação de erro caso a requisição falhe
			toast.error('Erro, tente novamente!', {
				position: 'top-right',        // Posição da notificação
				autoClose: 5000,              // Tempo até fechar automaticamente (ms)
				hideProgressBar: false,       // Mostra barra de progresso
				closeOnClick: false,          // Não fecha ao clicar
				pauseOnHover: true,           // Pausa ao passar o mouse
				draggable: true,              // Permite arrastar
				progress: undefined,          // Progresso indefinido
				theme: 'light',               // Tema claro
			});
		}
	};

	// Retorna a estrutura do componente
	return (
		<div>
			{/* Container principal do resumo */}
			<Container>
				{/* Seção superior com detalhes dos itens e taxa */}
				<div className="container-top">
					<h2 className="title">Resumo do pedido</h2>
					<p className="items">Itens</p>
					{/* Exibe o preço total dos itens formatado */}
					<p className="items-price">{formatPrice(finalPrice)}</p>
					<p className="delivery-tax">Taxa de entrega</p>
					{/* Exibe a taxa de entrega formatada */}
					<p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
				</div>
				{/* Seção inferior com o valor total (itens + entrega) */}
				<div className="container-bottom">
					<p>Total</p>
					{/* Exibe o valor total formatado (soma dos itens + taxa de entrega) */}
					<p>{formatPrice(finalPrice + deliveryTax)}</p>
				</div>
			</Container>
			{/* Botão para finalizar o pedido, que chama a função submitOrder quando clicado */}
			<Button onClick={submitOrder}>Finalizar pedido</Button>
		</div>
	);
}