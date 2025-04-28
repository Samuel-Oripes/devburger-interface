// Importa hooks do React para gerenciamento de estado e efeitos colaterais
import { useEffect, useState } from 'react';
// Importa o componente Carousel da biblioteca react-multi-carousel
import Carousel from 'react-multi-carousel';
// Importa os estilos CSS da biblioteca de carrossel
import 'react-multi-carousel/lib/styles.css';

// Importa o hook de navegação do React Router
import { useNavigate } from 'react-router-dom';
// Importa a instância configurada da API
import { api } from '../../services/api';
// Importa os componentes estilizados específicos para este componente
import { CategoryButton, Container, ContainerItems, Title } from './styles';

// Define o componente CategoriesCarousel que exibe um carrossel de categorias
export function CategoriesCarousel() {
	// Estado para armazenar a lista de categorias carregadas da API
	const [categories, setCategories] = useState([]);
	// Hook para navegação programática entre rotas
	const navigate = useNavigate();

	// Efeito que executa uma vez quando o componente é montado
	useEffect(() => {
		// Função assíncrona para carregar as categorias da API
		async function loadCategories() {
			// Faz uma requisição GET para obter as categorias
			const { data } = await api.get('/categories');

			// Atualiza o estado com as categorias recebidas
			setCategories(data);
			// Exibe as categorias no console para fins de depuração
			console.log(data);
		}

		// Chama a função para carregar as categorias
		loadCategories();
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
		// Para tablets grandes (1280px a 900px)
		superLargeTablet: {
			breakpoint: { max: 1280, min: 900 },
			items: 3, // Exibe 3 itens
		},
		// Para tablets (900px a 600px)
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: 2, // Exibe 2 itens
		},
		// Para dispositivos móveis (menos de 600px)
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: 1, // Exibe 1 item
		},
	};

	// Retorna a estrutura do componente
	return (
		// Container principal do carrossel
		<Container>
			{/* Título da seção de categorias */}
			<Title>CATEGORIAS</Title>
			{/* Componente Carousel da biblioteca react-multi-carousel */}
			<Carousel
				responsive={responsive} // Configuração de responsividade
				infinite={true} // Permite rolagem infinita
				partialVisbile={false} // Não mostra itens parcialmente visíveis
				itemClass="carousel-item" // Classe CSS para os itens do carrossel
			>
				{/* Mapeia cada categoria para um item no carrossel */}
				{categories.map((category) => (
					// Container para cada item, usando a URL da imagem como background
					<ContainerItems key={category.id} imageUrl={category.url}>
						{/* Botão/Link que navega para a página de cardápio com filtro de categoria */}
						<CategoryButton
							to={{
								pathname: '/cardapio', // Rota de destino
								search: `?categoria=${category.id}`, // Parâmetro de consulta para filtrar por categoria
							}}
						>
							{/* Nome da categoria */}
							{category.name}
						</CategoryButton>
					</ContainerItems>
				))}
			</Carousel>
		</Container>
	);
}