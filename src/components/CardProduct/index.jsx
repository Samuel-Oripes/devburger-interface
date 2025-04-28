// Importa PropTypes para validação de tipos de propriedades
import PropTypes from 'prop-types';
// Importa o hook useCart do contexto do carrinho para manipular os produtos do carrinho
import { useCart } from '../../hooks/CartContext';
// Importa o componente CartButton que será o botão para adicionar ao carrinho
import { CartButton } from '../CardButton';
// Importa os componentes estilizados CardImage e Container
import { CardImage, Container } from './styles';


// Define o componente CardProduct que recebe um produto como propriedade
export function CardProduct({ product }) {
	// Desestrutura a função putProductInCart do hook useCart para adicionar produtos ao carrinho
	const { putProductInCart } = useCart();

	// Retorna a estrutura do componente
	return (
		// Container principal do card de produto
		<Container>
			{/* Imagem do produto utilizando a URL e nome como texto alternativo */}
			<CardImage src={product.url} alt={product.name} />
			{/* Div que contém as informações do produto (nome e preço) */}
			<div>
				{/* Nome do produto */}
				<p>{product.name}</p>
				{/* Preço do produto formatado como moeda */}
				<strong>{product.currencyValue}</strong>
			</div>
			{/* Botão de adicionar ao carrinho que chama a função putProductInCart quando clicado */}
			<CartButton onClick={() => putProductInCart(product)} />
		</Container>
	);
}

// Define a validação de tipos das propriedades do componente
// Especifica que product deve ser um objeto
CardProduct.propTypes = {
	product: PropTypes.object,
};