import Paper from '@mui/material/Paper'; // Importa o componente Paper do Material UI para criar superfícies elevadas
import Table from '@mui/material/Table'; // Importa o componente Table do Material UI para criar tabelas
import TableBody from '@mui/material/TableBody'; // Importa o componente para o corpo da tabela
import TableCell from '@mui/material/TableCell'; // Importa o componente para células da tabela
import TableContainer from '@mui/material/TableContainer'; // Importa o container da tabela
import TableHead from '@mui/material/TableHead'; // Importa o componente para o cabeçalho da tabela
import TableRow from '@mui/material/TableRow'; // Importa o componente para linhas da tabela

import { CheckCircle, Pencil, XCircle } from '@phosphor-icons/react'; // Importa ícones da biblioteca Phosphor
import { useEffect, useState } from 'react'; // Importa hooks do React para gerenciar estado e efeitos
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação programática
import { api } from '../../../services/api'; // Importa a instância configurada da API
import { formatPrice } from '../../../utils/formatPrice'; // Importa função para formatar preços
import { Container, EditButton, ProductImage } from './styles'; // Importa componentes estilizados

/**
 * Componente Products
 * Responsável por exibir a lista de produtos no painel administrativo
 */
export function Products() {
	// Estado para armazenar a lista de produtos carregada da API
	const [products, setProducts] = useState([]);
	// Hook para navegação programática
	const navigate = useNavigate();

	/**
	 * Efeito para carregar a lista de produtos da API quando o componente é montado
	 */
	useEffect(() => {
		async function loadProducts() {
			// Faz requisição GET para buscar todos os produtos
			const { data } = await api.get('/products');

			// Atualiza o estado com os produtos recebidos
			setProducts(data);

			// Log para depuração dos dados recebidos
			console.log(data);
		}

		loadProducts();
	}, []); // Array vazio: executa apenas uma vez na montagem

	/**
	 * Função que determina qual ícone mostrar com base no status de oferta do produto
	 */
	function isOffer(offer) {
		if (offer) {
			return <CheckCircle color="#61a120" size="28" />; // Ícone verde de check para produtos em oferta
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			return <XCircle color="#ff3205" size="28" />; // Ícone vermelho de X para produtos que não estão em oferta
		}
	}

	/**
	 * Função para navegar para a página de edição do produto
	 */
	function editProduct(product) {
		// Navega para a rota de edição, passando o produto como state
		navigate('/admin/editar-produto', { state: { product } });
	}

	return (
		<Container>
			{/* Container da tabela com elevação (sombra) */}
			<TableContainer component={Paper}>
				{/* Tabela de produtos com largura mínima */}
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					{/* Cabeçalho da tabela */}
					<TableHead>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell align="center">Preço</TableCell>
							<TableCell align="center">Produto em Oferta</TableCell>
							<TableCell align="center">Imagem do Produto</TableCell>
							<TableCell align="center">Editar Produto</TableCell>
						</TableRow>
					</TableHead>
					{/* Corpo da tabela */}
					<TableBody>
						{/* Mapeia os produtos para criar uma linha para cada um */}
						{products.map((product) => (
							<TableRow
								key={product.id} // Chave única para cada linha
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }} // Remove borda da última linha
							>
								{/* Célula com o nome do produto */}
								<TableCell component="th" scope="row">
									{product.name}
								</TableCell>
								{/* Célula com o preço formatado */}
								<TableCell align="center">
									{formatPrice(product.price)}
								</TableCell>
								{/* Célula com ícone indicando se é oferta */}
								<TableCell align="center">{isOffer(product.offer)}</TableCell>
								{/* Célula com a imagem do produto */}
								<TableCell align="center">
									<ProductImage src={product.url} />
								</TableCell>
								{/* Célula com o botão de editar */}
								<TableCell align="center">
									<EditButton onClick={() => editProduct(product)}>
										<Pencil /> {/* Ícone de lápis */}
									</EditButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}