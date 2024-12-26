import PropTypes from 'prop-types';
import { CartButton } from '../CardButton';
import { CardImage, Container } from './styles';

export function CardProduct({ product }) {
	console.log(product);
	return (
		<Container>
			<CardImage src={product.url} alt={product.name} />
			<div>
				<p>{product.name}</p>
				<strong>{product.currencyValue}</strong>
			</div>
			<CartButton />
		</Container>
	);
}

CardProduct.propTypes = {
	product: PropTypes.object,
};
