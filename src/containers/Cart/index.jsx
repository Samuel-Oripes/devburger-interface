import Logo from '../../assets/logo-login.png';
import { CartItems, CartResume } from '../../components';
import { Banner, Container, Content, Tittle } from './styles';

export function Cart() {
	// Componente funcional Cart - Responsável pela página de carrinho de compras
	return (
		<Container>
			<Banner>
				<img src={Logo} alt="logo devburger" />
			</Banner>
			<Tittle>Checkout - Pedido</Tittle>
			<Content>
				<CartItems />
				<CartResume />
			</Content>
		</Container>
	);
}
