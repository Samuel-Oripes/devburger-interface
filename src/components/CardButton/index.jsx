import Cart from '../../assets/carrinho.png';
import { ContainerButton } from './styles';

export function CartButton({ ...props }) {
	return (
		<ContainerButton {...props}>
			<img src={Cart} alt="carrinho-de-compras" />
		</ContainerButton>
	);
}
