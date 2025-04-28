// Importa a imagem do ícone de lixeira
import TrashIcon from '../../assets/lixeira.png';
// Importa o hook useCart do contexto do carrinho para gerenciar os produtos
import { useCart } from '../../hooks/CartContext';
// Importa uma função utilitária para formatação de preços
import { formatPrice } from '../../utils/formatPrice';
// Importa o componente Table para exibição tabular dos itens
import { Table } from '../index';
// Importa os componentes estilizados utilizados no carrinho
import {
	ButtonGroup,  // Agrupa os botões de incremento/decremento
	EmptyCart,    // Componente que exibe a mensagem de carrinho vazio
	ProductImage, // Componente para exibir a imagem do produto
	TotalPrice,   // Componente para estilizar o preço total
	TrashImage,   // Componente para estilizar o ícone de excluir
} from './styles';

// Define o componente CartItems que exibe os itens do carrinho
export function CartItems() {
	// Desestrutura as funções e dados do hook useCart
	const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } =
		useCart();

	// Retorna a estrutura do componente
	return (
		// Componente raiz da tabela
		<Table.Root>
			{/* Cabeçalho da tabela */}
			<Table.Header>
				<Table.Tr>
					<Table.Th /> {/* Coluna vazia para a imagem */}
					<Table.Th>Itens</Table.Th> {/* Coluna para o nome do item */}
					<Table.Th>Preço</Table.Th> {/* Coluna para o preço unitário */}
					<Table.Th>Quantidade</Table.Th> {/* Coluna para a quantidade */}
					<Table.Th>Total</Table.Th> {/* Coluna para o preço total */}
					<Table.Th /> {/* Coluna vazia para o botão de excluir */}
				</Table.Tr>
			</Table.Header>
			{/* Corpo da tabela */}
			<Table.Body>
				{/* Verifica se existem produtos no carrinho */}
				{cartProducts?.length ? (
					// Mapeia cada produto para uma linha na tabela
					cartProducts.map((product) => (
						<Table.Tr key={product.id}>
							{/* Célula para a imagem do produto */}
							<Table.Td>
								<ProductImage src={product.url} alt="" />
							</Table.Td>
							{/* Célula para o nome do produto */}
							<Table.Td>{product.name}</Table.Td>
							{/* Célula para o preço unitário formatado */}
							<Table.Td>{product.currencyValue}</Table.Td>
							{/* Célula para os controles de quantidade */}
							<Table.Td>
								<ButtonGroup>
									{/* Botão para diminuir a quantidade */}
									<button
										type="button"
										onClick={() => decreaseProduct(product.id)}
									>
										-
									</button>
									{/* Exibe a quantidade atual */}
									{product.quantity}
									{/* Botão para aumentar a quantidade */}
									<button
										type="button"
										onClick={() => increaseProduct(product.id)}
									>
										+
									</button>
								</ButtonGroup>
							</Table.Td>
							{/* Célula para o preço total do item (quantidade × preço) */}
							<Table.Td>
								<TotalPrice>
									{formatPrice(product.quantity * product.price)}
								</TotalPrice>
							</Table.Td>
							{/* Célula para o botão de excluir */}
							<Table.Td>
								<TrashImage
									src={TrashIcon}
									alt="lixeira"
									onClick={() => deleteProduct(product.id)}
								/>
							</Table.Td>
						</Table.Tr>
					))
				) : (
					// Exibe mensagem quando o carrinho está vazio
					<EmptyCart>CARRINHO VAZIO</EmptyCart>
				)}
			</Table.Body>
		</Table.Root>
	);
}