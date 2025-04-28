// Importa hooks do React para gerenciamento de estado e efeitos colaterais
import { useEffect, useState } from 'react';
// Importa o componente Carousel da biblioteca react-multi-carousel
import Carousel from 'react-multi-carousel';
// Importa os estilos CSS da biblioteca de carrossel
import 'react-multi-carousel/lib/styles.css';

// Importa a instância configurada da API
import { api } from '../../services/api';
// Importa função utilitária para formatação de preços
import { formatPrice } from '../../utils/formatPrice';
// Importa o componente CardProduct para exibir cada produto
import { CardProduct } from '../CardProduct';
// Importa os componentes estilizados específicos para este componente
import { Container, Title } from './styles';

// Define o componente OffersCarousel que exibe um carrossel de produtos em oferta
export function OffersCarousel() {
	// Estado para armazenar a lista de produtos em oferta
	const [offers, setOffers] = useState([]);

	// Efeito que executa uma vez quando o componente é montado
	useEffect(() => {
		// Função assíncrona para carregar os produtos da API
		async function loadProducts() {
			// Faz uma requisição GET para obter todos os produtos
			const { data } = await api.get('/products');

			// Filtra apenas os produtos que estão em oferta e adiciona o preço formatado
			const onlyOffers = data
				// Filtra os produtos onde a propriedade 'offer' é verdadeira
				.filter((product) => product.offer)
				// Mapeia cada produto para adicionar o preço formatado como moeda
				.map((product) => ({
					currencyValue: formatPrice(product.price), // Adiciona o preço formatado
					...product, // Mantém todas as outras propriedades originais do produto
				}));
			// Atualiza o estado com os produtos em oferta
			setOffers(onlyOffers);
		}

		// Chama a função para carregar os produtos
		loadProducts();
	}, []); // Array de dependências vazio significa que o efeito só executa uma vez

	// Configuração de responsividade para o carrossel
	// Define quantos itens serão exibidos em cada tamanho de tela
	const responsive = {
		// Para telas muito grandes (4000px a 3000px)
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 4, // Exibe 4 itens
		},
		// Para desktops (3000px a 1280px)
		desktop: {
			breakpoint: { max: 3000, min: 1280 },
			items: 4, // Exibe 4 itens
		},
		// Para tablets grandes (1280px a 690px)
		superLargeTablet: {
			breakpoint: { max: 1280, min: 690 },
			items: 3, // Exibe 3 itens
		},
		// Para tablets (690px a 520px)
		tablet: {
			breakpoint: { max: 690, min: 520 },
			items: 2, // Exibe 2 itens
		},
		// Para dispositivos móveis (menos de 520px)
		mobile: {
			breakpoint: { max: 520, min: 0 },
			items: 1, // Exibe 1 item
		},
	};

	// Retorna a estrutura do componente
	return (
		// Container principal do carrossel
		<Container>
			{/* Título da seção de ofertas */}
			<Title>OFERTAS DO DIA</Title>
			{/* Componente Carousel da biblioteca react-multi-carousel */}
			<Carousel
				responsive={responsive} // Configuração de responsividade
				infinite={true} // Permite rolagem infinita
				partialVisbile={false} // Não mostra itens parcialmente visíveis
				itemClass="carousel-item" // Classe CSS para os itens do carrossel
			>
				{/* Mapeia cada produto em oferta para um componente CardProduct */}
				{offers.map((product) => (
					<CardProduct key={product.id} product={product} />
				))}
			</Carousel>
		</Container>
	);
}