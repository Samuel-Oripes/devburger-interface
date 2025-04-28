// Importa hooks do React para gerenciar estados e efeitos colaterais
import { useEffect, useState } from 'react';
// Importa hooks do react-router-dom para acessar a localização atual e navegação
import { useLocation, useNavigate } from 'react-router-dom';
// Importa o componente de card de produto que será usado para exibir cada produto
import { CardProduct } from '../../components/CardProduct';
// Importa a instância configurada do axios para fazer requisições à API
import { api } from '../../services/api';
// Importa a função de formatação de preço
import { formatPrice } from '../../utils/formatPrice';
// Importa os componentes estilizados específicos para a página do Menu
import {
	Banner,
	CategoryButton,
	CategoryMenu,
	Container,
	ProductsContainer,
} from './styles';

// Define o componente funcional Menu
export function Menu() {
	// Estado para armazenar as categorias carregadas da API
	const [categories, setCategories] = useState([]);
	// Estado para armazenar todos os produtos carregados da API
	const [products, setProducts] = useState([]);
	// Estado para armazenar os produtos filtrados por categoria
	const [filteredProducts, setFilteredProducts] = useState([]);

	// Hook para navegação programática
	const navigate = useNavigate();

	// Extrai o parâmetro de busca da URL atual
	const { search } = useLocation();

	// Instancia o objeto URLSearchParams para facilitar a extração de parâmetros da URL
	const queryParams = new URLSearchParams(search);

	// Estado para armazenar a categoria ativa, com inicialização baseada na URL
	const [activeCategory, setActiveCategory] = useState(() => {
		// Obtém o ID da categoria dos parâmetros da URL e converte para número
		const categoryId = +queryParams.get('categoria');

		// Se existir um ID de categoria na URL, usa ele
		if (categoryId) {
			return categoryId;
		}
		// Caso contrário, retorna 0 (todas as categorias)
		return 0;
	});

	// Efeito que é executado uma vez na montagem do componente para carregar dados iniciais
	useEffect(() => {
		// Função assíncrona para carregar categorias da API
		async function loadCategories() {
			// Requisição GET para obter todas as categorias
			const { data } = await api.get('/categories');

			// Adiciona a categoria "Todas" com ID 0 ao início do array de categorias
			const newCategories = [{ id: 0, name: 'Todas' }, ...data];

			// Atualiza o estado com as categorias carregadas
			setCategories(newCategories);
		}

		// Função assíncrona para carregar produtos da API
		async function loadProducts() {
			// Requisição GET para obter todos os produtos
			const { data } = await api.get('/products');

			// Mapeia os produtos adicionando o preço formatado
			const newProducts = data.map((product) => ({
				currencyValue: formatPrice(product.price),
				...product,
			}));
			// Atualiza o estado com os produtos carregados
			setProducts(newProducts);
		}

		// Chama as funções de carregamento
		loadCategories();
		loadProducts();
	}, []); // Array de dependências vazio significa que o efeito só é executado uma vez

	// Efeito para filtrar produtos quando a categoria ativa muda ou quando os produtos são carregados
	useEffect(() => {
		// Se a categoria ativa for 0 (Todas), exibe todos os produtos
		if (activeCategory === 0) {
			setFilteredProducts(products);
		} else {
			// Caso contrário, filtra os produtos pela categoria selecionada
			const newFilteredProducts = products.filter(
				(product) => product.category_id === activeCategory,
			);
			setFilteredProducts(newFilteredProducts);
		}
	}, [products, activeCategory]); // Executa novamente quando products ou activeCategory mudam

	// Renderiza a interface do componente
	return (
		<Container>
			{/* Banner com título e descrição do cardápio */}
			<Banner>
				<h1>
					O MELHOR <br /> HAMBÚRGUER <br /> ESTÁ AQUI!
					<span>Esse cardápio está irresistível!</span>
				</h1>
			</Banner>
			
			{/* Menu de categorias */}
			<CategoryMenu>
				{/* Mapeia o array de categorias para criar botões para cada uma */}
				{categories.map((category) => (
					<CategoryButton
						key={category.id} // Chave React para identificação única
						$isActiveCategory={category.id === activeCategory} // Prop para estilização do botão ativo
						onClick={() => {
							// Ao clicar, navega para a mesma rota com o parâmetro de categoria atualizado
							navigate(
								{
									pathname: '/cardapio',
									search: `?categoria=${category.id}`,
								},
								{
									replace: true, // Substitui a entrada atual no histórico de navegação
								},
							);
							// Atualiza o estado da categoria ativa
							setActiveCategory(category.id);
						}}
					>
						{category.name}
					</CategoryButton>
				))}
			</CategoryMenu>
			
			{/* Container para exibir os produtos filtrados */}
			<ProductsContainer>
				{/* Mapeia os produtos filtrados para criar um card para cada produto */}
				{filteredProducts.map((product) => (
					<CardProduct product={product} key={product.id} />
				))}
			</ProductsContainer>
		</Container>
	);
}